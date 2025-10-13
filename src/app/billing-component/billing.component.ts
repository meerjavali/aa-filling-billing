import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  billingForm: FormGroup;
  submitted = false;
  totalAmount = 0;
  receiptNo = '';
  todayDate = new Date();

  fees = {
    visa: 5000,
    slot: 20000,
    dropbox: 1000
  };

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      customerName: ['', Validators.required],
      items: this.fb.array([])
    });

    this.addItem();
    this.generateReceiptNo();
  }

  get items() {
    return this.billingForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      billType: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0)]],
      baseAmount: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  onBillTypeChange(index: number) {
    const control = this.items.at(index);
    const type = control.get('billType')?.value;

    let baseValue = 0;
    if (type === 'visa') baseValue = this.fees.visa;
    else if (type === 'slot') baseValue = this.fees.slot;
    else if (type === 'dropbox') baseValue = this.fees.dropbox;

    control.patchValue({ baseAmount: baseValue });
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    this.items.controls.forEach((ctrl) => {
      const quantity = Number(ctrl.get('quantity')?.value || 0);
      const discount = Number(ctrl.get('discount')?.value || 0);
      const baseAmount = Number(ctrl.get('baseAmount')?.value || 0);

      const totalBeforeDiscount = baseAmount * quantity;
      const totalAfterDiscount = totalBeforeDiscount - (discount * quantity);

      if (!isNaN(totalAfterDiscount)) total += totalAfterDiscount;
    });
    this.totalAmount = total;
  }

  generateReceiptNo() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.receiptNo = `#${randomNum}`;
  }

  onSubmit() {
    this.submitted = true;
    if (this.billingForm.invalid) return;
    this.calculateTotal();
  }

  downloadPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    const logo = new Image();
    logo.src = '../../assets/aa-logo-pr.png'; // Place logo inside src/assets
    doc.addImage(logo, 'PNG', 15, 10, 30, 30);

    doc.setFontSize(18);
    doc.text('AA Global Services', 70, 20);
    doc.setFontSize(12);
    doc.text('Billing Invoice', 70, 28);

    // Border
    doc.setDrawColor(100);
    doc.rect(10, 10, pageWidth - 20, 270);

    // Invoice details
    doc.setFontSize(11);
    doc.text(`Receipt No: ${this.receiptNo}`, 150, 20);
    doc.text(`Date: ${this.todayDate.toLocaleDateString()}`, 150, 28);
    doc.text(`Customer Name: ${this.billingForm.value.customerName}`, 15, 50);

    // Table data
    const rows = this.billingForm.value.items.map((item: any) => {
      const type =
        item.billType === 'visa'
          ? 'Visa Processing Fee'
          : item.billType === 'slot'
          ? 'Slot Booking Fee'
          : item.billType === 'dropbox'
          ? 'Drop Box Fee'
          : item.description || 'Other Charges';
      const total = (item.baseAmount * item.quantity) - (item.discount * item.quantity);
      return [type, item.quantity, item.baseAmount, item.discount, total];
    });

    autoTable(doc, {
      head: [['Bill Type', 'Qty', 'Base Amount', 'Discount', 'Total']],
      body: rows,
      startY: 60,
      styles: { fontSize: 10 },
      theme: 'grid',
      headStyles: { fillColor: [0, 102, 204], textColor: 255, halign: 'center' },
      bodyStyles: { halign: 'center' }
    });

    // Total section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Bill Amount: ₹${this.totalAmount}`, 100, finalY);

    // Footer note
    doc.setFontSize(10);
    doc.text(
      'This is an online generated bill. No signature required.',
      15,
      285
    );
    doc.save(`Invoice_${this.receiptNo}.pdf`);
  }
}

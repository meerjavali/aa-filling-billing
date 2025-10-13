import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  submitted = false;
  formData: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      education: this.fb.group({
        instituteName: ['', Validators.required],
        address: this.fb.group({
          street1: ['', Validators.required],
          street2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        }),
        courseName: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
      employer: this.fb.group({
        companyName: ['', Validators.required],
        address: this.fb.group({
          street1: ['', Validators.required],
          street2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        }),
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        salary: ['', [Validators.required, Validators.min(0)]],
        jobTitle: ['', Validators.required],
        jobDescription: ['', Validators.required],
        workPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      }),
      previousEmployer: this.fb.group({
        companyName: ['', Validators.required],
        address: this.fb.group({
          street1: ['', Validators.required],
          street2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        }),
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        jobTitle: ['', Validators.required],
        jobDescription: ['', Validators.required],
        contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        supervisorName: ['']
      })
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formData = null;
      return;
    }
    this.formData = this.form.value;
    console.log('Form submitted successfully:', this.form.value);
    alert('Form submitted successfully!');
  }

  // Helper function for validation checks
  hasError(controlPath: string, errorType: string): boolean {
    const control = this.form.get(controlPath);
    return !!(control && control.hasError(errorType) && (control.touched || this.submitted));
  }
  onReset() {
    this.form.reset();
  }
}

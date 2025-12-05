import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-education-employment-form',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.mainForm = this.fb.group({

      pan: ['', Validators.required],

      /* EDUCATION */
      hasEducation: ['', Validators.required],
      educationDescription: [''],
      educationDetails: this.fb.group({
        instituteName: [''],
        street1: [''],
        street2: [''],
        city: [''],
        state: [''],
        pincode: ['', Validators.pattern(/^[0-9]{6}$/)],
        courseName: [''],
        startDate: [''],
        endDate: ['']
      }),

      /* EMPLOYMENT */
      hasEmployment: ['', Validators.required],
      employmentDescription: [''],
      employmentDetails: this.fb.group({
        companyName: [''],
        street1: [''],
        street2: [''],
        city: [''],
        state: [''],
        pincode: ['', Validators.pattern(/^[0-9]{6}$/)],
        salary: ['', Validators.pattern(/^[0-9]+$/)],
        jobTitle: [''],
        jobDescription: [''],
        phone: ['', Validators.pattern(/^[0-9]{10}$/)]
      }),

      /* PREVIOUS EMPLOYMENT */
      hasPrevEmployment: ['', Validators.required],
      prevEmploymentDescription: [''],
      previousEmploymentDetails: this.fb.group({
        companyName: [''],
        street1: [''],
        street2: [''],
        city: [''],
        state: [''],
        pincode: ['', Validators.pattern(/^[0-9]{6}$/)],
        jobTitle: [''],
        jobDescription: [''],
        companyContact: ['', Validators.pattern(/^[0-9]{10}$/)],
        supervisor: ['']
      })
    });
  }

  /* Error check for top-level fields */
  showError(ctrl: any) {
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  /* EDUCATION */
  showErrorED(control: string) {
    const visible = this.mainForm.get('hasEducation')?.value === 'yes';
    const ctrl = this.mainForm.get('educationDetails.' + control);
    return visible && ctrl?.invalid && (ctrl.touched || ctrl.dirty);
  }

  /* EMPLOYMENT */
  showErrorEmp(control: string) {
    const visible = this.mainForm.get('hasEmployment')?.value === 'yes';
    const ctrl = this.mainForm.get('employmentDetails.' + control);
    return visible && ctrl?.invalid && (ctrl.touched || ctrl.dirty);
  }

  /* PREVIOUS EMPLOYMENT */
  showErrorPrev(control: string) {
    const visible = this.mainForm.get('hasPrevEmployment')?.value === 'yes';
    const ctrl = this.mainForm.get('previousEmploymentDetails.' + control);
    return visible && ctrl?.invalid && (ctrl.touched || ctrl.dirty);
  }

  submitForm() {
    this.submitted = false;

    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      alert('Please fix all errors before submitting.');
      return;
    }

    this.submitted = true;
    console.log(this.mainForm.value);
    alert('Form submitted successfully!');
  }

  /* SUMMARY TEXT */
  get educationSummary() {
    return JSON.stringify(this.mainForm.value.educationDetails);
  }

  get employmentSummary() {
    return JSON.stringify(this.mainForm.value.employmentDetails);
  }

  get prevEmploymentSummary() {
    return JSON.stringify(this.mainForm.value.previousEmploymentDetails);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-education-employment-form',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainForm!: FormGroup;
  submitted = false;
  // userPanPatternRegex = /^[A-Z][0-9]{7}$/
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }
  changeEducation(event: any) {
    if (event.target.value === 'yes') {
      this.mainForm.get('educationDetails.instituteName')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.street1')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.street2')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.city')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.state')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.pincode')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.courseName')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.startDate')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.endDate')?.setValidators([Validators.required])
      this.mainForm.get('educationDetails.educationDescription')?.setValidators([]);
      this.mainForm.get('educationDescription')?.setValidators([]);
      this.mainForm.get('educationDescription')?.updateValueAndValidity();
    } 
    if (event.target.value === 'no') {
      this.mainForm.get('educationDetails.instituteName')?.setValidators([]);
      this.mainForm.get('educationDetails.street1')?.setValidators([])
      this.mainForm.get('educationDetails.street2')?.setValidators([])
      this.mainForm.get('educationDetails.city')?.setValidators([])
      this.mainForm.get('educationDetails.state')?.setValidators([])
      this.mainForm.get('educationDetails.pincode')?.setValidators([])
      this.mainForm.get('educationDetails.courseName')?.setValidators([])
      this.mainForm.get('educationDetails.startDate')?.setValidators([])
      this.mainForm.get('educationDetails.endDate')?.setValidators([])
      this.mainForm.get('educationDetails')?.reset()
    
    }

}
onChangeEmployment(event:any){
  if (event.target.value === 'yes') {
    this.mainForm.get('employmentDetails.companyName')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.street1')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.street2')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.city')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.state')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.pincode')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.salary')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.jobTitle')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.jobDescription')?.setValidators([Validators.required])
    this.mainForm.get('employmentDetails.phone')?.setValidators([Validators.required])
    this.mainForm.get('employmentDescription')?.setValidators([]);
    this.mainForm.get('employmentDescription')?.updateValueAndValidity();
  } 
  if (event.target.value === 'no') {
    this.mainForm.get('employmentDetails.companyName')?.setValidators([]);
    this.mainForm.get('employmentDetails.street1')?.setValidators([])
    this.mainForm.get('employmentDetails.street2')?.setValidators([])
    this.mainForm.get('employmentDetails.city')?.setValidators([])
    this.mainForm.get('employmentDetails.state')?.setValidators([])
    this.mainForm.get('employmentDetails.pincode')?.setValidators([])
    this.mainForm.get('employmentDetails.salary')?.setValidators([])
    this.mainForm.get('employmentDetails.jobTitle')?.setValidators([])
    this.mainForm.get('employmentDetails.jobDescription')?.setValidators([])
    this.mainForm.get('employmentDetails.phone')?.setValidators([])
    this.mainForm.get('employmentDetails')?.reset() 
    this.mainForm.get('educationDescription')?.setValidators([Validators.required]);
    this.mainForm.get('employmentDescription')?.reset();
    this.mainForm.get('employmentDescription')?.setValidators([Validators.required]);
  }
}
onprevEmployment(event:any){
  if (event.target.value === 'yes') { 
    this.mainForm.get('previousEmploymentDetails.companyName')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.street1')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.street2')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.city')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.state')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.pincode')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.jobTitle')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.jobDescription')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.companyContact')?.setValidators([Validators.required])
    this.mainForm.get('previousEmploymentDetails.supervisor')?.setValidators([Validators.required]) 
    this.mainForm.get('prevEmploymentDescription')?.setValidators([]);
    this.mainForm.get('prevEmploymentDescription')?.updateValueAndValidity();
  }
  if (event.target.value === 'no') {
    this.mainForm.get('previousEmploymentDetails.companyName')?.setValidators([]);
    this.mainForm.get('previousEmploymentDetails.street1')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.street2')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.city')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.state')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.pincode')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.jobTitle')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.jobDescription')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.companyContact')?.setValidators([])
    this.mainForm.get('previousEmploymentDetails.supervisor')?.setValidators([]) 
    this.mainForm.get('previousEmploymentDetails')?.reset() 
     this.mainForm.get('prevEmploymentDescription')?.setValidators([Validators.required]);
  }
}
  createForm() {
    this.mainForm = this.fb.group({

      pan: ['',[Validators.required]], 

      /* EDUCATION */
     hasEducation: ['', Validators.required],
      educationDescription: ['', [Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      educationDetails: this.fb.group({
        instituteName: [''],
        street1: ['', ],
        street2: ['',],
        city: ['', ],
        state: ['', ],
        pincode: ['', ],
        courseName: ['', ],
        startDate: ['', ],
        endDate: ['', ]  
      }),

      /* EMPLOYMENT */
     hasEmployment: ['', Validators.required],
      employmentDescription: ['', [Validators.required,Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$')]],
      employmentDetails: this.fb.group({
        companyName: ['', ],
        street1: ['', ],
        street2: [''],
        city: ['',],
        state: ['', ],
        pincode: ['', ],
        salary: ['', ],
        jobTitle: ['', ],
        jobDescription: ['',],
        phone: ['', ]
      }), 

      /* PREVIOUS EMPLOYMENT */
     hasPrevEmployment: ['', Validators.required],
      prevEmploymentDescription: ['', Validators.required],
      previousEmploymentDetails: this.fb.group({
        companyName: ['',],
        street1: ['', ],
        street2: [''],
        city: ['', ],
        state: ['', ],
        pincode: ['',],
        jobTitle: ['', ],
        jobDescription: ['', ],
        companyContact: ['', ],
        supervisor: ['', ]
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
  showErrorPrevEmp(control: string) {
    const visible = this.mainForm.get('hasPrevEmployment')?.value === 'yes';
    const ctrl = this.mainForm.get('previousEmploymentDetails.' + control);
    return visible && ctrl?.invalid && (ctrl.touched || ctrl.dirty);
  } 

  submitForm() {
    this.submitted = false;
  console.log(this.mainForm)
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      alert('Please fix all errors before submitting.');
      return;
    }

    this.submitted = true;
    this.http.post<{ name: string }>('https://aaglobal-services-default-rtdb.firebaseio.com/form.json', this.mainForm.value).subscribe(
      response => {
        console.log('submission successful', response);
        alert('Data submitted successfully!, please save the response id: '+response.name);
      },
      error => {
        console.error('Form submission error', error);
        alert('There was an error submitting the form. Please try again later.');
      }
    );
    console.log(this.mainForm.value); 
    // alert('Form submitted successfully!');
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

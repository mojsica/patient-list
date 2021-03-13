import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  srForm: FormGroup;
  id: string;
  patient: Patient;

  constructor(
    public currentPageService: CurrentPageService,
    public fb: FormBuilder,
    public doctorsService: DoctorsService,
    public patientService: PatientsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.currentPageService.setCurrentPageTitle('Add new patient');
  }

  ngOnInit(): void {

    this.srForm = this.fb.group({
      id: null,
      registeredDate: null,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      vat: '',
      doctor: [null, [Validators.required]],
      addresses: this.fb.array([])
    });

    // We have at least one address of type HOME
    //this.addHomeAddress();
    this.addAddress();
    const addressesFormArray = this.srForm.get('addresses') as FormArray;
    let phone = addressesFormArray.controls[0].get('type').setValue('HOME');



    this.id = this.activatedRoute.snapshot.params['id']; // If there is id params, the form will present patient with id and disable the form
    if (this.id) {

      let index = this.patientService.getPatientIndexById(parseInt(this.id));
      this.patient = this.patientService.getPatients()[index];

      for (let i = 1; i < this.patient.addresses.length; i++) {
        this.addAddress(); // Zavisno od toga koliko ima adresa, toliko prosirujemo FormGroup
      }
      this.srForm.setValue(this.patient); // Setujemo vrednosti pacijenata i disejblujemo formu
      this.srForm.disable();
    }

  }

  get addressForms() {
    return this.srForm.get('addresses') as FormArray;
  }

  addAddress() {
    const address = this.fb.group({
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\s]+$')]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
    this.addressForms.push(address)
  }

  deleteAddress(i: number) {
    this.addressForms.removeAt(i)
  }

  // Promena validatora za vat code, ako je osoba punoletna/maloletna
  dateChange(event) {

    let currDate: Date = new Date();
    var year = currDate.getFullYear();
    var month = currDate.getMonth();
    var day = currDate.getDate();
    var limitDate = new Date(year - 18, month, day);

    if (this.srForm.get('dateBirth').value > limitDate) {
      this.srForm.get('vat').clearValidators();
      this.srForm.get('vat').updateValueAndValidity();
    } else {
      this.srForm.get('vat').setValidators([Validators.required]);
      this.srForm.get('vat').updateValueAndValidity();
    }
  }

  // Ispravka telefona koja se okida na blur
  onBlur(event, i) {
    const addressesFormArray = this.srForm.get('addresses') as FormArray;
    let phone = addressesFormArray.controls[0].get('phone').value;
    if (phone[0] != '+') { phone = '+39' + phone }
    addressesFormArray.controls[0].get('phone').setValue(phone);
  }

  onSubmit() {
    this.patientService.addPatient(this.srForm.value);
    this.router.navigate(['/patient-list']);
  }

}

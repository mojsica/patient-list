import { animate, style, transition, trigger } from '@angular/animations';
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
  styleUrls: ['./patient-form.component.css'],
  animations: [
    trigger('showState', [
      transition('void => *', [style({opacity: 0, height: 0, overflow: 'hidden'}), animate('0.3s ease-in')]),
      transition('* => void', animate('0.3s ease-out', style({opacity: 0, height: 0, overflow: 'hidden'}))),
    ]),
  ]
})
export class PatientFormComponent implements OnInit {

  srForm: FormGroup;
  id: number;
  patient: Patient;

  constructor(
    public currentPageService: CurrentPageService,
    public doctorsService: DoctorsService,
    public patientService: PatientsService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.srForm = this.fb.group({
      id: null,
      registeredDate: null,
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      vat: null,
      doctor: [null, [Validators.required]],
      addresses: this.fb.array([])
    });

    // We have at least one address of type HOME
    this.addAddress();
    const addressesFormArray = this.srForm.get('addresses') as FormArray;
    addressesFormArray.controls[0].get('type').setValue('HOME');

    // If there is id params, the form will present patient with id and disable the form
    this.id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.id) {

      this.currentPageService.setCurrentPageTitle('Show patient');

      const index = this.patientService.getPatientIndexById(this.id);
      this.patient = this.patientService.getPatients()[index];

      for (let i = 1; i < this.patient.addresses.length; i++) {
        this.addAddress(); // Zavisno od toga koliko ima adresa, toliko prosirujemo FormGroup
      }
      this.srForm.setValue(this.patient); // Setujemo vrednosti pacijenata i disejblujemo formu
      this.srForm.disable();
    } else {
      this.currentPageService.setCurrentPageTitle('Add new patient');
    }

  }

  get addressForms(): FormArray {
    return this.srForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    const address = this.fb.group({
      type: ['', [Validators.required]],
      name: null,
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\s]+$')]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
    this.addressForms.push(address);
  }

  deleteAddress(i: number): void {
    this.addressForms.removeAt(i);
  }

  // Promena validatora za vat code, ako je osoba punoletna/maloletna
  dateChange(event): void {

    const currDate: Date = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    const day = currDate.getDate();
    const limitDate = new Date(year - 18, month, day);

    if (this.srForm.get('dateBirth').value > limitDate) {
      this.srForm.get('vat').clearValidators();
      this.srForm.get('vat').updateValueAndValidity();
    } else {
      this.srForm.get('vat').setValidators([Validators.required]);
      this.srForm.get('vat').updateValueAndValidity();
    }
  }

  // Vraca true ako je odabran type 'WORK' ili 'RELATIVE' u suprotnom false.
  nameFieldPermited(index: number): boolean {
    const addressesFormArray = this.srForm.get('addresses') as FormArray;
    const type = addressesFormArray.controls[index].get('type').value;
    if (type === 'WORK' || type === 'RELATIVE') {
      return true;
    } else {
      return false;
    }
  }

  // Ispravka telefona koja se okida na blur
  onBlur(event, i: number): void {
    const addressesFormArray = this.srForm.get('addresses') as FormArray;
    let phone = addressesFormArray.controls[i].get('phone').value;
    if (phone[0] !== '+') { phone = '+39' + phone; }
    addressesFormArray.controls[i].get('phone').setValue(phone);
  }

  onDeletePatient(): void {
    this.patientService.deletePatient(this.id);
    this.router.navigate(['/patient-list']);
  }

  onSubmit(): void {
    this.patientService.addPatient(this.srForm.value);
    this.router.navigate(['/']);
  }
}

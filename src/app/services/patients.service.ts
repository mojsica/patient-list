import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Address } from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patients: Patient[];

  constructor() {
    this.setInitialPatients();
  }

  getPatients() {
    return this.patients;
  }

  getPatientIndexById(id: number): number {
    return this.patients.findIndex((patient: Patient) => patient.id === id);
  }

  addPatient(patient: Patient) {
    patient.id = this.getNextId();
    patient.registeredDate = new Date().toDateString();
    this.patients.push(patient);
  }

  getNextId() {
    let maxId = 1;
    this.patients.forEach(patient => {
      maxId = Math.max(maxId, patient.id);
    });
    return maxId + 1;
  }

  getPatientHomeAddress(patient: Patient) {
    return patient.addresses.find((address: Address) => address.type === 'HOME')
  }

  setInitialPatients() {
    this.patients = [
      {
        id: 1,
        registeredDate: "2018-10-13T23:50:12Z",
        firstName: "Mario",
        lastName: "Rossi",
        dateBirth: null,
        vat: '',
        doctor: 1,
        addresses: [
          {
            type: "HOME",
            email: "aaa@bb.com",
            phone: "+3956789910",
            street: "Via Tiburtina 59",
            city: "Rome",
            zipcode: "00131",
            country: "Italy"
          }
        ]
      },
      {
        id: 2,
        registeredDate: "2018-10-12T11:23:57Z",
        firstName: "Francesco",
        lastName: "Giuliani",
        dateBirth: null,
        vat: '',
        doctor: 3,
        addresses: [
          {
            type: "HOME",
            email: "aaa@bb.com",
            phone: "+3933522342234",
            street: "Via Casilina 72",
            city: "Rome",
            zipcode: "00186",
            country: "Italy"
          },
          {
            type: "WORK",
            email: "aaa@bb.com",
            phone: "+39062231124",
            street: "Via Cassia 823",
            city: "Rome",
            zipcode: "00192",
            country: "Italy"
          }
        ]
      },
      {
        id: 3,
        registeredDate: "2018-10-16T13:51:28Z",
        firstName: "Elico",
        lastName: "Maikenberg",
        dateBirth: null,
        doctor: 4,
        vat: '',
        addresses: [
          {
            type: "HOME",
            email: "aaa@bb.com",
            phone: "+39781123112",
            street: "Piazza Risorgimento 44",
            city: "Rome",
            zipcode: "00195",
            country: "Italy"
          }
        ]
      }
    ]
  }

}

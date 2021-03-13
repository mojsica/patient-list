import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctors: Doctor[];

  constructor() {
    this.setInitialDoctors();
  }

  getDoctors() {
    return this.doctors;
  }

  getDoctorById(id: number): Doctor {
    return this.doctors.find((doctor: Doctor) => doctor.id === id);
  }

  getDoctorsNameById(id: number): string {
    return this.getDoctorById(id).firstName + ' ' + this.getDoctorById(id).lastName + ' - ' + this.getDoctorById(id).title;
  }

  setInitialDoctors() {
    this.doctors = [
      {
        id: 1,
        firstName: "Gregory",
        lastName: "House",
        title: "MD"
      },
      {
        id: 2,
        firstName: "Elizabeth",
        lastName: "Blackwell",
        title: "MD"
      },
      {
        id: 3,
        firstName: "Joseph",
        lastName: "Lister",
        title: "Surgeon"
      },
      {
        id: 4,
        firstName: "Eduard",
        lastName: "Jenner",
        title: "Immunologist"
      }
    ]
  }

}
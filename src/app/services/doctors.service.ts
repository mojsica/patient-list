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

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorsNameById(id: number): string {
    const doctor = this.doctors.find(dr => dr.id === id);
    return doctor.firstName + ' ' + doctor.lastName + ' - ' + doctor.title;
  }

  setInitialDoctors(): void {
    this.doctors = [
      {
        id: 1,
        firstName: 'Gregory',
        lastName: 'House',
        title: 'MD'
      },
      {
        id: 2,
        firstName: 'Elizabeth',
        lastName: 'Blackwell',
        title: 'MD'
      },
      {
        id: 3,
        firstName: 'Joseph',
        lastName: 'Lister',
        title: 'Surgeon'
      },
      {
        id: 4,
        firstName: 'Eduard',
        lastName: 'Jenner',
        title: 'Immunologist'
      }
    ];
  }
}

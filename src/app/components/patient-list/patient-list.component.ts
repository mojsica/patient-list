import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { PatientsService } from 'src/app/services/patients.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorsService } from 'src/app/services/doctors.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  animations: [
    trigger('showState', [
      transition('void => *', [style({opacity: 0, height: 0, overflow: 'hidden'}), animate('0.3s ease-in')]),
      transition('* => void', animate('0.3s ease-out', style({opacity: 0, height: 0, overflow: 'hidden'}))),
    ]),
  ]
})
export class PatientListComponent implements OnInit, AfterViewInit {

  patients: Patient[];
  displayedColumns: string[] = ['name', 'regDate', 'doctorsName', 'phone', 'email', 'homeAddress'];
  dataSource = new MatTableDataSource<Patient>(this.patientsService.getPatients());

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public currentPageService: CurrentPageService,
    public patientsService: PatientsService,
    public doctorsService: DoctorsService,
    public router: Router
  ) {
    this.currentPageService.setCurrentPageTitle('Patient list');
    this.patients = this.patientsService.getPatients();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  goToDetails(patient: Patient): void {
    this.router.navigate(['/patient-details/' + patient.id]);
  }
}

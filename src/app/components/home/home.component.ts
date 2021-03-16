import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('showState', [
      transition('void => *', [style({opacity: 0, height: 0, overflow: 'hidden'}), animate('0.3s ease-in')]),
      transition('* => void', animate('0.3s ease-out', style({opacity: 0, height: 0, overflow: 'hidden'}))),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor(public currentPageService: CurrentPageService) {
    this.currentPageService.setCurrentPageTitle('Home');
  }

  ngOnInit(): void {
  }

}

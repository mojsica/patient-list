import { Component, OnInit } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public currentPageService: CurrentPageService) {
    this.currentPageService.setCurrentPageTitle('Home');
  }

  ngOnInit(): void {
  }

}

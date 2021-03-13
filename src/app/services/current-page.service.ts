import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  currentPageTitle: string = "";
  constructor() { }

  getCurrentPageTitle() {
    return this.currentPageTitle;
  }

  setCurrentPageTitle(title: string) {
    this.currentPageTitle = title;
  }

}

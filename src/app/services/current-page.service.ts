import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {
  currentPageTitle = '';
  constructor() { }

  getCurrentPageTitle(): string {
    return this.currentPageTitle;
  }

  setCurrentPageTitle(title: string): void {
    this.currentPageTitle = title;
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedInUser: string;
  showMenu: boolean;

  ngOnInit() {
    debugger    
    this.getCurrentLoggedInUser();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getCurrentLoggedInUser() {

    if (localStorage.getItem('currentUser')) {
      this.showMenu = true;
      this.loggedInUser = localStorage.getItem('currentUser');
    }
    else{
      this.showMenu = false;
    }
  }
}

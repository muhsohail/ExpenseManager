import { Component, OnInit } from '@angular/core';
import { User } from '../app/models/user';
import {AuthenticationService} from '../app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showMenu: boolean;
  loggedInUser: string;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    debugger

    this.auth.currentUser$.subscribe((user: User) => {
      if(user != undefined)
        this.showMenu = true;
      else
        this.showMenu = false;
    }) 
        
    this.getCurrentLoggedInUser();
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { config } from 'process';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  uri:string;
  constructor(private http: HttpClient, private router: Router) { 

    this.uri=this.router.url + '/user';
  }

  getAll() {
    return this.http.get<User[]>(`${this.uri}/`);
  }

  getUsersForDashboard() {
    return this.http.get<User[]>(`${this.uri}/GetUsersForDashboard`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/edit/` + id);
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user);
  }

  update(user: User) {
    return this.http.post(`${this.uri}/update/${user._id}`, user);
  }


  delete(id) {
    const obj = {

    };
    //return this.http.post(`${this.uri}/delete/` + id);
      return this.http.post(`${this.uri}/delete/${id}`, obj);
    
  }
}

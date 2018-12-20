import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { config } from 'process';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  uri = 'http://localhost:4000/user';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.uri}/`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/edit/` + id);
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user);
  }

  update(user: User) {
    return this.http.put(`${this.uri}/update/` + user.id, user);
  }

  delete(id) {
    const obj = {

    };
    //return this.http.post(`${this.uri}/delete/` + id);
    return this
      .http
      .post(`${this.uri}/delete/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settlement } from '../models/settlement';
import { config } from 'process';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SettlementService {  

  uri:string;
  constructor(private http: HttpClient, private router: Router, private window: Window) { 

    this.uri = this.window.location.origin+ '/settlement';
  }

  getAll() {
    debugger
    console.log(this.router.url);
    return this.http.get<Settlement[]>(`${this.uri}/`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/edit/` + id);
  }

  add(settlement: Settlement) {
    return this.http.post(`${this.uri}/add`, settlement);
  }

  update(settlement: Settlement) {
    return this.http.post(`${this.uri}/update/${settlement._id}`, settlement);
  }


  delete(id) {
    const obj = {

    };
    
    return this.http.post(`${this.uri}/delete/${id}`, obj);
      
  }
}

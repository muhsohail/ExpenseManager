import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settlement } from '../models/settlement';
import { config } from 'process';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class SettlementService {  

  uri:string;
  constructor(private http: HttpClient, private location: Location, @Inject(DOCUMENT) private document) { 
    this.uri = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port+ '/settlement';
  }

  getAll() {
    debugger
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

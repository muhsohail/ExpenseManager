import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settlement } from '../models/settlement';
import { config } from 'process';

@Injectable({
  providedIn: 'root'
})

export class SettlementService {

  uri = 'http://localhost:4000/settlement';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Settlement[]>(`${this.uri}/`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/edit/` + id);
  }

  add(settlement: Settlement) {
    return this.http.post(`${this.uri}/add`, settlement);
  }

  update(settlement: Settlement) {
    return this.http.post(`${this.uri}/update/${settlement.id}`, settlement);
  }


  delete(id) {
    const obj = {

    };
    
    return this.http.post(`${this.uri}/delete/${id}`, obj);
      
  }
}

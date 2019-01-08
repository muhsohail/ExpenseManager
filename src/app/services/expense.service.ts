import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../models/expense';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  uri:string;
  constructor(private http: HttpClient, private location: Location, @Inject(DOCUMENT) private document) { 
    this.uri = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port+ '/expense';
  }

  register(expense: expense) {
    return this.http.post(`${this.uri}/add`, expense);
  }

  getExpenses() {
    return this
      .http
      .get(`${this.uri}/`);
  }

  editExpense(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  updateExpense(expense: expense) {
    return this.http.post(`${this.uri}/update/${expense._id}`, expense);
  }

  deleteExpense(id) {
    const obj = {
    };
    return this.http.post(`${this.uri}/delete/${id}`, obj);
  }

  bulkDeleteExpense(itemsCount) {
    return this.http.get(`${this.uri}/bulkdelete/${itemsCount}`);
  }

  GetExpenseByCategory(category) {
    return this.http.get(`${this.uri}/getExpenseByCategory/${category}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  uri = 'http://localhost:4000/expense';
  constructor(private http: HttpClient) { }
  addExpense(amount, dateSpent, purpose, category) {
    const obj = {
      amount: amount,
      dateSpent: dateSpent,
      purpose: purpose,
      category: category
    };

    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
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

  updateExpense(expense: expense ) {
    return this.http.post(`${this.uri}/update/${expense.id}`, expense);
      //.subscribe(res => console.log('Done'));
  }

  //updateExpense(amount, datespent, purpose, category, id) {

  //  const obj = {
  //    amount: amount,
  //    dateSpent: datespent,
  //    purpose: purpose,
  //    category: category,
  //    id: id
  //  };
  //  this
  //    .http
  //    .post(`${this.uri}/update/${id}`, obj)
  //    .subscribe(res => console.log('Done'));
  //}

  deleteExpense(id) {
    const obj = {

    };
    return this.http.post(`${this.uri}/delete/${id}`, obj);
  }

  bulkDeleteExpense(itemsCount) {
    return this.http.get(`${this.uri}/bulkdelete/${itemsCount}`);
  }

}

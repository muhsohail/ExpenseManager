import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  uri = 'http://localhost:4000/expense';
  constructor(private http: HttpClient) { }

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

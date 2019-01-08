import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryViewModel } from '../viewModels/categoryViewModel';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  
  uri:string;
  constructor(private http: HttpClient, private location: Location) { 

    this.uri = this.location.path+ '/category';
  }

  getAllNotCommonCategories(): any {
    return this.http.get(`${this.uri}/getAllNotCommon`);
  }

  register(category: categoryViewModel) {
    return this.http.post(`${this.uri}/add`, category);
  }

  getCategories() {
    return this.http.get(`${this.uri}/`);
  }

  editCategory(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateCategory(category: categoryViewModel, ) {
    return this.http.post(`${this.uri}/update/${category._id}`, category);
  }


  deleteCategory(id) {
    const obj = {

    };
    return this.http.post(`${this.uri}/delete/${id}`, obj);
  }

}

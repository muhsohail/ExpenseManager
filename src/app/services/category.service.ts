import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryViewModel } from '../viewModels/categoryViewModel';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  
  uri:string;
  constructor(private http: HttpClient, private location: Location, @Inject(DOCUMENT) private document) { 
    this.uri = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port+ '/category';
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

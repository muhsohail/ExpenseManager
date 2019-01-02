import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryViewModel } from '../viewModels/categoryViewModel';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  
  uri = 'http://localhost:4000/category';
  constructor(private http: HttpClient) { 
    
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

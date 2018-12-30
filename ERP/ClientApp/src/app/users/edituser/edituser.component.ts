import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserViewModel } from '../UserViewModel';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  user: User;
  angForm: FormGroup;
  userId: any;
  roles = [{ 'id': 1, 'name': 'Admin' }, { 'id': 2, 'name': 'Editor' }, { 'id': 3, 'name': 'Viewer' }];
  password: any;
  username: any;
  
  constructor(
    public toastr: ToastrManager,
    private userService: UserService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.createForm();

  }

  createForm() {
    this.angForm = this.fb.group({
      id: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: '',
      password: '',
      role: '',
      percentage: ['', Validators.required]
    });
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been updated.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  update() {
    debugger
    this.angForm.value.id = this.userId;
    this.angForm.value.username = this.username;
    this.angForm.value.password = this.password;

    this.userService.update(this.angForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess();
          this.dialogRef.close();
        },
        error => {
          this.showError();
        });
  }

  cancel(): void {
    debugger
    this.dialogRef.close();
  }

  ngOnInit() {

    debugger
    this.user = this.data.item;
    this.userId = this.data.item.id;
    this.username = this.data.item.username;
    this.password = this.data.item.password;
    
    // this.categoryService
    // .getCategories()
    // .subscribe((data: categoryViewModel[]) => {
    //   this.Categories = data;

    //   this.user = this.data.item;
    //   this.userId = this.data.item.id;
    // });
  }
}



import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user';
import { UserViewModel } from '../../users/UserViewModel'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  angForm: FormGroup;
  roles: { 'id': number; 'name': string; }[];


  constructor(
    public toastr: ToastrManager,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.createForm();
    this.toastaConfig.theme = 'material';
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been added.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }

  showCustom() {
    this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
  }

  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger
    if (this.angForm.invalid) {
      return;
    }    
    this.userService.register(this.angForm.value)
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

  ngOnInit() {
    debugger
    this.roles = [{ 'id': 1, 'name': 'Admin' }, { 'id': 2, 'name': 'Editor' }, { 'id': 3, 'name': 'Viewer' }];

  }

  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: '',
      percentage: ['', Validators.required]
    });
  }

}
export interface DialogData {
  user: User;
}

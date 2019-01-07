import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})

export class DeleteUserComponent implements OnInit {
  objUser: any = {};

  constructor(
    public toastr: ToastrManager,
    private userService: UserService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    debugger
    this.objUser = this.data.item;
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been deleted.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Whoops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  delete(id) {
    debugger
    this.userService.delete(id).subscribe(() => {
      this.showSuccess();
      this.dialogRef.close();
    },
      error => {
        this.showError();
      });

  }
  cancel() {
    this.dialogRef.close();
  }
}

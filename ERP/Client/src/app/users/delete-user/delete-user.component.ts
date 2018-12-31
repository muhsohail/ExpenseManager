import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})

export class DeleteUserComponent implements OnInit {
  objUser: any = {};

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    debugger
    this.objUser = this.data.item;
  }

  delete(id) {
    debugger
    this.userService.delete(id);
    this.dialogRef.close();

  }
  cancel() {
    this.dialogRef.close();
  }
}

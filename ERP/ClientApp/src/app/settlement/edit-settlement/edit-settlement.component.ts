import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { SettlementService } from '../../services/settlement.service';
import { Settlement } from '../../models/settlement';
import { SettlementViewModel } from '../../viewModels/settlementViewModel';

@Component({
  selector: 'app-edit-settlement',
  templateUrl: './edit-settlement.component.html',
  styleUrls: ['./edit-settlement.component.css']
})
export class EditSettlementComponent implements OnInit {
  settlement: Settlement;
  angForm: FormGroup;
  settlementId: any;
  loggedInUser: string;

  constructor(public toastr: ToastrManager,
    private settlementService: SettlementService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditSettlementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      id: '',
      amount: ['', Validators.required],
      settlementdate: ['', Validators.required],
      by: ['', Validators.required]
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
    this.angForm.value.id = this.settlementId;
    this.angForm.value.by = JSON.parse(this.loggedInUser).username;

    this.settlementService.update(this.angForm.value)
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
    this.settlement = this.data.item;
    this.settlement.settlementdate = new Date(this.data.item.settlementdatestring);
    this.settlementId = this.data.item.id;

    this.getCurrentLoggedInUser();
  }
  getCurrentLoggedInUser() {

    if (localStorage.getItem('currentUser')) {
      this.loggedInUser = localStorage.getItem('currentUser');
    }
  }
}

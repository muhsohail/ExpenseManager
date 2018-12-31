import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettlementService } from '../../services/settlement.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Settlement } from '../../models/settlement';
import { SettlementViewModel } from '../../viewModels/settlementViewModel';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { ToastrManager } from 'ng6-toastr-notifications';
import { User } from '../../models/user';


@Component({
  selector: 'app-add-settlement',
  templateUrl: './add-settlement.component.html',
  styleUrls: ['./add-settlement.component.css']
})
export class AddSettlementComponent implements OnInit {

  settlement: Settlement[];
  angForm: FormGroup;
  loggedInUser: string;

  constructor(public toastr: ToastrManager,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig,
    private settlementService: SettlementService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSettlementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.createForm();
    this.toastaConfig.theme = 'material';

  }


  showSuccess() {
    this.toastr.successToastr('Settlement entry has been added.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Whoops!');
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


  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      settlementdate: ['', Validators.required],
      by: ''
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger

    if (this.angForm.invalid) {
      return;
    }
    else
    {
      this.angForm.value.by = JSON.parse(this.loggedInUser).username;
    }

    this.settlementService.add(this.angForm.value)
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
    this.getCurrentLoggedInUser();

  }
  getCurrentLoggedInUser() {

    if (localStorage.getItem('currentUser')) {
      this.loggedInUser = localStorage.getItem('currentUser');
    }
  }
}
export interface DialogData {
  settlement: Settlement;
}

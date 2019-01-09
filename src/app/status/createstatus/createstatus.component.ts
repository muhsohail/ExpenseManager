import { Component, OnInit, Inject } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-createstatus',
  templateUrl: './createstatus.component.html',
  styleUrls: ['./createstatus.component.css']
})
export class CreatestatusComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    public toastr: ToastrManager,
    private statusService: StatusService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreatestatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm();
  }

  showSuccess() {
    this.toastr.successToastr('Status has been added.', 'Success!');
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
  createForm() {
    this.angForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.angForm.invalid) {
      return;
    }
    debugger


    this.statusService.add(this.angForm.value)
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
  }
}

export interface DialogData {
  code: string;
  description: string;
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { StatusService } from '../../services/status.service';
import { statusViewModel } from '../../viewModels/statusViewModel';


@Component({
  selector: 'app-editstatus',
  templateUrl: './editstatus.component.html',
  styleUrls: ['./editstatus.component.css']
})
export class EditstatusComponent implements OnInit {
  status: statusViewModel;
  angForm: FormGroup;
  statusId: any;

  constructor(public toastr: ToastrManager,
    private statusService: StatusService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditstatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      _id: '',
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  showSuccess() {
    this.toastr.successToastr('Category has been updated.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  update() {
    debugger
    this.angForm.value._id = this.statusId;

    this.statusService.update(this.angForm.value)
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
    this.dialogRef.close();
  }

  ngOnInit() {
    this.status = this.data.item;
    this.statusId = this.data.item._id;
  }
}

export interface DialogData {
  code: string;
  description: string;
}
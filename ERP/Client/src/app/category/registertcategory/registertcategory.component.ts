import { Component, OnInit, Inject } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registertcategory',
  templateUrl: './registertcategory.component.html',
  styleUrls: ['./registertcategory.component.css']
})
export class RegistertcategoryComponent implements OnInit {
  angForm: FormGroup;
  myModel = true;

  constructor(
    public toastr: ToastrManager,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistertcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 

    this.createForm();
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
  createForm() {
    this.angForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      isCommon:''
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

    this.angForm.value.isCommon = this.myModel;

    this.categoryService.register(this.angForm.value)
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
  isCommon: Boolean
}
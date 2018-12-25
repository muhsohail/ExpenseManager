import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { categoryViewModel } from '../category/categoryViewModel';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  category: categoryViewModel;
  angForm: FormGroup;
  categoryId: any;

  constructor(    public toastr: ToastrManager,
    private categoryService: CategoryService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.createForm();
    }
    createForm() {
      this.angForm = this.fb.group({
        id: '',
        code: ['', Validators.required],
        description: ['', Validators.required]
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
      this.angForm.value.id = this.categoryId;
      this.categoryService.updateCategory(this.angForm.value)
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
      this.category = this.data.item;
      this.categoryId = this.data.item.id;
    }
}
export interface DialogData {
  code: string;
  description: string;
}
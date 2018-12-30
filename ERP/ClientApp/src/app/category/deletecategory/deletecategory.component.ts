import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.css']
})
export class DeletecategoryComponent implements OnInit {
  category: any = {};

  constructor(public toastr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeletecategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    showSuccess() {
      this.toastr.successToastr('Express entry has been deleted.', 'Success!');
    }
  
    showError() {
      this.toastr.errorToastr('This is error toast.', 'Oops!');
    }
  
    showWarning() {
      this.toastr.warningToastr('This is warning toast.', 'Alert!');
    }

  ngOnInit() {
    this.category = this.data.item;
  }

  
  delete(id) {
    debugger
    this.categoryService.deleteCategory(id)        
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

  cancel() {
    this.dialogRef.close();
  }
}

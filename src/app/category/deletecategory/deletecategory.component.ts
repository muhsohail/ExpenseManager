import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExpenseService } from '../../services/expense.service';
import { expense } from '../../models/expense';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.css']
})
export class DeletecategoryComponent implements OnInit {
  category: any = {};

  constructor(public toastr: ToastrManager,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeletecategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // showSuccess() {
  //   this.toastr.successToastr('Category has been deleted.', 'Success!');
  // }

  showSuccess(message: string) {
    this.toastr.successToastr(message, 'Success!');
  }

  showError(message: string) {
    this.toastr.errorToastr(message, 'Whoops!');
  }



  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  ngOnInit() {
    this.category = this.data.item;
  }


  delete(id) {
    this.expenseService.GetExpenseByCategory(this.category.code)
      .subscribe((data: expense[]) => {
        if (data.length == 0) {

          this.categoryService.deleteCategory(id)
            .pipe(first())
            .subscribe(
              data => {
                this.showSuccess(data.toString());
                this.dialogRef.close();
              },
              error => {
                this.showError(error);
              });

        }
        else {
          this.showError("Unable to delete category. It is used in expense.");
          this.dialogRef.close();
        }


      });

    debugger
  }

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { ExpenseService } from '../../services/expense.service';
import { expense } from '../expense';
import{CategoryService} from '../../services/category.service';
import { categoryViewModel } from '../../viewModels/categoryViewModel';

@Component({
  selector: 'app-edit-expense-registeration',
  templateUrl: './edit-expense-registeration.component.html',
  styleUrls: ['./edit-expense-registeration.component.css']
})
export class EditExpenseRegisterationComponent implements OnInit {
  expenseList: expense;
  angForm: FormGroup;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;
  expenseId: any;
  Categories:categoryViewModel[];

  constructor(
    public toastr: ToastrManager,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }
 

  createForm() {
    this.angForm = this.fb.group({
      id: '',
      amount: ['', Validators.required],
      dateSpent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: ''
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


  updateExpense() {
    debugger
    this.angForm.value.id = this.expenseId;
    this.expenseService.updateExpense(this.angForm.value)
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


  cancelEditExpense(): void {
    debugger
    this.dialogRef.close();
  }

  //ngOnInit() {
  //  this.StartTime = new Date();
  //  debugger
  //  this.expenseService.editExpense(this.data.id).subscribe((res: expense) => {
  //    this.expenseList = res;
  //    this.expenseId = this.expenseList.id;
  //  });
  //}

  ngOnInit() {
    debugger
    this.categoryService
    .getCategories()
    .subscribe((data: categoryViewModel[]) => {
      this.Categories = data;

      this.expenseList = this.data.item;
      this.expenseList.dateSpent = new Date(this.data.item.dateSpentString);
      this.expenseId = this.data.item.id;
    });
  }
}

export interface DialogData {
  amount: string;
  purpose: string;
  datespent: Date;
  category: string;

}

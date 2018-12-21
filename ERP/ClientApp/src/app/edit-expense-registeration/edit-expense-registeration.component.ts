import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

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


  constructor(
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<EditExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  Categories = [
    { 'id': 1, 'name': 'Category 1' },
    { 'id': 2, 'name': 'Category 2' },
    { 'id': 3, 'name': 'Category 3' }
  ];

  createForm() {
    this.angForm = this.fb.group({
      id:'',
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
    this.angForm.value.id = this.expenseList._id;
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

  //updateExpense(amount, dataspent, purpose, category, id) {
  //  this.StartTime = new Date();

  //  this.route.params.subscribe(params => {
  //    this.expenseService.updateExpense(amount, dataspent, purpose, category, id);
  //    this.dialogRef.close();


  //  });

  //  this.EndTime = new Date();
  //  this.diff = this.EndTime.getTime() - this.StartTime.getTime();
  //  this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

  //  console.log("Update expense call time in milisecond: " + this.diff);
  //  console.log("Update expense call time in seconds: " + this.seconds);

  //}

  cancelEditExpense() {

    this.dialogRef.close();
  }

  ngOnInit() {
    this.StartTime = new Date();
    debugger
    this.expenseService.editExpense(this.data.id).subscribe((res: expense) => {
      this.expenseList = res;

      this.expenseList.dateSpentString = new Date(this.expenseList.dateSpent).toLocaleDateString();

      this.EndTime = new Date();
      this.diff = this.EndTime.getTime() - this.StartTime.getTime();
      this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

      console.log("Edit expense call time in milisecond: " + this.diff);
      console.log("Edit expense call time in seconds: " + this.seconds);


    });
  }
}

export interface DialogData {
  amount: string;
  purpose: string;
  datespent: Date;
  category: string;

}

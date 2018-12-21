import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from './expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { expense } from '../fetch-data/expense';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-registeration',
  templateUrl: './expense-registeration.component.html',
  styleUrls: ['./expense-registeration.component.css']
})

export class ExpenseRegisterationComponent implements OnInit {
  expenseList: expense[];
  angForm: FormGroup;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;
  loading = false;
  submitted = false;
  // TODO - Move to database
  Categories = [
    { 'id': 1, 'name': 'Category 1' },
    { 'id': 2, 'name': 'Category 2' },
    { 'id': 3, 'name': 'Category 2' }
  ];

  constructor(
    private expenseService: ExpenseService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      datespent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: ''
    });
  }

  cancelAddExpense() {

    this.dialogRef.close();

  }
  //  addExpense(amount, datespent, purpose, category) {

  addExpense(amount, datespent, purpose, category) {

    //this.StartTime = new Date();

    this.expenseService.addExpense(amount, datespent, purpose, category);
    this.dialogRef.close();

    //this.EndTime = new Date();
    //this.diff = this.EndTime.getTime() - this.StartTime.getTime();
    //this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

    //console.log("Add expense call time in milisecond: " + this.diff);
    //console.log("Add expense call time in seconds: " + this.seconds);

    // for loop
    //for (var i = 0; i < 500; i++) {
    //  this.expenseService.addExpense(amount, datespent, purpose, category);
    //}

    //this.dialogRef.close();

  }

  onSubmit() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.angForm.invalid) {
      return;
    }

    debugger

    this.loading = true;
    this.expenseService.register(this.angForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  ngOnInit() {
  }
}

export interface DialogData {
  amount: string;
  purpose: string;
  datespent: Date;
  category: string;
}

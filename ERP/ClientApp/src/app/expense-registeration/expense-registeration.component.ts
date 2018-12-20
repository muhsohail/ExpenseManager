import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from './expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { expense } from '../fetch-data/expense';

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

  // TODO - Move to database
  Categories = [
    { 'id': 1, 'name': 'Category 1' },
    { 'id': 2, 'name': 'Category 2' },
    { 'id': 3, 'name': 'Category 2' }
  ];

  constructor(private expenseService: ExpenseService, private fb: FormBuilder, public dialogRef: MatDialogRef<ExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      datespent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  cancelAddExpense() {

    this.dialogRef.close();

  }
  addExpense(amount, datespent, purpose, category) {

    //this.StartTime = new Date();

    //this.expenseService.addExpense(amount, datespent, purpose, category);
    //this.dialogRef.close();

    //this.EndTime = new Date();
    //this.diff = this.EndTime.getTime() - this.StartTime.getTime();
    //this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

    //console.log("Add expense call time in milisecond: " + this.diff);
    //console.log("Add expense call time in seconds: " + this.seconds);

    // for loop
    for (var i = 0; i < 500; i++) {
      this.expenseService.addExpense(amount, datespent, purpose, category);
    }

    this.dialogRef.close();

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

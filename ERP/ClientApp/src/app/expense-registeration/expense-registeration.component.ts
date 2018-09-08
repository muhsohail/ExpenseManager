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

  addExpense(amount, datespent, purpose, category) {
    this.expenseService.addExpense(amount, datespent, purpose, category);
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

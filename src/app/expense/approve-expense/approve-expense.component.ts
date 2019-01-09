import { Component, OnInit, Inject } from '@angular/core';
import { expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-approve-expense',
  templateUrl: './approve-expense.component.html',
  styleUrls: ['./approve-expense.component.css']
})
export class ApproveExpenseComponent implements OnInit {
  objExpense: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    public toastr: ToastrManager,
    private fb: FormBuilder, public dialogRef: MatDialogRef<ApproveExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  showSuccess() {
    this.toastr.successToastr('Express entry has been approved.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  ngOnInit() {
    debugger
    this.objExpense = this.data.item;
  }

  approve(id) {
    debugger
    this.expenseService.approve(id).subscribe(
      data => {
        this.showSuccess();
        this.dialogRef.close();
      },
      error => {
        this.showError();
      });
    ;
  }

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete-expense-registeration',
  templateUrl: './delete-expense-registeration.component.html',
  styleUrls: ['./delete-expense-registeration.component.css']
})
export class DeleteExpenseRegisterationComponent implements OnInit {
  objExpense: any = {};

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    public toastr: ToastrManager,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeleteExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    
  showSuccess() {
    this.toastr.successToastr('Express entry has been updated.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }


  ngOnInit() {
    debugger
    this.objExpense = this.data.item;
  }

  deleteExpense(id) {
    debugger
    this.expenseService.deleteExpense(id).subscribe(
      data => {
        this.showSuccess();
        this.dialogRef.close();
      },
      error => {
        this.showError();
      });
;
  }

  cancelDeleteExpense() {
    this.dialogRef.close();
  }
}

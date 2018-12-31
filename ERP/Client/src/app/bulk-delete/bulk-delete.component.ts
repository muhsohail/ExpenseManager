import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { expense } from '../models/expense';

@Component({
  selector: 'app-bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.css']
})
export class BulkDeleteComponent implements OnInit {
  expenseList: expense[];
  angForm: FormGroup;
  constructor(private expenseService: ExpenseService, private fb: FormBuilder, public dialogRef: MatDialogRef<BulkDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkDeleteDialogData) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      itemsCount: ['', Validators.required]
    });
  }

  delete(itemsCount) {
    debugger
    
    this.expenseService
      .bulkDeleteExpense(itemsCount)
      .subscribe((data: expense[]) => {

        this.expenseList = data;
        this.dialogRef.close();

      });
  }

  ngOnInit() {
  }

}
export interface BulkDeleteDialogData {
  count: number;
}

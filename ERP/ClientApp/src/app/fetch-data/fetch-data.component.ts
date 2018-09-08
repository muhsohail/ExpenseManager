import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ExpenseRegisterationComponent } from '../expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from '../edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from '../delete-expense-registeration/delete-expense-registeration.component';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  expenseList: expense[];
  uri = 'http://localhost:4000/expense';

  constructor(private http: HttpClient, private expenseservice: ExpenseService, private dialog: MatDialog) {

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(ExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  editDialog(id) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      title: 'Angular For Beginners'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(EditExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  deleteDialog(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      title: 'Angular For Beginners'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(DeleteExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }


  ngOnInit() {
    this.expenseservice
      .getExpenses()
      .subscribe((data: expense[]) => {

        for (var i = 0; i < data.length; i++) {
          new Date(data[i].dateSpent).toLocaleDateString();
        }

        this.expenseList = data;

        for (var i = 0; i < data.length; i++) {
          this.expenseList[i].dateSpentString = new Date(this.expenseList[i].dateSpent).toLocaleDateString();
        }

        console.log(this.expenseList);
        
      });
  }
}

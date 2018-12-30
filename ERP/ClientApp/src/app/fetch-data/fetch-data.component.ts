import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { expenseViewModel } from '../fetch-data/expenseViewModel';


import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogConfig, MatTabsModule } from "@angular/material";
import { ExpenseRegisterationComponent } from '../expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from '../edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from '../delete-expense-registeration/delete-expense-registeration.component';
import { MatPaginator, MatSort, MatTableDataSource, MatSortModule  } from '@angular/material';
import { User } from '../models/user';
import { Time } from '@angular/common';
import { delay } from 'q';
import { BulkDeleteComponent } from '../bulk-delete/bulk-delete.component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  expenseList: expense[];  
  ELEMENT_DATA: expenseViewModel[] = [];
  dataSource: any;
  loggedInUser: any;
  currentRole: any;

  btnDeleteShow: boolean = true;
  btnEditShow: boolean = true;
  btnAddShow: boolean = true;
  btnBulkDeleteShow: boolean = true;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;

  expensesCount: Number = 0;

  //displayedColumns: string[];
  //dataSource: expense[];
  displayedColumns: string[] = ['id', 'amount', 'dateSpentString', 'purpose', 'category', 'createdby','lastupdateddateString', 'columndelete','columnedit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient, 
    private expenseservice: ExpenseService, 
    private dialog: MatDialog) {
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      user: this.loggedInUser
    };

    // TODO - Fix the width and height
    const dialogRef = this.dialog.open(ExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  editExpense(expense) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: expense,
      title: 'Edit Expense Entry'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(EditExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  deleteExpense(expense) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: expense,
      title: 'Delete Expense Entry'
    };

    const dialogRef = this.dialog.open(DeleteExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
    });
  }


  getCurrentLoggedInUser() {

    if (localStorage.getItem('currentUser')) {

      this.loggedInUser = localStorage.getItem('currentUser');

      if (JSON.parse(this.loggedInUser).role == "Admin") {
        this.btnDeleteShow = true;
        this.btnEditShow = true;
        this.btnAddShow = true;
        this.btnBulkDeleteShow = true;

      }

      if (JSON.parse(this.loggedInUser).role == "Editor") {
        this.btnDeleteShow = true;
        this.btnEditShow = true;
        this.btnAddShow = false;
        this.btnBulkDeleteShow = true;
      }

      if (JSON.parse(this.loggedInUser).role == "Viewer") {
        this.btnDeleteShow = false;
        this.btnEditShow = false;
        this.btnAddShow = false;
        this.btnBulkDeleteShow = true;
      }
    }
  }

  ngOnInit() {
    this.getCurrentLoggedInUser();
    debugger
    this.expenseservice
      .getExpenses()
      .subscribe((data: expense[]) => {
        this.expenseList = data;
        this.expensesCount = data.length;

        this.ELEMENT_DATA = [];
        for (var i = 0; i < data.length; i++) {         

          this.ELEMENT_DATA.push({
            'id': data[i].id,
            'amount': data[i].amount,
            'dateSpentString': new Date(data[i].dateSpent).toLocaleDateString(),
            'purpose': data[i].purpose,
            'category': data[i].category,
            'createdby':  data[i].hasOwnProperty("createdby") ? data[i].createdby : "admin",
            'lastupdateddateString': data[i].hasOwnProperty("lastupdateddate") ? new Date(data[i].lastupdateddate).toLocaleDateString() : new Date().toLocaleDateString()
          });
        }

        //this.dataSource = this.ELEMENT_DATA;
        this.dataSource = new MatTableDataSource<expenseViewModel>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //this.paginator._changePageSize(this.paginator.pageSize); 
        // TODO - Refresh after Edit Dialog closed.
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

//const ELEMENT_DATA: expenseViewModel[] = [
//  { amount: '1', dateSpentString: 'Hydrogen', purpose: '1.0079', category: 'H' }
//];


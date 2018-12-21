import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ExpenseRegisterationComponent } from '../expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from '../edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from '../delete-expense-registeration/delete-expense-registeration.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../models/user';
import { Time } from '@angular/common';
import { delay } from 'q';
import { BulkDeleteComponent } from '../bulk-delete/bulk-delete.component';


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

  uri = 'http://localhost:4000/expense';

  constructor(private http: HttpClient, private expenseservice: ExpenseService, private dialog: MatDialog)
  {

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Expense Entry',
      height: '400px',
      width: '900px'
    };

    //const dialogRef = this.dialog.open(ExpenseRegisterationComponent, {
    //  width: '250px',
    //  data: { name: "A", animal: "B" }
    //});

    // TODO - Fix the width and height
    const dialogRef = this.dialog.open(ExpenseRegisterationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  // Bulk delete operation
  openBulkDeleteDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(BulkDeleteComponent, dialogConfig);

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
      title: 'Edit Expense Entry'
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

  getCurrentLoggedInUser() {
    
    if (localStorage.getItem('currentUser')) {

      this.loggedInUser =  localStorage.getItem('currentUser');
      console.log(this.loggedInUser);

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
    //console.log(this.StartTime.getTime());
    this.StartTime = new Date();
    console.log(this.StartTime);
    console.log(this.StartTime.getTime());
    //console.log(this.StartTime.getMilliseconds());
    //console.log(this.StartTime.getSeconds());
    this.expenseservice
      .getExpenses()
      .subscribe((data: expense[]) => {

        for (var i = 0; i < data.length; i++) {
          new Date(data[i].dateSpent).toLocaleDateString();
        }

        this.expenseList = data;
        this.expensesCount = this.expenseList.length;

      //  console.log(this.StartTime.hours.toString());

        for (var i = 0; i < data.length; i++) {
          this.expenseList[i].dateSpentString = new Date(this.expenseList[i].dateSpent).toLocaleDateString();
        }

        this.EndTime = new Date();
        console.log(this.EndTime);
        console.log(this.EndTime.getTime());

        console.log(Math.floor((this.EndTime.getTime() - this.StartTime.getTime()) / 1000));
        this.diff = this.EndTime.getTime() - this.StartTime.getTime();

        this.seconds = ((this.diff % 60000) / 1000).toFixed(0);
        console.log(this.seconds);


        console.log(this.expenseList);
        
      });
  }

  delay(ms: number) {
    new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => console.log("fired"));
  }
}

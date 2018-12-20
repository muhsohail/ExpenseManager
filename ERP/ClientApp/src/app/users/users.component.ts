import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../expense-registeration/expense.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ExpenseRegisterationComponent } from '../expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from '../edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from '../delete-expense-registeration/delete-expense-registeration.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //dialog: any;
  users: User[];

  constructor(private userService: UserService, private dialog: MatDialog) { }


  deleteDialog(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      title: 'Users Management'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(DeleteUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  ngOnInit() {
    
    this.userService
      .getAll()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
}

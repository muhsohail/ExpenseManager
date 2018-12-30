import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { ExpenseService } from '../services/expense.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ExpenseRegisterationComponent } from '../expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from '../edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from '../delete-expense-registeration/delete-expense-registeration.component';
import { MatPaginator, MatSort, MatTableDataSource, MatSortModule } from '@angular/material';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DeleteUserComponent } from '../users/delete-user/delete-user.component';
import { UserViewModel } from '../users/UserViewModel';
import { EdituserComponent } from '../users/edituser/edituser.component';
import{AddUserComponent} from '../users/add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //dialog: any;
  users: User[];
  ELEMENT_DATA: UserViewModel[] = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'role', 'percentage', 'columndelete', 'columnedit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) { }


  deleteUser(user) {
    debugger
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: user,
      title: 'Users Management'
    };

    const dialogRef = this.dialog.open(DeleteUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  editUser(user) {
    debugger
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: user,
      title: 'Users Management'
    };

    const dialogRef = this.dialog.open(EdituserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
  ngOnInit() {

    this.userService
      .getAll()
      .subscribe((data: User[]) => {
        this.users = data;

        this.ELEMENT_DATA = [];
        for (var i = 0; i < data.length; i++) {

          this.ELEMENT_DATA.push({
            'id': data[i]._id,
            'firstname': data[i].firstName,
            'lastname': data[i].lastName,
            'role': data[i].role,
            'password': data[i].password,
            'username': data[i].username,
            'percentage': data[i].hasOwnProperty("percentage") ? data[i].percentage : 0
          });
        }

        this.dataSource = new MatTableDataSource<UserViewModel>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      //user: this.loggedInUser
    };

    // TODO - Fix the width and height
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Settlement } from '../models/settlement';
import { SettlementViewModel } from '../viewModels/settlementViewModel';
import { SettlementService } from '../services/settlement.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddSettlementComponent } from '../settlement/add-settlement/add-settlement.component';
import { EditSettlementComponent } from '../settlement/edit-settlement/edit-settlement.component';
import { DeleteSettlementComponent } from '../settlement/delete-settlement/delete-settlement.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {
  settlements: Settlement[];
  ELEMENT_DATA: SettlementViewModel[] = [];
  dataSource: any;

  displayedColumns: string[] = ['id', 'amount', 'settlementdatestring', 'by', 'columndelete', 'columnedit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private settlementService: SettlementService,
    private dialog: MatDialog
  ) { }

  add() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {

    };

    // TODO - Fix the width and height
    const dialogRef = this.dialog.open(AddSettlementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  edit(expense) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: expense,
      title: 'Edit Expense Entry'
    };

    //this.dialog.open(ExpenseRegisterationComponent, dialogConfig);
    const dialogRef = this.dialog.open(EditSettlementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  delete(expense) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: expense,
      title: 'Delete Expense Entry'
    };

    const dialogRef = this.dialog.open(DeleteSettlementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    debugger
    this.settlementService
      .getAll()
      .subscribe((data: Settlement[]) => {
        this.settlements = data;

        this.ELEMENT_DATA = [];
        for (var i = 0; i < data.length; i++) {

          this.ELEMENT_DATA.push({
            '_id': data[i]._id,
            'amount': data[i].amount,
            'settlementdatestring': new Date(data[i].settlementdate).toLocaleDateString(),
            'by': data[i].by
          });
        }

        this.dataSource = new MatTableDataSource<SettlementViewModel>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

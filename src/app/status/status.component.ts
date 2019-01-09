import { Component, OnInit, ViewChild } from '@angular/core';
import { statusViewModel } from '../viewModels/statusViewModel'
import { MatSort, MatPaginator, MatTableDataSource, MatSortModule } from '@angular/material';
import { StatusService } from '../services/status.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatTabsModule, MatCheckbox } from "@angular/material";
import { EditstatusComponent } from '../status/editstatus/editstatus.component';
import { DeletestatusComponent } from '../status/deletestatus/deletestatus.component';
import { CreatestatusComponent } from '../status/createstatus/createstatus.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  ELEMENT_DATA: statusViewModel[] = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'code', 'description', 'columndelete', 'columnedit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  statuses: statusViewModel[];
  statusCount: number;
  btnAddShow = true;
  constructor(private http: HttpClient, private statusservice: StatusService, private dialog: MatDialog) { }

  ngOnInit() {

    debugger
    this.statusservice
      .getAll()
      .subscribe((data: statusViewModel[]) => {
        this.statuses = data;
        this.statusCount = data.length;

        this.ELEMENT_DATA = [];
        for (var i = 0; i < data.length; i++) {
          this.ELEMENT_DATA.push({
            '_id': data[i]._id,
            'code': data[i].code,
            'description': data[i].description
          });
        }

        this.dataSource = new MatTableDataSource<statusViewModel>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(status) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: status,
      title: 'Delete status entry'
    };

    const dialogRef = this.dialog.open(DeletestatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  edit(status) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: status,
      title: 'Edit Category Entry'
    };

    const dialogRef = this.dialog.open(EditstatusComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  add() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Add status entry',
      height: '400px',
      width: '900px'
    };
    const dialogRef = this.dialog.open(CreatestatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
}

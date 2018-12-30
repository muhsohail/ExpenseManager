import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryViewModel } from '../viewModels/categoryViewModel'
import { MatSort, MatPaginator, MatTableDataSource, MatSortModule } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatTabsModule } from "@angular/material";
import { EditcategoryComponent } from '../category/editcategory/editcategory.component';
import { DeletecategoryComponent } from '../category/deletecategory/deletecategory.component';
import { RegistertcategoryComponent } from '../category/registertcategory/registertcategory.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  ELEMENT_DATA: categoryViewModel[] = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'code', 'description', 'columndelete', 'columnedit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categories: categoryViewModel[];
  categoryCount: number;
  btnAddShow = true;

  constructor(private http: HttpClient, private categoryservice: CategoryService, private dialog: MatDialog) { }

  ngOnInit() {
    debugger
    this.categoryservice
      .getCategories()
      .subscribe((data: categoryViewModel[]) => {
        this.categories = data;
        this.categoryCount = data.length;
        
        this.ELEMENT_DATA = [];
        for (var i = 0; i < data.length; i++) {
          this.ELEMENT_DATA.push({
            'id': data[i].id,
            'code': data[i].code,
            'description': data[i].description,
          });
        }

        this.dataSource = new MatTableDataSource<categoryViewModel>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCategory(category) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: category,
      title: 'Delete category entry'
    };

    const dialogRef = this.dialog.open(DeletecategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
    });
  }

  editCategory(category) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      item: category,
      title: 'Edit Category Entry'
    };

    const dialogRef = this.dialog.open(EditcategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }

  addCategory() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Add category entry',
      height: '400px',
      width: '900px'
    };
    const dialogRef = this.dialog.open(RegistertcategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit()
    });
  }
}

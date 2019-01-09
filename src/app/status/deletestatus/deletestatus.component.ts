import { Component, OnInit, Inject } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExpenseService } from '../../services/expense.service';
import { statusViewModel } from '../../viewModels/statusViewModel';


@Component({
  selector: 'app-deletestatus',
  templateUrl: './deletestatus.component.html',
  styleUrls: ['./deletestatus.component.css']
})
export class DeletestatusComponent implements OnInit {
  status: any = {};
  constructor(public toastr: ToastrManager,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private statusService: StatusService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeletestatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  showSuccess(message: string) {
    this.toastr.successToastr(message, 'Success!');
  }

  showError(message: string) {
    this.toastr.errorToastr(message, 'Whoops!');
  }



  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  ngOnInit() {
    this.status = this.data.item;
  }


  delete(id) {
    this.expenseService.GetExpenseByCategory(this.status.code)
      .subscribe((data: statusViewModel[]) => {
        if (data.length == 0) {

          this.statusService.delete(id)
            .pipe(first())
            .subscribe(
              data => {
                this.showSuccess(data.toString());
                this.dialogRef.close();
              },
              error => {
                this.showError(error);
              });

        }
        else {
          this.showError("Unable to delete status. It is used in expense.");
          this.dialogRef.close();
        }


      });

    debugger
  }

  cancel() {
    this.dialogRef.close();
  }
}

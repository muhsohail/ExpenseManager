import { Component, OnInit, Inject } from '@angular/core';
import { Settlement } from '../../models/settlement';
import { SettlementService } from '../../services/settlement.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-delete-settlement',
  templateUrl: './delete-settlement.component.html',
  styleUrls: ['./delete-settlement.component.css']
})
export class DeleteSettlementComponent implements OnInit {
  settlement: Settlement;

  constructor(
    public toastr: ToastrManager,
    private router: Router,
    private settlementService: SettlementService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeleteSettlementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.settlement = this.data.item;
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been deleted.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Whoops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  cancel() {

    this.dialogRef.close();
  }

  delete(id) {
    this.settlementService.delete(id)
      .subscribe(() => {
        this.showSuccess();
        this.dialogRef.close();
      },
        error => {
          this.showError();
        });
  }
}

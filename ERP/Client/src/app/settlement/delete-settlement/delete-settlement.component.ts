import { Component, OnInit, Inject } from '@angular/core';
import { Settlement } from '../../models/settlement';
import { SettlementService } from '../../services/settlement.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-settlement',
  templateUrl: './delete-settlement.component.html',
  styleUrls: ['./delete-settlement.component.css']
})
export class DeleteSettlementComponent implements OnInit {
  settlement: Settlement;

  constructor(
    private router: Router,
    private settlementService: SettlementService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<DeleteSettlementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.settlement = this.data.item;
  }

  cancel() {

    this.dialogRef.close();
  }

  delete(id) {
    this.settlementService.delete(id)
    .subscribe(() => {
      this.dialogRef.close();
    });
  }
}

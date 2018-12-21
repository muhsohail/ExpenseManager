import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from './expense.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { expense } from '../fetch-data/expense';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-expense-registeration',
  templateUrl: './expense-registeration.component.html',
  styleUrls: ['./expense-registeration.component.css']
})

export class ExpenseRegisterationComponent implements OnInit {
  expenseList: expense[];
  angForm: FormGroup;

  StartTime: Date;
  EndTime: Date;
  diff: any;
  seconds: any;
  loading = false;
  submitted = false;
  // TODO - Move to database
  Categories = [
    { 'id': 1, 'name': 'Category 1' },
    { 'id': 2, 'name': 'Category 2' },
    { 'id': 3, 'name': 'Category 3' }
  ];

  constructor(
    public toastr: ToastrManager,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig,
    private expenseService: ExpenseService,
    private alertService: AlertService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseRegisterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.createForm();
    this.toastaConfig.theme = 'material';
    this.addToast();
  }

  addToast() {
    // Just add default Toast with title only
    this.toastaService.default('Hi there');
    // Or create the instance of ToastOptions
    var toastOptions: ToastOptions = {
      title: "My title",
      msg: "The message",
      showClose: true,
     // timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastaService.info(toastOptions);
    this.toastaService.success(toastOptions);
    this.toastaService.wait(toastOptions);
    this.toastaService.error(toastOptions);
    this.toastaService.warning(toastOptions);
  }

  showSuccess() {
    this.toastr.successToastr('Express entry has been added.', 'Success!');
  }

  showError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  showWarning() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  showInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }

  showCustom() {
    this.toastr.customToastr('Custom Toast', null, { enableHTML: true });
  }

  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', { position: position });
  }


  createForm() {
    this.angForm = this.fb.group({
      amount: ['', Validators.required],
      dateSpent: ['', Validators.required],
      purpose: ['', Validators.required],
      category: ''
    });
  }

  cancelAddExpense() {

    this.dialogRef.close();

  }
  //  addExpense(amount, datespent, purpose, category) {

  addExpense(amount, datespent, purpose, category) {

    //this.StartTime = new Date();

    this.expenseService.addExpense(amount, datespent, purpose, category);
    this.dialogRef.close();

    //this.EndTime = new Date();
    //this.diff = this.EndTime.getTime() - this.StartTime.getTime();
    //this.seconds = ((this.diff % 60000) / 1000).toFixed(0);

    //console.log("Add expense call time in milisecond: " + this.diff);
    //console.log("Add expense call time in seconds: " + this.seconds);

    // for loop
    //for (var i = 0; i < 500; i++) {
    //  this.expenseService.addExpense(amount, datespent, purpose, category);
    //}

    //this.dialogRef.close();

  }

  onSubmit() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.angForm.invalid) {
      return;
    }

    debugger

    this.loading = true;
    this.expenseService.register(this.angForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.addToast();
          this.showSuccess();
          //this.alertService.success('Registration successful', true);
          this.dialogRef.close();
          
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  ngOnInit() {
  }
}

export interface DialogData {
  amount: string;
  purpose: string;
  datespent: Date;
  category: string;
}

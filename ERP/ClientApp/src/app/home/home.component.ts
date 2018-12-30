import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expense } from '../fetch-data/expense';
import { expenseViewModel } from '../fetch-data/expenseViewModel';
import { ExpenseService } from '../expense-registeration/expense.service';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Chart } from 'chart.js'
import { MatDialog, MatDialogConfig, MatTabsModule } from "@angular/material";
import { MatPaginator, MatSort, MatTableDataSource, MatSortModule } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {SettlementService} from '../services/settlement.service';
import { Settlement } from '../models/settlement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  expenses: expense[];
  expenseCount: number;
  currentCategory: string;
  data: DashboardData[] = [];
  dataByUserCreated: DashboardData[] = [];

  chart: any;
  categoryArray: string[] = [];
  amountArray: number[] = [];
  spentBy: string;

  spentByChart: any;
  SpentByArray: string[] = [];
  totalAmoutnSpent: number;
  AmountDueByUserArray: AmountDueByUser[] = [];
  displayedColumns: string[] = ['name', 'amountDue', 'returned','remaining'];
  ELEMENT_DATA: AmountDueByUser[] = [];
  dataSource: any;
  users: User[] = [];
  settlements: Settlement[];
  settlmentItem: Settlement[] = [];
  username: string;
  returnedAmount: number;
  settlementArrat: Settlement[];

  constructor(
    private http: HttpClient,
    private expenseservice: ExpenseService,
    private userService: UserService,
    private settlementService: SettlementService) {

  }

  ngOnInit() {
    debugger

    const settlementPromise = this.settlementService.getAll();
    settlementPromise.subscribe((items: Settlement[]) => {
      this.settlements = items;
    });

    const userProimise = this.userService.getAll();
    userProimise.subscribe((items: User[]) => {
      this.users = items;
    });

    this.expenseservice
      .getExpenses()
      .subscribe((data: expense[]) => {
        this.expenses = data;
        this.expenseCount = data.length;
        this.totalAmoutnSpent = data.filter(item => item.amount).reduce((sum, current) => sum + parseInt(current.amount.toString()), 0);

        for (var i = 0; i < this.users.length; i++) {
          this.username = this.users[i].username;
          this.settlementArrat = this.settlements.filter(element => element.by === this.username);
          this.returnedAmount = this.settlementArrat.length > 0 ? this.settlementArrat.filter(item => item.amount).reduce((sum, current) => sum + parseInt(current.amount.toString()), 0) : 0; 
          this.ELEMENT_DATA.push(
            {
              'name': this.users[i].firstName,
              'amountDue': Math.round(this.totalAmoutnSpent * this.users[i].percentage * 100) / 100,
              'returned': this.returnedAmount,
              'remaining':(Math.round(this.totalAmoutnSpent * this.users[i].percentage * 100) / 100) - (this.returnedAmount)
            });
        }

       // this.ELEMENT_DATA.push({ 'name': "User1", 'amountDue': this.totalAmoutnSpent * 0.55 });
       // this.ELEMENT_DATA.push({ 'name': "User2", 'amountDue': this.totalAmoutnSpent * 0.35 });
        //this.ELEMENT_DATA.push({ 'name': "User3", 'amountDue': this.totalAmoutnSpent * 0.15 });

        this.dataSource = new MatTableDataSource<AmountDueByUser>(this.ELEMENT_DATA);

        this.prepareDashboardData();
        this.chartSetup();

        this.prepareAmountSpentByUser();
        this.spentByChartSetup();
      });
  }

  spentByChartSetup(): any {
    debugger
    this.spentByChart = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: this.SpentByArray,
        datasets: [
          {
            data: this.amountArray,
            borderColor: '#3cba9f',
            backgroundColor: '#3cbb9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  prepareAmountSpentByUser(): any {
    // Group by Spent By
    debugger
    const filtered: expense[] = this.expenses.filter(element => element.createdby !== undefined && element.createdby !== "")

    const source = from(filtered);
    const spentByGroup = source.pipe(
      groupBy(expense => expense.createdby),
      mergeMap(group => group.pipe(toArray()))
    );

    const getResultFromPromise = spentByGroup.subscribe(val => {
      this.SumByUserCreated(val);
    });
  }
  chartSetup(): any {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.categoryArray,
        datasets: [
          {
            data: this.amountArray,
            borderColor: '#3cba9f',
            backgroundColor: '#3cbb9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  prepareDashboardData() {
    debugger
    const filteredExpenses: expense[] = this.expenses.filter(element => element.category !== undefined)
    const source = from(filteredExpenses);
    const example = source.pipe(
      groupBy(expense => expense.category),

      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    const subscribe = example.subscribe(val => {
      console.log(val);
      this.SumByCategory(val);

    });

  }

  SumByCategory(val: expense[]): any {
    this.currentCategory = val[0].category.toString();
    var totalAmount = val.reduce(function (prev, cur) {
      return prev + parseInt(cur.amount.toString());
    }, 0);

    console.log('Current Category:', this.currentCategory);
    console.log('Total Amount:', totalAmount); // Total Messages: 461

    this.categoryArray.push(this.currentCategory.toString());
    this.amountArray.push(parseInt(totalAmount.toString()));

    this.data.push({
      category: this.currentCategory,
      amount: totalAmount,
      spentBy: this.spentBy
    });
  }

  SumByUserCreated(val: expense[]): any {
    debugger
    this.spentBy = val[0].createdby.toString();

    var totalAmount = val.reduce(function (prev, cur) {
      return prev + parseInt(cur.amount.toString());
    }, 0);

    this.SpentByArray.push(this.spentBy.toString());
    this.amountArray.push(parseInt(totalAmount.toString()));
  }
}

export interface DashboardData {
  category: string;
  amount: number;
  spentBy: string;
}


export interface AmountDueByUser {
  name: String;
  amountDue: number;
  returned: number;
  remaining: number

}
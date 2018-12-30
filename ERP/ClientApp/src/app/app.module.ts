import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './expense/expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
} from '@angular/material';
import { MillComponent } from './mill/mill.component';
import { ExpenseRegisterationComponent } from './expense/expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from './expense/edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from './expense/delete-expense-registeration/delete-expense-registeration.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { fakeBackendProvider } from '././helpers/fake-backend';
import { AlertComponent } from './directives/alert.component';
import { AuthGuard } from './guard/auth.guard';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { UsersComponent } from './users/users.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { ToastaModule } from 'ngx-toasta';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CategoryComponent } from './category/category.component';
import { DeletecategoryComponent } from './category/deletecategory/deletecategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { RegistertcategoryComponent } from './category/registertcategory/registertcategory.component';
import { EdituserComponent } from './users/edituser/edituser.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { SettlementComponent } from './settlement/settlement.component';
import { AddSettlementComponent } from './settlement/add-settlement/add-settlement.component';
import { EditSettlementComponent } from './settlement/edit-settlement/edit-settlement.component';
import { DeleteSettlementComponent } from './settlement/delete-settlement/delete-settlement.component';


//import { HomeComponent } from './home';/

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MillComponent,
    ExpenseRegisterationComponent,
    EditExpenseRegisterationComponent,
    DeleteExpenseRegisterationComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    DeleteUserComponent,
    BulkDeleteComponent,
    CategoryComponent,
    DeletecategoryComponent,
    EditcategoryComponent,
    RegistertcategoryComponent,
    EdituserComponent,
    AddUserComponent,
    SettlementComponent,
    AddSettlementComponent,
    EditSettlementComponent,
    DeleteSettlementComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    FormsModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'counter', component: CounterComponent },
      { path: 'expense', component: FetchDataComponent, canActivate: [AuthGuard] },
      { path: 'mill', component: MillComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'settlement', component: SettlementComponent, canActivate: [AuthGuard] },

    ]),
    ToastaModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ExpenseRegisterationComponent,
    EditExpenseRegisterationComponent,
    DeleteExpenseRegisterationComponent,
    DeleteUserComponent,
    BulkDeleteComponent,
    DeletecategoryComponent,
    EditcategoryComponent,
    RegistertcategoryComponent,
    EdituserComponent,
    AddUserComponent,
    AddSettlementComponent,
    EditSettlementComponent,
    DeleteSettlementComponent
  ]

})
export class AppModule { }
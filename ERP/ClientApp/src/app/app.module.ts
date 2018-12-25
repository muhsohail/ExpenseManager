import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
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
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyTableComponent } from './my-table/my-table.component';
import { MillComponent } from './mill/mill.component';
import { ExpenseRegisterationComponent } from './expense-registeration/expense-registeration.component';
import { EditExpenseRegisterationComponent } from './edit-expense-registeration/edit-expense-registeration.component';
import { DeleteExpenseRegisterationComponent } from './delete-expense-registeration/delete-expense-registeration.component';
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
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { ToastaModule } from 'ngx-toasta';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CategoryComponent } from './category/category.component';
import { DeletecategoryComponent } from './deletecategory/deletecategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { RegistertcategoryComponent } from './registertcategory/registertcategory.component';


//import { HomeComponent } from './home';/

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MyNavComponent,
    MyDashboardComponent,
    MyTableComponent,
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
    RegistertcategoryComponent
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
      { path: '', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard]},
      { path: 'my-dashboard', component: MyDashboardComponent },
      { path: 'mill', component: MillComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UsersComponent },
      { path: 'category', component: CategoryComponent },


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
    RegistertcategoryComponent]
})
export class AppModule { }

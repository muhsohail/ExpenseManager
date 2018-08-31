import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRegisterationComponent } from './expense-registeration.component';

describe('ExpenseRegisterationComponent', () => {
  let component: ExpenseRegisterationComponent;
  let fixture: ComponentFixture<ExpenseRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

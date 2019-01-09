import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExpenseComponent } from './approve-expense.component';

describe('ApproveExpenseComponent', () => {
  let component: ApproveExpenseComponent;
  let fixture: ComponentFixture<ApproveExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

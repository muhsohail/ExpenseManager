import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseRegisterationComponent } from './edit-expense-registeration.component';

describe('EditExpenseRegisterationComponent', () => {
  let component: EditExpenseRegisterationComponent;
  let fixture: ComponentFixture<EditExpenseRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpenseRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpenseRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

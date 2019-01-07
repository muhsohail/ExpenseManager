import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpenseRegisterationComponent } from './delete-expense-registeration.component';

describe('DeleteExpenseRegisterationComponent', () => {
  let component: DeleteExpenseRegisterationComponent;
  let fixture: ComponentFixture<DeleteExpenseRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExpenseRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExpenseRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

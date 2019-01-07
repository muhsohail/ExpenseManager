import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettlementComponent } from './add-settlement.component';

describe('AddSettlementComponent', () => {
  let component: AddSettlementComponent;
  let fixture: ComponentFixture<AddSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

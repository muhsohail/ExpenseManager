import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettlementComponent } from './edit-settlement.component';

describe('EditSettlementComponent', () => {
  let component: EditSettlementComponent;
  let fixture: ComponentFixture<EditSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

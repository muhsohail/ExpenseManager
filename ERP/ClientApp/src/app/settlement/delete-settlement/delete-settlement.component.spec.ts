import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSettlementComponent } from './delete-settlement.component';

describe('DeleteSettlementComponent', () => {
  let component: DeleteSettlementComponent;
  let fixture: ComponentFixture<DeleteSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

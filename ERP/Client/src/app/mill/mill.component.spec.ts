import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillComponent } from './mill.component';

describe('MillComponent', () => {
  let component: MillComponent;
  let fixture: ComponentFixture<MillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

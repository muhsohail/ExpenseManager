import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletestatusComponent } from './deletestatus.component';

describe('DeletestatusComponent', () => {
  let component: DeletestatusComponent;
  let fixture: ComponentFixture<DeletestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

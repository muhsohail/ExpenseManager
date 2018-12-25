import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertcategoryComponent } from './registertcategory.component';

describe('RegistertcategoryComponent', () => {
  let component: RegistertcategoryComponent;
  let fixture: ComponentFixture<RegistertcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistertcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistertcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

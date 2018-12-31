import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoryComponent } from './editcategory.component';

describe('EditcategoryComponent', () => {
  let component: EditcategoryComponent;
  let fixture: ComponentFixture<EditcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPointComponent } from './add-new-point.component';

describe('AddNewPointComponent', () => {
  let component: AddNewPointComponent;
  let fixture: ComponentFixture<AddNewPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

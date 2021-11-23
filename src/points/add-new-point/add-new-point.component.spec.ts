import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNewPointComponent } from './add-new-point.component';

describe('AddNewPointComponent', () => {
  let component: AddNewPointComponent;
  let fixture: ComponentFixture<AddNewPointComponent>;

  beforeEach(waitForAsync(() => {
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApplyPointsToStudentComponent } from './apply-points-to-student.component';

describe('ApplyPointsToStudentComponent', () => {
  let component: ApplyPointsToStudentComponent;
  let fixture: ComponentFixture<ApplyPointsToStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyPointsToStudentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyPointsToStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

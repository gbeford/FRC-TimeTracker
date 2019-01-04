import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPointsToStudentComponent } from './apply-points-to-student.component';

describe('ApplyPointsToStudentComponent', () => {
  let component: ApplyPointsToStudentComponent;
  let fixture: ComponentFixture<ApplyPointsToStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyPointsToStudentComponent ]
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

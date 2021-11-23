import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentTimePointReportComponent } from './student-time-point-report.component';

describe('StudentTimePointReportComponent', () => {
  let component: StudentTimePointReportComponent;
  let fixture: ComponentFixture<StudentTimePointReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTimePointReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimePointReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

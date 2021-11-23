import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentHoursReportComponent } from './student-hours-report.component';

describe('StudentHoursReportComponent', () => {
  let component: StudentHoursReportComponent;
  let fixture: ComponentFixture<StudentHoursReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHoursReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHoursReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

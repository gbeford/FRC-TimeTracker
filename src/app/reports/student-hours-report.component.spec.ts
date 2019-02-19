import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHoursReportComponent } from './student-hours-report.component';

describe('StudentHoursReportComponent', () => {
  let component: StudentHoursReportComponent;
  let fixture: ComponentFixture<StudentHoursReportComponent>;

  beforeEach(async(() => {
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuertinReportComponent } from './guertin-report.component';

describe('GuertinReportComponent', () => {
  let component: GuertinReportComponent;
  let fixture: ComponentFixture<GuertinReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuertinReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuertinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelOrdersReportComponent } from './apparel-orders-report.component';

describe('ApparelOrdersReportComponent', () => {
  let component: ApparelOrdersReportComponent;
  let fixture: ComponentFixture<ApparelOrdersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelOrdersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

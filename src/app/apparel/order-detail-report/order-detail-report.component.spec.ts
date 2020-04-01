import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailReportComponent } from './order-detail-report.component';

describe('OrderDetailReportComponent', () => {
  let component: OrderDetailReportComponent;
  let fixture: ComponentFixture<OrderDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

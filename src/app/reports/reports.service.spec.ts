import { TestBed } from '@angular/core/testing';

import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let reportService: ReportsService,
    mockHttp;


  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get'])
    reportService = new ReportsService(mockHttp);

    // it('should be created', () => {

    // });
  });

  // it('should be created', () => {
  //   const service: ReportsService = TestBed.get(ReportsService);
  //   expect(service).toBeTruthy();
  // });
});

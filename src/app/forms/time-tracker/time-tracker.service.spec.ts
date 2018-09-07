import { TestBed, inject } from '@angular/core/testing';

import { StudentService } from './student.service';

describe('TimeTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentService]
    });
  });

  it('should be created', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));
});

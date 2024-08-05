import { TestBed } from '@angular/core/testing';

import { DataReportService } from './data-report.service';

describe('DataReportService', () => {
  let service: DataReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

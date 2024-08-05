import { TestBed } from '@angular/core/testing';

import { ExtraParameterService } from './extra-parameter.service';

describe('ExtraParameterService', () => {
  let service: ExtraParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

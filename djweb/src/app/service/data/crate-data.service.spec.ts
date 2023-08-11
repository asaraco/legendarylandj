import { TestBed } from '@angular/core/testing';

import { CrateDataService } from './crate-data.service';

describe('CrateDataService', () => {
  let service: CrateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

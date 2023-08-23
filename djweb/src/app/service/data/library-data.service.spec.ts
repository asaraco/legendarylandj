import { TestBed } from '@angular/core/testing';

import { LibraryDataService } from './library-data.service';

describe('LibraryDataService', () => {
  let service: LibraryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

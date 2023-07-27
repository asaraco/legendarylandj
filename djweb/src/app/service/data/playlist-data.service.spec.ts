import { TestBed } from '@angular/core/testing';

import { PlaylistDataService } from './playlist-data.service';

describe('PlaylistDataService', () => {
  let service: PlaylistDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

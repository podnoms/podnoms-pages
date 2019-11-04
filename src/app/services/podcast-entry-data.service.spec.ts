import { TestBed } from '@angular/core/testing';

import { PodcastEntryDataService } from './podcast-entry-data.service';

describe('PodcastEntryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PodcastEntryDataService = TestBed.get(PodcastEntryDataService);
    expect(service).toBeTruthy();
  });
});

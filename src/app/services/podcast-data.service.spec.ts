import { TestBed } from '@angular/core/testing';

import { PodcastDataService } from './podcast-data.service';

describe('PodcastDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PodcastDataService = TestBed.get(PodcastDataService);
    expect(service).toBeTruthy();
  });
});

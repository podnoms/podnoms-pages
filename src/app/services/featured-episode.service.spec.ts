import { TestBed } from '@angular/core/testing';

import { FeaturedPodcastService } from './featured-episode.service';

describe('FeaturedPodcastService', () => {
  let service: FeaturedPodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedPodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

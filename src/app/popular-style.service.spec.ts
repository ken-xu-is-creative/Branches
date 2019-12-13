import { TestBed } from '@angular/core/testing';

import { PopularStyleService } from './popular-style.service';

describe('PopularStyleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopularStyleService = TestBed.get(PopularStyleService);
    expect(service).toBeTruthy();
  });
});

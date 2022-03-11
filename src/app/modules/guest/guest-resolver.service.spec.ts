import { TestBed } from '@angular/core/testing';

import { GuestResolverService } from './guest-resolver.service';

describe('GuestResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestResolverService = TestBed.get(GuestResolverService);
    expect(service).toBeTruthy();
  });
});

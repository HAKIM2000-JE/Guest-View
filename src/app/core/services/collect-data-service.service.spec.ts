import { TestBed } from '@angular/core/testing';

import { CollectDataServiceService } from './collect-data-service.service';

describe('CollectDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectDataServiceService = TestBed.get(CollectDataServiceService);
    expect(service).toBeTruthy();
  });
});

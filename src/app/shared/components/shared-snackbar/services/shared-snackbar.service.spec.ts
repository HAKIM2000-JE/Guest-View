import { TestBed } from '@angular/core/testing';

import { SharedSnackbarService } from './shared-snackbar.service';

describe('SharedSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedSnackbarService = TestBed.get(SharedSnackbarService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PendingChangesGuard } from './guard.service';

describe('PendingChangesGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingChangesGuard = TestBed.get(PendingChangesGuard);
    expect(service).toBeTruthy();
  });
});

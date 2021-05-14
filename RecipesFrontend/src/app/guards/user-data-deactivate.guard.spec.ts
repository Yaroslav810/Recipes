import { TestBed } from '@angular/core/testing';

import { UserDataDeactivateGuard } from './user-data-deactivate.guard';

describe('UserDataDeactivateGuard', () => {
  let guard: UserDataDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserDataDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthenticationAccessGuard } from './authentication-access.guard';

describe('AuthenticationAccessGuard', () => {
  let guard: AuthenticationAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthLoginGuardGuard } from './auth-login-guard.guard';

describe('AuthLoginGuardGuard', () => {
  let guard: AuthLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRoleGuard } from './auth-role.guard';

describe('authRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

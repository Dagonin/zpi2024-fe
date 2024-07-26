import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { negateAuthGuard } from './negate-auth.guard';

describe('negateAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => negateAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

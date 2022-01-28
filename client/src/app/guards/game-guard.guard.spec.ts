import { TestBed } from '@angular/core/testing';

import { GameGuardGuard } from './game-guard.guard';

describe('GameGuardGuard', () => {
  let guard: GameGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

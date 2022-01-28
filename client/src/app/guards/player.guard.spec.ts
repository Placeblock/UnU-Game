import { TestBed } from '@angular/core/testing';

import { PlayerGuard } from './player.guard';

describe('PlayerGuard', () => {
  let guard: PlayerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

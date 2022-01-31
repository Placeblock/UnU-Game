import { TestBed } from '@angular/core/testing';

import { PlayerregistryService } from './playerregistry.service';

describe('PlayerregistryService', () => {
  let service: PlayerregistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerregistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

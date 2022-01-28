import { TestBed } from '@angular/core/testing';

import { DrawpillService } from './drawpill.service';

describe('DrawpillService', () => {
  let service: DrawpillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawpillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

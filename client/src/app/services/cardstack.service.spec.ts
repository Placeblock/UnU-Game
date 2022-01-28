import { TestBed } from '@angular/core/testing';

import { CardstackService } from './cardstack.service';

describe('CardstackService', () => {
  let service: CardstackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardstackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

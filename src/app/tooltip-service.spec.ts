import { TestBed } from '@angular/core/testing';

import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  let service: Tooltip;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tooltip);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

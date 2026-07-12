import { TestBed } from '@angular/core/testing';

import { Wallhaven } from './wallhaven';

describe('Wallhaven', () => {
  let service: Wallhaven;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wallhaven);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

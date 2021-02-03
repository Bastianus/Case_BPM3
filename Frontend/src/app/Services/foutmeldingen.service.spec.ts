import { TestBed } from '@angular/core/testing';

import { FoutmeldingenService } from './foutmeldingen.service';

describe('FoutmeldingenService', () => {
  let service: FoutmeldingenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoutmeldingenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

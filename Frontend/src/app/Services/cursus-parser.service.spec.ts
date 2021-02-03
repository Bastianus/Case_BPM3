import { TestBed } from '@angular/core/testing';

import { CursusParserService } from './cursus-parser.service';

describe('CursusParserService', () => {
  let service: CursusParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursusParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

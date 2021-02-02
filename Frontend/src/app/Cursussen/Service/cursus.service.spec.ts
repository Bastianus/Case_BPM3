import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { CursusService } from './cursus.service';

describe('CursusService', () => {
  let service: CursusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CursusService]
    });
    service = TestBed.inject(CursusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeeknummerService } from './weeknummer.service';

describe('WeeknummerService', () => {
  let service: WeeknummerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WeeknummerService]
    });
    service = TestBed.inject(WeeknummerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

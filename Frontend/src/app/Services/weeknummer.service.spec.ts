import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeeknummerService } from './weeknummer.service';

describe('WeeknummerService', () => {
  let service: WeeknummerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeknummerService]
    });
    service = TestBed.inject(WeeknummerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('weeknummer geeft het juiste resultaat', () =>
  {
    let input = new Date(2021,1,4);
    let verwachtAntwoord = 5;

    let antwoord = service.Weeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })

  it('Weeknummer geeft het juiste resultaat voor 28 December 2015', () =>
  {
    let input = new Date(2015,11,28);
    let verwachtAntwoord = 53;

    let antwoord = service.Weeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })

  it('Weeknummer geeft het juiste resultaat voor 30 Oktober 2016', () =>
  {
    let input = new Date(2016,9,30);
    let verwachtAntwoord = 43;

    let antwoord = service.Weeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })
});

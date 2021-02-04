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

  it('BepaalWeeknummer geeft het juiste resultaat', () =>
  {
    let input = new Date(2021,1,4);
    let verwachtAntwoord = 5;

    let antwoord = service.BepaalWeeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })

  it('BepaalWeeknummer geeft het juiste resultaat voor 28 December 2015', () =>
  {
    let input = new Date(2015,11,28);
    let verwachtAntwoord = 53;

    let antwoord = service.BepaalWeeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })

  it('BepaalWeeknummer geeft het juiste resultaat voor 30 Oktober 2016', () =>
  {
    let input = new Date(2016,9,30);
    let verwachtAntwoord = 43;

    let antwoord = service.BepaalWeeknummer(input);

    expect(antwoord).toBe(verwachtAntwoord);
  })

  it('BepaalDatumByJaarEnWeeknummer geeft het juiste resultaat', () =>
  {
    let jaar = 2021;
    let weeknummer = 5;
    let verwachtAntwoord = new Date(2021,1,1);

    let antwoord = service.BepaalDatumByJaarEnWeeknummer(jaar, weeknummer);

    expect(antwoord.getFullYear()).toBe(verwachtAntwoord.getFullYear());
    expect(antwoord.getMonth()).toBe(verwachtAntwoord.getMonth());
    expect(antwoord.getDate()).toBe(verwachtAntwoord.getDate());
  })

  it('BepaalDatumByJaarEnWeeknummer geeft het juiste resultaat voor 2016, week 43', () =>
  {
    let jaar = 2016;
    let weeknummer = 43;
    let verwachtAntwoord = new Date(2016,9,24);

    let antwoord = service.BepaalDatumByJaarEnWeeknummer(jaar, weeknummer);

    expect(antwoord.getFullYear()).toBe(verwachtAntwoord.getFullYear());
    expect(antwoord.getMonth()).toBe(verwachtAntwoord.getMonth());
    expect(antwoord.getDate()).toBe(verwachtAntwoord.getDate());
  })

  it('BepaalDatumByJaarEnWeeknummer geeft het juiste resultaat', () =>
  {
    let jaar = 2015;
    let weeknummer = 52;
    let verwachtAntwoord = new Date(2015,11,28);

    let antwoord = service.BepaalDatumByJaarEnWeeknummer(jaar, weeknummer);

    expect(antwoord.getFullYear()).toBe(verwachtAntwoord.getFullYear());
    expect(antwoord.getMonth()).toBe(verwachtAntwoord.getMonth());
    expect(antwoord.getDate()).toBe(verwachtAntwoord.getDate());
  })


});

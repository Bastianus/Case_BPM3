import { TestBed } from '@angular/core/testing';
import { Cursus } from '../Models/Cursus';

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

  it("ParseToCursus geeft het juiste resultaat", () => 
  {
    let input = ": een titel Cursuscode: een cursuscode Duur: een duratie Startdatum: een startdatum   ";
    let verwachteCursus = new Cursus();
    verwachteCursus.Naam = "een titel";
    verwachteCursus.CursusCode = "een cursuscode";
    verwachteCursus.Duur = "een duratie";
    verwachteCursus.Startdatum = "een startdatum";

    let antwoord = service.ParseToCursus(input);

    expect(antwoord).toBeTruthy();
    expect(antwoord).toEqual(verwachteCursus);
  })
});

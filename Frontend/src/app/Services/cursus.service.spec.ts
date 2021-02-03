import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { CursusService } from './cursus.service';
import { Cursus } from '../Models/Cursus';

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

  it("TransformVoorVerzenden geeft het juiste resultaat terug", () =>
  {
    let input = new Cursus();
    input.CursusCode = " Dit is een cursuscode ";
    input.Duur = " Dit is een duratie ";
    input.Naam = " Dit is een naam ";
    input.Startdatum = "07/06/2020";

    let verwachteCursus = new Cursus();
    verwachteCursus.CursusCode = "Dit is een cursuscode";
    verwachteCursus.Duur = "Dit is een duratie";
    verwachteCursus.Naam = "Dit is een naam";
    verwachteCursus.Startdatum = "2020/06/07";

    let antwoord = service.TransformVoorVerzenden(input);
    expect(antwoord).toEqual(verwachteCursus);
  })
});

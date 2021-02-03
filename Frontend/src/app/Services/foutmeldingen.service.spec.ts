import { TestBed } from '@angular/core/testing';
import { Cursus } from '../Models/Cursus';

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

  it("CheckVoorFouten moet bestaan", () => 
  {
    expect(service.CheckVoorFouten).toBeTruthy();    
  });

  it("CheckVoorFoutmeldingen moet geen fouten geven bij correcte input", () => 
  {
    let input = new Array<string>();
    input.push(": C# Programmeren\n"+
               "Cursuscode: CNETIN\n"+
               "Duur: 5 dagen\n"+
               "Startdatum: 8/10/2018\n\n")

    let teller = 0;
    let foutmeldingen = new Array<string>();

    let antwoord = service.CheckVoorFouten(input, teller, foutmeldingen);

    expect(antwoord.length).toBe(0);
  })

  it("CheckVoorFoutmeldingen moet correcte fout geven bij verkeerde volgorde", () => 
  {
    let input = new Array<string>();
    input.push(": C# Programmeren\n"+               
               "Duur: 5 dagen\n"+
               "Cursuscode: CNETIN\n"+
               "Startdatum: 8/10/2018\n\n")
    let teller = 0;
    let foutmeldingen = new Array<string>();

    let antwoord = service.CheckVoorFouten(input, teller, foutmeldingen);

    expect(antwoord.length).toBe(1);

    expect(antwoord[0]).toBe("De " + (teller+1) + "e cursus had een volgorde fout in zijn data.");
  })

  it("CheckDuur moet geen fout geven bij een correcte duur", () => 
  {
    let input = " 3 dagen";
    let foutmeldingen = new Array<string>();
    let teller = 0;

    let antwoord = service.CheckDuur(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(0);
  })

  it("CheckDuur moet de juiste fout geven als de input niet uit de juiste delen bestaat", () => 
  {
    let input = "3 dagen";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "De opbouw van de duur \"" + input + "\" van de " + (teller+1) + "e cursus voldoet niet aan de verwachting";

    let antwoord = service.CheckDuur(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(3);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDuur moet de juiste fout geven als het eerste deel niet een getal is", () =>
  {
    let input = " drie dagen";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Het eerste deel van de duur van de " + (teller+1) + "e cursus is : \"" + input +"\" ,niet een getal";

    let antwoord = service.CheckDuur(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDuur moet de juiste fout geven als er geen beschrijving is na het getal", () =>
  {
    let input = " 3 ";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "De beschrijving van de duur van cursus " + (teller+1) + "e cursus ontbreekt.";

    let antwoord = service.CheckDuur(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDuur moet de juiste fout geven als het laatste deel niet dagen is", () =>
  {
    let input = " 3 doggen";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "De beschrijving van de " + (teller+1) + "e cursus is: \"" + input + "\", en niet \"dagen\"";

    let antwoord = service.CheckDuur(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })
  
  it("CheckDatum moet geen fout geven bij een correcte input", () => 
  {
    let input = "05/06/2020";
    let foutmeldingen = new Array<string>();
    let teller = 0;

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(0);
  })

  it("CheckDatum moet de juiste fout geven als de input niet de juiste splitsingtekens heeft", () => 
  {
    let input = "05-06-2020";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "De startdatum " + input + "van de " + (teller+1) + "e cursus gebruikt de verkeerde separator en/of heeft niet de juiste hoeveelheid elementen";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als de input te weinig onderdelen bevat", () => 
  {
    let input = "05/06";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "De startdatum " + input + "van de " + (teller+1) + "e cursus gebruikt de verkeerde separator en/of heeft niet de juiste hoeveelheid elementen";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als het jaargetal niet een getal is", () => 
  {
    let input = "05/06/ditjaar";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Jaar ditjaar van de " + (teller+1) + "e cursus is niet een getal";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als de maand niet een getal is", () => 
  {
    let input = "05/zes/2020";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Maand zes van de " + (teller+1) + "e cursus is niet een getal";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als de dag niet een getal is", () => 
  {
    let input = "vijf/06/2020";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Dag vijf van de " + (teller+1) + "e cursus is niet een getal";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als het jaar voor 1800 ligt", () => 
  {
    let input = "05/06/1799";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Jaar 1799 van de " + (teller+1) + "e cursus is onlogisch";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als het jaar na 3000 ligt", () => 
  {
    let input = "05/06/3001";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Jaar 3001 van de " + (teller+1) + "e cursus is onlogisch";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckDatum moet de juiste fout geven als de maand groter dan 12 is", () => 
  {
    let input = "05/13/2020";
    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Maand 13 van de " + (teller+1) + "e cursus is onlogisch";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })  

  it("CheckDatum moet geen fout geven als de dag de laatste dag in van de maand", () => 
  {
    let maandenMet31Dagen = ["01","03","05","07","08","10","12"];
    for(let i=0; i < maandenMet31Dagen.length; i++)
    {
      let input = "31/" + maandenMet31Dagen[i] + "/2021";

      let foutmeldingen = new Array<string>();
      let teller = 0;

      let antwoord = service.CheckDatum(input, foutmeldingen, teller);

      expect(antwoord.length).toBe(0);
    }

    let maandenMet30Dagen = ["04","06","09","11"];
    for(let i=0; i < maandenMet30Dagen.length; i++)
    {
      let input = "30/" + maandenMet31Dagen[i] + "/2021";

      let foutmeldingen = new Array<string>();
      let teller = 0;

      let antwoord = service.CheckDatum(input, foutmeldingen, teller);

      expect(antwoord.length).toBe(0);
    }

    let input = "29/02/2021";

    let foutmeldingen = new Array<string>();
    let teller = 0;

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(0);
  })

  it("CheckDatum moet de juiste fout geven als de dag groter is dan mogelijk in die maand", () => 
  {
    let maandenMet31Dagen = ["01","03","05","07","08","10","12"];
    for(let i=0; i < maandenMet31Dagen.length; i++)
    {
      let input = "32/" + maandenMet31Dagen[i] + "/2021";

      let foutmeldingen = new Array<string>();
      let teller = 0;
      let verwachtAntwoord = "Dag 32 van de " + (teller+1) + "e cursus is onlogisch";

      let antwoord = service.CheckDatum(input, foutmeldingen, teller);

      expect(antwoord.length).toBe(1);
      expect(antwoord[0]).toBe(verwachtAntwoord);
    }

    let maandenMet30Dagen = ["04","06","09","11"];
    for(let i=0; i < maandenMet30Dagen.length; i++)
    {
      let input = "31/" + maandenMet30Dagen[i] + "/2021";

      let foutmeldingen = new Array<string>();
      let teller = 0;
      let verwachtAntwoord = "Dag 31 van de " + (teller+1) + "e cursus is onlogisch";

      let antwoord = service.CheckDatum(input, foutmeldingen, teller);

      expect(antwoord.length).toBe(1);
      expect(antwoord[0]).toBe(verwachtAntwoord);
    }
    
    let input = "30/02/2021";

    let foutmeldingen = new Array<string>();
    let teller = 0;
    let verwachtAntwoord = "Dag 30 van de " + (teller+1) + "e cursus is onlogisch";

    let antwoord = service.CheckDatum(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
    
  })  

  it("CheckWitregels geeft geen fout bij het juiste aantal witregels", () => 
  {
    let cursussen = new Array<string>();
    cursussen.push("eerste cursus");
    cursussen.push("tweede cursus");
    let foutmeldingen = new Array<string>();
    let aantalWitregels = 2;
    let teller=cursussen.length;

    let antwoord = service.CheckWitregels(cursussen, foutmeldingen, aantalWitregels, teller);

    expect(antwoord.length).toBe(0);
  })

  it("CheckWitregels geeft de juiste fout bij een onjuist aantal witregels", () => 
  {
    let cursussen = new Array<string>();
    cursussen.push("eerste cursus");
    cursussen.push("tweede cursus");
    let foutmeldingen = new Array<string>();
    let aantalWitregels = 3;
    let tellers=3;

    let antwoord = service.CheckWitregels(cursussen, foutmeldingen, aantalWitregels, tellers);

    expect(antwoord.length).toBe(1);
  })

  it("CheckVolgorde geeft de juiste fout als er een volgorde fout is opgetrden", () => 
  {
    let foutmeldingen = new Array<string>();
    let input = true;
    let teller = 3;
    let verwachtAntwoord = "De " + (teller+1) + "e cursus had een volgorde fout in zijn data.";

    let antwoord = service.CheckVolgorde(input, foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })

  it("CheckVulling geeft geen fout als de vulling allemaal lang genoeg zijn", () => 
  {
    let foutmeldingen = new Array<string>();
    let input = new Cursus();
    input.Startdatum = "05/06/2020";
    input.Naam = "Piet";
    input.CursusCode = "ABC";
    input.Duur = "een tijdje";
    let teller = 2;

    let antwoord = service.CheckVulling(input,foutmeldingen, teller);

    expect(antwoord.length).toBe(0);
  })

  it("CheckVulling geeft de juiste fout als tenmisnte 1 van de vulling te kort is", () => 
  {
    let foutmeldingen = new Array<string>();
    let input = new Cursus();
    input.Startdatum = "05/06/2020";
    input.Naam = "";
    input.CursusCode = "ABC";
    input.Duur = "een tijdje";
    let teller = 2;
    let verwachtAntwoord = "De " + (teller+1) + "e cursus bevatte niet genoeg informatie om een cursus te vullen";

    let antwoord = service.CheckVulling(input,foutmeldingen, teller);

    expect(antwoord.length).toBe(1);
    expect(antwoord[0]).toBe(verwachtAntwoord);
  })
});

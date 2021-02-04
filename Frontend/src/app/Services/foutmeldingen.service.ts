import { Injectable } from '@angular/core';
import { Cursus } from '../Models/Cursus';

@Injectable({
  providedIn: 'root'
})
export class FoutmeldingenService {

  constructor() { }
 
  CheckVoorFouten(cursussen : string[], teller : number, foutmeldingen: string[]) : string[]
  {
    let cursusKandidaat = cursussen[teller];

    let volgordeFout = false;
    let hoeveelheidWitregels : number = 0;

    let regelsVanDezeCursus: string[] = cursusKandidaat.split("\n");

    //werken per regel van een cursuskandidaat
    for (let i=0; i<regelsVanDezeCursus.length;i++)
    {
    let regel:string = regelsVanDezeCursus[i];

        let beschrijving = regel.substring(0,regel.indexOf(":"));
        let inhoud = regel.slice(regel.indexOf(":")+1);

        switch (beschrijving) 
        {
          case "Cursuscode":
            if (i!==1) volgordeFout = true;
            break;
          case "Duur":
            if (i!==2) volgordeFout = true;
            foutmeldingen = this.CheckDuur(inhoud, foutmeldingen, i);
            break;
          case "Startdatum":
            if (i!==3) volgordeFout=true;
            foutmeldingen = this.CheckDatum(inhoud, foutmeldingen, i);
            break;
          default:
            if(beschrijving.length===0)
            {
              //het is een witregel of de titel
              if(inhoud.length>1)
              {
                //het is de titel
                if (i!==0) volgordeFout=true;
              }
              else
              {
                hoeveelheidWitregels++;
              }
            }
            else foutmeldingen.push("De " + i + "e beschrijving hoort niet in een cursusinstantie: " + beschrijving + ".")
            break;
        }

    } 
    foutmeldingen = this.CheckWitregels(cursussen, foutmeldingen, hoeveelheidWitregels, teller);
    foutmeldingen = this.CheckVolgorde(volgordeFout, foutmeldingen, teller);    

    return foutmeldingen
  }

  CheckDuur(inhoud: string, foutmeldingen : string[], teller : number) : string[]
  {
    let duurDelen = inhoud.split(" ");
    let getalKandidaat = duurDelen[1];
    let dagenKandidaat = duurDelen[2];

    if (duurDelen.length !== 3)
    {
      foutmeldingen.push("De opbouw van de duur \"" + inhoud + "\" van de " + (teller+1) + "e cursusinstantie van het bestand voldoet niet aan de verwachting")
    }
    if(!+getalKandidaat)
    {
      foutmeldingen.push("Het eerste deel van de duur van de " + (teller+1) + "e cursusinstantie van het bestand is : \"" + inhoud +"\" ,niet een getal")
    }
    if(!dagenKandidaat){
      foutmeldingen.push("De beschrijving van de duur van cursus van de " + (teller+1) + "e cursusinstantie van het bestand ontbreekt.")
    }
    else if(dagenKandidaat.trim() !== "dagen")
    {
      foutmeldingen.push(("De beschrijving van de " + (teller+1) + "e cursusinstantie van het bestand is: \"" + inhoud + "\", en niet \"dagen\""))
    }
    return foutmeldingen;
  }

  CheckDatum(inhoud : string, foutmeldingen : string[], teller : number) : string[]
  {
    let datum = inhoud;
    let datumDelen = datum.split("/")

    if(datumDelen.length != 3)
    {
      foutmeldingen.push("De startdatum " + datum + "van de " + (teller+1) + "e cursusinstantie van het bestand gebruikt de verkeerde separator en/of heeft niet de juiste hoeveelheid elementen");
      return foutmeldingen;
    }

    let jaar = datumDelen[2];
    let maand = datumDelen[1];
    let dag = datumDelen[0];

    //checken of het wel getallen zijn
    if(!+jaar) foutmeldingen.push("Jaar " + jaar + " van de " + (teller+1) + "e cursusinstantie van het bestand is niet een getal");
    if(!+maand) foutmeldingen.push("Maand " + maand + " van de " + (teller+1) + "e cursusinstantie van het bestand is niet een getal");
    if(!+dag) foutmeldingen.push("Dag " + dag + " van de " + (teller+1) + "e cursusinstantie van het bestand is niet een getal");

    //checken of de getallen logisch zijn
      //Voor jaar
    if(+jaar < 1800 || +jaar > 3000) foutmeldingen.push("Jaar " + jaar + " van de " + (teller+1) + "e cursusinstantie van het bestand is onlogisch");
      //Voor maand
    if(+maand > 12) foutmeldingen.push("Maand " + maand + " van de " + (teller+1) + "e cursusinstantie van het bestand is onlogisch");
      //Voor dag
        // is het een maand die 31 dagen kan bevatten
    if([1,3,5,7,8,10,12].find(a=>a===+maand))
    {
      if(+dag < 1 || +dag > 31) foutmeldingen.push("Dag " + dag + " van de " + (teller+1) + "e cursusinstantie van het bestand is onlogisch");
    }
        //is het februari
    else if (+maand===2)
    {
      if(+dag < 1 || +dag > 29) foutmeldingen.push("Dag " + dag + " van de " + (teller+1) + "e cursusinstantie van het bestand is onlogisch");
    }
        //Dan is het een maand die 30 dagen kan bevatten
    else
    {
      if(+dag < 1 || +dag > 30) foutmeldingen.push("Dag " + dag + " van de " + (teller+1) + "e cursusinstantie van het bestand is onlogisch");
    }

    return foutmeldingen;
  }

  CheckWitregels(cursussen : string[], foutmeldingen: string[], hoeveelheidWitregels : number, teller : number) : string[]
  {
    if (hoeveelheidWitregels!==2 && teller !== cursussen.length)
    {
      foutmeldingen.push("Het aantal witregels klopt niet");
    }
    return foutmeldingen;
  }

  CheckVolgorde(volgordeFout: boolean, foutmeldingen : string[], teller : number): string[]
  {
    if (volgordeFout){
      foutmeldingen.push("De " + (teller+1) + "e cursusinstantie van het bestand had een volgorde fout in zijn data.");
    }

    return foutmeldingen;
  }

  CheckVulling(cursus: Cursus, foutmeldingen : string[], teller : number) : string[]
  {
    if(cursus.Naam.length < 2 
      || cursus.Startdatum.length < 2 
      || cursus.CursusCode.length < 2
      || cursus.Duur.length < 2)
    {
      foutmeldingen.push("De " + (teller+1) + "e cursusinstantie van het bestand bevatte niet genoeg informatie om een cursus te vullen")
    }
    return foutmeldingen
  }
}

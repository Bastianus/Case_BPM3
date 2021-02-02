import { Injectable } from '@angular/core';
import { Cursus, CursusMetDatumAlsGetal } from '../Model/Cursus';

@Injectable({
  providedIn: 'root'
})
export class CursusParserService {

  constructor() { }

  parseTextToCursusArray(inputText:string):Array<Cursus> | string[]
  {
    let foutmelding : string[] = new Array<string>();
    let output = new Array<Cursus>();

    //iedere cursus in de tekst begint met Titel
    let losseCursussen:string[] = inputText.split("Titel");

    //met 1 werken we per cursus kanditaat
    for(let i=1;i<losseCursussen.length;i++)
    {
        let volgordeFout = false;
        let dezeNieuweCursus:Cursus=new Cursus();

        //opdelen per regel
        let tempRegelsVanDezeCursus: string[] = losseCursussen[i].split("\n");
        let hoeveelheidWitregels : number = 0;

        //met j werken we per regel van een cursuskandidaat
        for (let j=0; j<tempRegelsVanDezeCursus.length;j++)
        {
        let regel:string = tempRegelsVanDezeCursus[j];

        
            let beschrijving = regel.substring(0,regel.indexOf(":"));
            let inhoud=regel.slice(regel.indexOf(":")+1);

            switch (beschrijving) {
                case "Cursuscode":
                    if (j!==1) volgordeFout = true;
                    dezeNieuweCursus.CursusCode = inhoud;
                    break;
                case "Duur":
                    if (j!==2) volgordeFout = true;
                    //zou moeten bestaan uit een getal, spatie, en de string dagen
                    let duurDelen = inhoud.split(" ");
                    let getalKandidaat = duurDelen[1];
                    let dagenKandidaat = duurDelen[2];
                    if (duurDelen.length !== 3){
                        foutmelding.push("De opbouw van de duur \"" + inhoud + "\" van de " + (i+1) + "e cursus voldoet niet aan de verwachting")
                    }
                    if(!+getalKandidaat){
                        foutmelding.push("Het eerste deel van de duur van de " + (i+1) + "e cursus is : \"" + inhoud +"\" ,niet een getal")
                    }
                    if(!dagenKandidaat){
                        foutmelding.push("De beschrijving van de duur van cursus " + (i+1) + "e cursus ontbreekt.")
                    }
                    else if(dagenKandidaat.trim() !== "dagen"){
                        foutmelding.push(("De beschrijving van de " + (i+1) + "e cursus is: \"" + inhoud + "\", en niet \"dagen\""))
                    }
                    dezeNieuweCursus.Duur = inhoud.slice(inhoud.indexOf(" "));
                    break;
                case "Startdatum":
                    if (j!==3) volgordeFout=true;
                    //check of het een goede datum is
                    let datum = inhoud;
                    let datumDelen = datum.split("/")
                    if(datumDelen.length != 3){
                        foutmelding.push("De startdatum " + datum + "van de " + i + "e cursus gebruikt de verkeerde separator en/of heeft niet de juiste hoeveelheid elementen");
                        break;
                    }
                    let jaar = datumDelen[2];
                    let maand = datumDelen[1];
                    let dag = datumDelen[0];
                    
                    //checken of het wel getallen zijn
                    if(!+jaar) foutmelding.push("Jaar " + jaar + " van de " + i + "e cursus is niet een getal");
                    if(!+maand) foutmelding.push("Maand " + jaar + " van de " + i + "e cursus is niet een getal");
                    if(!+dag) foutmelding.push("Dag " + jaar + " van de " + i + "e cursus is niet een getal");

                    //checken of de getallen logisch zijn
                        //Voor jaar
                    if(+jaar < 1800 || +jaar > 3000) foutmelding.push("Jaar " + jaar + "van de " + i + "e cursus is onlogisch");
                        //Voor maand
                    if(+maand < 1 || +maand > 12) foutmelding.push("Maand " + jaar + "van de " + i + "e cursus is onlogisch");
                        //Voor dag
                            // is het een maand die 31 dagen kan bevatten
                    if([1,3,5,7,8,10,12].find(a=>a===+maand)){
                        if(+dag < 1 || +dag > 31) foutmelding.push("Jaar " + jaar + "van de " + i + "e cursus is onlogisch");
                    }
                            //is het februari
                    else if (+maand===2){
                        if(+dag < 1 || +dag > 29) foutmelding.push("Jaar " + jaar + "van de " + i + "e cursus is onlogisch");
                    }
                            //Dan is het een maand die 30 dagen kan bevatten
                    else{
                        if(+dag < 1 || +dag > 30) foutmelding.push("Jaar " + jaar + "van de " + i + "e cursus is onlogisch");
                    }
                    dezeNieuweCursus.Startdatum = datum;
                    break;
                default:
                    if(beschrijving.length===0){
                        //het is een witregel of de titel
                        if(inhoud.length>1){
                            //het is de titel
                            if (j!==0) volgordeFout=true;
                            dezeNieuweCursus.Naam = inhoud;
                        }
                        else{
                            //er was een witregel
                            hoeveelheidWitregels++;
                        }
                    }
                    else foutmelding.push("De " + i + "e beschrijving hoort niet in een cursus:" + beschrijving + ".")
                    break;
            }
    }

    if (hoeveelheidWitregels!==2 && i !== losseCursussen.length){
        //witregel na de cursus ontbreekt, terwijl er nog een cursus na komt
        foutmelding.push("Er zit geen witregel tussen de " + i + "e cursus en de " + (i+1) + "e cursus");
    }
    // check of alles wel gevuld is
    if(dezeNieuweCursus.Naam.length < 2 
        || dezeNieuweCursus.Startdatum.length < 2 
        || dezeNieuweCursus.CursusCode.length < 2
        || dezeNieuweCursus.Duur.length < 2){
        foutmelding.push("De " + i + "e cursus bevatte niet genoeg informatie om een cursus te vullen")
    }
    //was er een volgorde fout?
    if (volgordeFout){
        foutmelding.push("De " + i + "e cursus had een volgorde fout in zijn data.")
    }
    output.push(dezeNieuweCursus);
  }
  if (foutmelding.length>0){
      return foutmelding;
  }

  return output;
  }

  SortCursusArrayByStartDate(inputArray : Cursus[]) : Cursus[]
  {
    let intermediateArray : CursusMetDatumAlsGetal[] = new Array<CursusMetDatumAlsGetal>();

        let jaar = 0;
        let maand=0;
        let dag=0;

        for(let i=0;i<inputArray.length;i++){
            // split Startdate string into parts
            let currentDate : string[]= inputArray[i].Startdatum.split("/");

            if(currentDate.length != 3){
                // format van Startdatum klopt niet
            }
            else{
                jaar = +currentDate[2];
                maand = +currentDate[1];
                dag = +currentDate[0];

                let currentDateForOrder : number = (jaar*10000+maand*100+dag);

                // voeg toe aan een array. deze is nog niet gesorteerd, maar heeft wel een startdatum 
                // als getal om op gesorteerd te worden
                intermediateArray.push( new CursusMetDatumAlsGetal(
                    inputArray[i].Naam,
                    inputArray[i].CursusCode, 
                    currentDateForOrder,
                    inputArray[i].Duur)
                );
            }
        }

        //sorteer de array
        intermediateArray.sort((a,b) => a.Startdatum - b.Startdatum);

        //zet het getal weer om naar een string, en voeg toe aan de uiteindelijke array
        let sortedArray: Cursus[] = new Array<Cursus>();
        for (let i=0;i<intermediateArray.length;i++)
        {
            let originalDate = intermediateArray[i].Startdatum.toString();
            let jaar = originalDate.substr(0,4);
            let maand = originalDate.substr(4,2);
            let dag = originalDate.substr(6,2);
            let originalDateString = dag + "/" + maand + "/" + jaar;
            sortedArray.push(new Cursus(
                intermediateArray[i].Naam,
                intermediateArray[i].Cursuscode,
                originalDateString,
                intermediateArray[i].Duur
            ))
        }

        return sortedArray;
  }
}

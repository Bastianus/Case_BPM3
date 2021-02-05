import { Injectable } from '@angular/core';
import { Cursus, CursusMetDatumAlsGetal } from '../Models/Cursus';
import { FoutmeldingenService } from './foutmeldingen.service'

@Injectable({
  providedIn: 'root'
})
export class CursusParserService {

  constructor(private foutmeldingenService: FoutmeldingenService) { }

    parseTextToCursusArray(inputText:string):Array<Cursus> | string[]
    {
        let foutmeldingen : string[] = new Array<string>();
        let output = new Array<Cursus>();

        //iedere cursus in de tekst begint met Titel
        let losseCursussen:string[] = inputText.split("Titel");

        //werken per cursus kanditaat
        for(let i=1;i<losseCursussen.length;i++)
        {        
            let dezeNieuweCursus:Cursus;
            foutmeldingen = this.foutmeldingenService.CheckVoorFouten(losseCursussen, i, foutmeldingen)    ;  

            if(foutmeldingen.length===0)
            {
                dezeNieuweCursus = this.ParseToCursus(losseCursussen[i]);

                foutmeldingen = this.foutmeldingenService.CheckVulling(dezeNieuweCursus, foutmeldingen, i);

                output.push(dezeNieuweCursus);
            }        
        }
  
        if (foutmeldingen.length>0)
        {
            return foutmeldingen;
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
            else
            {
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

    ParseToCursus(cursusstring : string) : Cursus
    {
        let cursus = new Cursus();

        const indexCursusCode = cursusstring.indexOf("Cursuscode");
        const indexDuur = cursusstring.indexOf("Duur");
        const indexStartdatum = cursusstring.indexOf("Startdatum");        

        cursus.Naam = cursusstring.slice(2, indexCursusCode-1);
        cursus.CursusCode = cursusstring.slice(indexCursusCode+12, indexDuur-1);
        cursus.Duur = cursusstring.slice(indexDuur+6, indexStartdatum-1);
        cursus.Startdatum = cursusstring.substr(indexStartdatum+12).trim();

        return cursus
    }
}

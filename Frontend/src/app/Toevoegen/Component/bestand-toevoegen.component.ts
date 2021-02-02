import { Component, OnInit } from '@angular/core';
import { CursusService } from 'src/app/Cursussen/Service/cursus.service';
import { Cursus } from '../Model/Cursus'
import { CursusParserService } from '../Service/cursus-parser.service';

@Component({
  selector: 'app-bestand-toevoegen',
  templateUrl: './bestand-toevoegen.component.html',
  styleUrls: ['./bestand-toevoegen.component.css']
})
export class BestandToevoegenComponent implements OnInit {
  bestand: any;
  bestandCursussen : Cursus[];
  uploadedCursussen : Array<Cursus>;
  foutmeldingen : string[];
  AantalInstantiesUploaded : number;
  AantalCursussenUploaded : number;
  AantalDuplicaten : number;
  erZijnFoutmeldingen : boolean = false;
  erWordtGeupload : boolean = false;
  erWarenDuplicaten : boolean = false;
  constructor(private parserService: CursusParserService,
              private cursusService: CursusService) { }

  ngOnInit(): void {
  }

  bestandGekozen(ruwBestand)
  {
    let fileReader = new FileReader();
    
    this.bestand = ruwBestand.target.files[0];

    this.bestandNakijken(this.bestand, fileReader)

    fileReader.readAsText(this.bestand)
  }

  uploadDocument()
  {
    //resetten van de tabel met de geuploade cursussen
    this.uploadedCursussen = new Array<Cursus>();
    //resetten van de tellers
    this.AantalInstantiesUploaded = 0;
    this.AantalCursussenUploaded = 0;
    //zorgen dat de mellding dat/wat er geupload wordt, zichtbaar is
    this.erWordtGeupload = true;
    //uploaden, respons geeft de hoeveelheden geuploade cursussen en instanties
    let answer = this.cursusService.PushCursussen(this.bestandCursussen)
  }

  bestandNakijken(e: any, fileReader : FileReader)
  {
    let rawBestandCursusArray : Cursus[] = new Array<Cursus>();

    fileReader.onload = () => 
    {
      //Filereader resultaat omzetten zodat het altijd een string is
      let result : string;
      if(  fileReader.result instanceof ArrayBuffer){
        const enc = new TextDecoder();
        result = enc.decode(fileReader.result);
      }
      else{
        result = fileReader.result;
      }
      
      //ingelezen bestand converteren naar cursussen. Als er errors waren, krijk je een string array (de foutmeldingen) i.p.v. een cursus array.
      let parseResult: Cursus[] | string[] = this.parserService.parseTextToCursusArray(result);
      
      //nakijken of het nou een string of cursus array is. Moet per regel, omdat anders typescript nog niet weet wat het is.
      let foutmeldingen : string[] = new Array<string>();

      for(let i=0;i<parseResult.length;i++){
        let current = parseResult[i];

        if(current instanceof Cursus)
        {

          rawBestandCursusArray.push(current);
        }
        else
        {
          foutmeldingen.push(current);
        }
      }

      if(foutmeldingen.length>0)
      {
        this.foutmeldingen = foutmeldingen;
      }  
      else
      {
        this.bestandCursussen = this.parserService.SortCursusArrayByStartDate(rawBestandCursusArray)
      }
    }      
  }
}

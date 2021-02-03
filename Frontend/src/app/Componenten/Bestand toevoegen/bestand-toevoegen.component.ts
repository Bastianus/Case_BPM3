import { Component, OnInit } from '@angular/core';
import { CursusService } from 'src/app/Services/cursus.service';
import { Cursus } from '../../Models/Cursus'
import { CursusParserService } from '../../Services/cursus-parser.service';

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
  AantalDuplicaten : number = 0;
  erZijnFoutmeldingen : boolean = false;
  erZijnGeenFoutmeldingen : boolean = false;
  erIsTenminsteEenTabelGeupload : boolean = false;
  erWordtGeupload : boolean = false;
  erIsGeupload : boolean = false;
  erWarenDuplicaten : boolean = false;

  constructor(private parserService: CursusParserService,
              private cursusService: CursusService) { }

  ngOnInit(): void {
  }
  
  bestandGekozen(ruwBestand)
  {
    this.erIsGeupload = false;
    this.erWordtGeupload = false;

    let fileReader = new FileReader();
    
    this.bestand = ruwBestand.target.files[0];

    this.bestandNakijken(fileReader)

    fileReader.readAsText(this.bestand)
  }

  async uploadDocument()
  {
    let teUploadedenCursussen = this.bestandCursussen;

    this.erZijnFoutmeldingen = false;
    this.erZijnGeenFoutmeldingen = false;
    this.erIsGeupload = false;
    this.erWordtGeupload = true;
    this.erIsTenminsteEenTabelGeupload = false;

    //resetten van de tabellen
    this.uploadedCursussen = new Array<Cursus>();
    this.bestandCursussen = new Array<Cursus>();

    //resetten van de tellers
    this.AantalInstantiesUploaded = 0;
    this.AantalCursussenUploaded = 0;

    //uploaden, respons geeft de hoeveelheden geuploade cursussen en instanties
    let answer = await this.cursusService.PushCursussen(teUploadedenCursussen)

    this.erWordtGeupload = false;
    this.erIsGeupload = true;

    let data = answer[0];
    this.AantalCursussenUploaded = data[1];
    this.AantalInstantiesUploaded = data[0];

    this.AantalDuplicaten = teUploadedenCursussen.length - this.AantalInstantiesUploaded;

    if(this.AantalDuplicaten > 0)
    {
      this.erWarenDuplicaten = true;
    }

    this.uploadedCursussen = answer[1];    
    if(this.uploadedCursussen.length>0)
    {
      this.erIsTenminsteEenTabelGeupload = true;
    }
  }

  bestandNakijken(fileReader : FileReader)
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
        this.erZijnFoutmeldingen = true;
        this.erZijnGeenFoutmeldingen = false;

        this.foutmeldingen = foutmeldingen;
      }  
      else
      {
        this.erZijnFoutmeldingen = false;
        this.erZijnGeenFoutmeldingen = true;

        this.bestandCursussen = this.parserService.SortCursusArrayByStartDate(rawBestandCursusArray)
      }
    }      
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursusService } from 'src/app/Services/cursus.service';
import { WeeknummerService } from '../../Services/weeknummer.service'

@Component({
  selector: 'app-weeknummer',
  templateUrl: './weeknummer.component.html',
  styleUrls: ['./weeknummer.component.css'],
  template: "<ejs-datepicker></ejs-datepicker>"
})
export class WeeknummerComponent implements OnInit {
  public peilWeeknummer: number;
  public peilJaar : number;
  public huidigeCursussen : any;
  public peilDatum: Date = new Date();
  public manualJaar : number;
  public manualWeeknummer : number;
  public jaarMin : number = 1950;
  public jaarMax : number = 2100;
  public weeknummerMin : number = 1;
  public weeknummerMax : number = 53;
  public erZijnInputErrors : boolean = false;
  public InputError : string;


  constructor(private weeknummerService: WeeknummerService,
              private cursusService : CursusService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void 
  {    
    this.peilJaar = this.route.snapshot.params.jaar;   
    this.peilWeeknummer = this.route.snapshot.params.weeknummer;   
  
    this.SetCursussen();
  }

  WeekTerug(): void
  {
    this.peilDatum.setDate(this.peilDatum.getDate()-7);

    this.SetWeeknummerEnJaar();

    this.SetCursussen();  

    this.SetUrl();
  }

  WeekVooruit(): void
  {
    this.peilDatum.setDate(this.peilDatum.getDate()+7);

    this.SetWeeknummerEnJaar();

    this.SetCursussen();

    this.SetUrl();
  }

  DatumGekozen(event: any): void
  {
    let datum = new Date(event.value);

    this.peilDatum = datum;

    this.SetWeeknummerEnJaar();

    this.SetCursussen();

    this.SetUrl();  
  }

  JaarVerandert(event : any) : void
  {
    this.manualJaar = event.target.value;

    this.SetMaxWeeknummer();    
  }

  WeekVerandert(event : any) : void
  {
    this.manualWeeknummer = event.target.value;

    this.ManualSubmit();
  }

  ManualSubmit() : void
  {
    this.erZijnInputErrors = false;
    this.InputError = "";   

    if(this.manualJaar < this.jaarMin) this.InputError = "Jaar moet tenminste " + this.jaarMin +" zijn.";
    if(this.manualJaar > this.jaarMax) this.InputError = "Jaar mag maximaal " + this.jaarMax +" zijn.";

    if(this.InputError.length < 1)
    {
      if(this.manualWeeknummer < this.weeknummerMin) this.InputError = "Weeknummer moet tenminste " + this.weeknummerMin + " zijn.";
      if(this.manualWeeknummer > this.weeknummerMax) this.InputError = "Weeknummer mag maximaal " + this.weeknummerMax + " zijn.";
    }    

    if(this.InputError.length > 0)
    {
      this.erZijnInputErrors = true;
    }
    else
    {    
    this.peilDatum = this.weeknummerService.BepaalDatumByJaarEnWeeknummer(this.manualJaar, this.manualWeeknummer)

    this.SetWeeknummerEnJaar();

    this.SetCursussen();

    this.SetUrl();
    }
  }


  SetUrl() : void
  {
    this.router.navigateByUrl("weeknummer/" + this.peilJaar + "/" + this.peilWeeknummer);
  }

  SetWeeknummerEnJaar(): void
  {    
    this.peilWeeknummer = this.weeknummerService.BepaalWeeknummer(this.peilDatum);
    if(this.peilWeeknummer > 52)
    {
      while(this.peilDatum.getMonth()<10) this.peilDatum.setDate(this.peilDatum.getDate() -1)
    }
    this.peilJaar = this.peilDatum.getFullYear();
    console.log("peilweeknummer: " + this.peilWeeknummer)
    console.log("peiljaar: " + this.peilJaar);
    console.log("peilDatum: " + this.peilDatum)
  }

  async SetCursussen() : Promise<void>
  {
    await this.cursusService.GetCursussenByWeekEnJaar(this.peilJaar, this.peilWeeknummer).subscribe(
      data => 
      {
        this.huidigeCursussen = data;
      })    
  }

  SetMaxWeeknummer() : number
  {
    let maxWeeknummer = this.weeknummerService.BepaalMaxWeeknummerByJaar(this.manualJaar);

    this.weeknummerMax = maxWeeknummer;

    return maxWeeknummer;
  }
}

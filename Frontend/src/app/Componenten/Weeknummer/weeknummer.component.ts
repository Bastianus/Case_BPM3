import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from 'src/app/AppSettings';
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
  }

  WeekVerandert(event:any) : void
  {
    let gevraagdWeeknummer = event.target.value;

    let laatsteDagVanDitJaar = new Date(this.manualJaar, 11,31);
    let maxWeeknummer = this.weeknummerService.BepaalWeeknummer(laatsteDagVanDitJaar);

    if(gevraagdWeeknummer <= maxWeeknummer) this.manualWeeknummer = gevraagdWeeknummer;
    else document.getElementById('commentaar').innerText = "Dit jaar heeft maar " + maxWeeknummer + " weken."
  }

  ManualSelect() : void
  {
    console.log("Jaar: " + this.manualJaar);
    console.log("Weeknummer: " + this.manualWeeknummer);
    this.peilDatum = this.weeknummerService.BepaalDatumByJaarEnWeeknummer(this.manualJaar, this.manualWeeknummer)

    console.log("peildatum: " + this.peilDatum);

    this.SetWeeknummerEnJaar();

    this.SetCursussen();

    this.SetUrl();
  }


  SetUrl() : void
  {
    this.router.navigateByUrl("weeknummer/" + this.peilJaar + "/" + this.peilWeeknummer);
  }

  SetWeeknummerEnJaar(): void
  {    
    this.peilWeeknummer = this.weeknummerService.BepaalWeeknummer(this.peilDatum);
    this.peilJaar = this.peilDatum.getFullYear();
  }

  async SetCursussen() : Promise<void>
  {
    await this.cursusService.GetCursussenByWeekEnJaar(this.peilJaar, this.peilWeeknummer).subscribe(
      data => 
      {
        this.huidigeCursussen = data;
      })    
  }
}

import { Component, OnInit } from '@angular/core';
import { CursusService } from 'src/app/Services/cursus.service';
import { WeeknummerService } from '../../Services/weeknummer.service'

@Component({
  selector: 'app-weeknummer',
  templateUrl: './weeknummer.component.html',
  styleUrls: ['./weeknummer.component.css']
})
export class WeeknummerComponent implements OnInit {
  peilWeeknummer: number;
  peilJaar : number;
  huidigeCursussen : any;
  peilDatum: Date;

  constructor(private weeknummerService: WeeknummerService,
              private cursusService : CursusService) { }

  ngOnInit(): void 
  {
    this.peilDatum = new Date();

    this.SetWeeknummerEnJaar();

    this.SetCursussen();
  }

  WeekTerug(): void
  {
    this.peilDatum.setDate(this.peilDatum.getDate() - 7);

    this.SetWeeknummerEnJaar();

    this.SetCursussen();
  }

  WeekVooruit(): void
  {
    this.peilDatum.setDate(this.peilDatum.getDate() + 7);

    this.SetWeeknummerEnJaar();

    this.SetCursussen();
  }

  SetWeeknummerEnJaar(): void
  {
    this.peilWeeknummer = this.weeknummerService.Weeknummer(this.peilDatum);
    this.peilJaar = this.peilDatum.getFullYear();
  }

  SetCursussen() : void
  {
    this.cursusService.GetCursussenByWeekEnJaar(this.peilJaar, this.peilWeeknummer).subscribe(
      data => 
      {
        this.huidigeCursussen = data;
      }
    )
  }
}

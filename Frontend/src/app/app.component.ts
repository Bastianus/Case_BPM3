import { Component } from '@angular/core';
import { WeeknummerService } from './Services/weeknummer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weeknummer : number;
  jaar : number;
  title = 'Cursussen app';

  constructor(private weeknummerService : WeeknummerService,
    ) { }

  ngOnInit() : void
  {
    let datumVanVandaag = new Date();
    
    this.weeknummer = this.weeknummerService.BepaalWeeknummer(datumVanVandaag);

    this.jaar = datumVanVandaag.getFullYear();
  }

  ngOnChanges() : void
  {
    let datumVanVandaag = new Date();

    this.weeknummer = this.weeknummerService.BepaalWeeknummer(datumVanVandaag);

    this.jaar = datumVanVandaag.getFullYear();
  }
}

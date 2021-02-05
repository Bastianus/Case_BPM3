import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from './AppSettings';
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
              private router : Router) { }

  ngOnInit() : void
  {
    let datumVanVandaag = new Date();
    
    this.weeknummer = this.weeknummerService.BepaalWeeknummer(datumVanVandaag);

    this.jaar = datumVanVandaag.getFullYear();

    this.GoToWeeknummer();
  }

  ngOnChanges() : void
  {
    let datumVanVandaag = new Date();

    this.weeknummer = this.weeknummerService.BepaalWeeknummer(datumVanVandaag);

    this.jaar = datumVanVandaag.getFullYear();

    this.GoToWeeknummer();
  }

  GoToWeeknummer()
  {
    const Url = "/weeknummer/" + this.jaar + "/" + this.weeknummer;
    this.router.navigateByUrl(Url);
  }
}

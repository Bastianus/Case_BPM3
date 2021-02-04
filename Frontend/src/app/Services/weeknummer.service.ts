import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeeknummerService {

  constructor(private http: HttpClient) { }

  GetHuidigeWeeknummer() : number
  {
    let system: any;
    let currentWeekNummer = system.Import('current-week-number');

    let huidigeDatum = new Date();

    let huidigeWeeknummer = currentWeekNummer(huidigeDatum);

    return huidigeWeeknummer;
  }
}

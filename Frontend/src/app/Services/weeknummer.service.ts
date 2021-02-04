import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeeknummerService {

  constructor(private http: HttpClient) { }

  GetHuidigeWeeknummer() : number
  {
    let huidigeDatum = new Date();

    let huidigeWeeknummer = this.Weeknummer(huidigeDatum);

    return huidigeWeeknummer;
  }

  GetHuidigJaar() : number
  {
    let huidigeDatum = new Date();

    return huidigeDatum.getFullYear();
  }

  Weeknummer(datum : Date) : number
  {
    let _datum = new Date(Date.UTC(datum.getFullYear(), datum.getMonth(), datum.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    _datum.setUTCDate(_datum.getUTCDate() + 4 - (_datum.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(_datum.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (_datum.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeeknummerService {

  constructor() { }

  BepaalWeeknummer(datum : Date) : number
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

  BepaalDatumByJaarEnWeeknummer(jaar : number, weeknummer : number) : Date
  {
    const eersteDagVanHetJaar= new Date(jaar,0,1);

    const extraDagen = (weeknummer-1)*7+3;
    const ticksPerDag = 1000*60*60*24;

    return new Date(eersteDagVanHetJaar.getTime() + extraDagen * ticksPerDag);
  }

  BepaalMaxWeeknummerByJaar(jaar : number) : number
  {
    const laatsteDagVanHetJaar = new Date(jaar, 11, 31);

    const weeknummerVanLaatsteDagVanHetJaar = this.BepaalWeeknummer(laatsteDagVanHetJaar);

    const weekVoorLaatsteDagVanHetJaar = new Date(jaar, 11, 24);

    const weeknummerVanWeekVoorLaatsteDagVanHetJaar = this.BepaalWeeknummer(weekVoorLaatsteDagVanHetJaar);

    return Math.max(weeknummerVanLaatsteDagVanHetJaar, weeknummerVanWeekVoorLaatsteDagVanHetJaar);
  }
}

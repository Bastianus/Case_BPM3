export class Cursus
{
    Startdatum: string;
    Naam: string;
    Duur: string;
    CursusCode: string;

    constructor(naam?:string, cursusCode?:string, startDatum? : string , duur? : string, weeknummer? : number){
        this.Naam = naam && naam || "";
        this.CursusCode = cursusCode && cursusCode || "";
        this.Startdatum = startDatum && startDatum || "";
        this.Duur = duur && duur || "";
    }
}

export class CursusMetDatumAlsGetal{
    Cursuscode: string;
    Startdatum: number;
    Naam: string;
    Duur: string;
    constructor(naam?:string, cursusCode?:string, startDatum? : number, duur? : string){
        this.Naam = naam && naam || "";
        this.Cursuscode= cursusCode && cursusCode || "";
        this.Startdatum= startDatum && startDatum || 0;
        this.Duur = duur && duur || "";
    }
}

export class CursusExtended{
    CursusCode: string;
    Startdatum: string;
    Naam: string;
    Duur: string;
    CursusWasOnbekend : boolean;
    InstantieWasOnbekend : boolean;
}
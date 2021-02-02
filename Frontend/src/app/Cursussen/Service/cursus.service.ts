import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cursus, CursusExtended } from '../../Toevoegen/Model/Cursus'
import { AppSettings } from '../../AppSettings'

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  constructor(private http: HttpClient) { }

  Url = AppSettings.CursusApiUrl;

  GetAllCursussen()
  {
    let antwoord = this.http.get(this.Url);
    return antwoord;
  }

  async PushCursussen(cursussen:Array<Cursus>) : Promise<[number[],Cursus[]]> {
    let uniekheid = [0,0];
    let alVerzondenCursussen = new Array<Cursus>();
    let opgeslagenCursussen = new Array<Cursus>();
    
    for(let i=0;i<cursussen.length;i++){
        let IsUnique : Boolean = true;

        for (let j=0;j<alVerzondenCursussen.length;j++){
            if (cursussen[i].CursusCode === cursussen[j].CursusCode
                && cursussen[i].Duur === cursussen[j].Duur
                && cursussen[i].Startdatum === cursussen[j].Startdatum
                && cursussen[i].Naam === cursussen[j].Naam
                ){
                    IsUnique=false;
            }
        }
        
        if(IsUnique){
            let respons = new CursusExtended();
            await this.PushCursus(cursussen[i])
            .then(a => respons=a);
            if(respons)
            {
              if(respons.CursusWasOnbekend)
              {
                uniekheid[1]++;
              } 

              if(respons.InstantieWasOnbekend)
              {
                uniekheid[0]++;
                opgeslagenCursussen.push(respons);
              } 
              else
              {
                alVerzondenCursussen.push(respons);
              }              
            }            
        }        
    }
    return [uniekheid,opgeslagenCursussen];
  }

  PushCursus(cursus:Cursus) : Promise<CursusExtended> 
  {
    cursus = this.TransformVoorVerzenden(cursus);
    console.log(cursus);
    let promise = this.http.post<CursusExtended>(this.Url, cursus).toPromise();
    return promise;
  }

  TransformVoorVerzenden(input: Cursus) : Cursus
  {
    let jaar = input.Startdatum.substr(6,4);
    let maand = input.Startdatum.substr(3,2);
    let dag = input.Startdatum.substr(0,2);
    input.Startdatum = (jaar + "/" + maand + "/" + dag).trim(); 
    input.Duur = input.Duur.trim();
    input.Naam = input.Naam.trim();
    input.CursusCode = input.CursusCode.trim();

    return input;
  }
}

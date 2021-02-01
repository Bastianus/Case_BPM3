import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  constructor(private http: HttpClient) { }

  Url = "https://localhost:44323/CursusInstanties"

  GetAllCursussen()
  {
    let antwoord = this.http.get(this.Url);
    return antwoord;
  }
}

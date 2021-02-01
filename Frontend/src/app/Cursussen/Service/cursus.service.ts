import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  constructor(private http: HttpClient) { }

  Url = "http://localhost:49744/api/Cursus"

  GetAllCursussen()
  {
    let antwoord = this.http.get(this.Url);
    return antwoord;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CursusService} from '../Service/cursus.service';
import {Cursus} from '../Model/Cursus'

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {

  constructor(private cursusService : CursusService) { }
  cursussen: any;
  ngOnInit(): void 
  {
    this.cursusService.GetAllCursussen().subscribe(
      data => 
      {
        this.cursussen=data;
      }
    );
  }

}

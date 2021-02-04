import { Component, OnInit } from '@angular/core';
import { CursusService} from '../../Services/cursus.service';

@Component({
  selector: 'app-cursussen',
  templateUrl: './cursussen.component.html',
  styleUrls: ['./cursussen.component.css']
})
export class CursussenComponent implements OnInit {  

  constructor(private cursusService : CursusService) { }
  cursussen: any;
  geladen : boolean = false;
  aanHetLaden : boolean = false;
  async ngOnInit(): Promise<void> 
  {
    this.aanHetLaden = true;
    this.geladen = false;

    await this.cursusService.GetAllCursussen().subscribe(
      data => 
      {
        this.cursussen=data;
      }
    );

    this.aanHetLaden = false;
    this.geladen = true;
  }

}

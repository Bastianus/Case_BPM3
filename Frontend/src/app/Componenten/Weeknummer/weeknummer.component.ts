import { Component, OnInit } from '@angular/core';
import { WeeknummerService } from '../../Services/weeknummer.service'

@Component({
  selector: 'app-weeknummer',
  templateUrl: './weeknummer.component.html',
  styleUrls: ['./weeknummer.component.css']
})
export class WeeknummerComponent implements OnInit {
  huidigeWeeknummer: number;
  huidigJaar : number;

  constructor(private service: WeeknummerService) { }

  ngOnInit(): void {
    this.huidigeWeeknummer = this.service.GetHuidigeWeeknummer();
    console.log(this.huidigeWeeknummer)
    this.huidigJaar = this.service.GetHuidigJaar();
    console.log(this.huidigJaar)
  }

}

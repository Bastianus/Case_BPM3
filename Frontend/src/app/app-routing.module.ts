import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CursussenComponent} from './Componenten/Alle Cursussen/cursussen.component'
import {BestandToevoegenComponent} from './Componenten/Bestand toevoegen/bestand-toevoegen.component'
import { WeeknummerComponent } from './Componenten/Weeknummer/weeknummer.component';


const routes: Routes = [
  { path: 'cursussen', component: CursussenComponent},
  { path: 'toevoegen', component: BestandToevoegenComponent},
  { path: 'weeknummer', component: WeeknummerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

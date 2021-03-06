import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BestandToevoegenComponent} from './Componenten/Bestand toevoegen/bestand-toevoegen.component'
import { WeeknummerComponent } from './Componenten/Weeknummer/weeknummer.component';


const routes: Routes = [
  { path: 'toevoegen', component: BestandToevoegenComponent},
  { path: 'weeknummer/:jaar/:weeknummer', component: WeeknummerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

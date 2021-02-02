import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CursussenComponent} from './Cursussen/Component/cursussen.component'
import {BestandToevoegenComponent} from './Toevoegen/Component/bestand-toevoegen.component'


const routes: Routes = [
  { path: 'cursussen', component: CursussenComponent},
  { path: 'toevoegen', component: BestandToevoegenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

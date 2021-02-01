import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CursussenComponent} from './Cursussen/Component/cursussen.component'


const routes: Routes = [
  { path: 'cursussen', component: CursussenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

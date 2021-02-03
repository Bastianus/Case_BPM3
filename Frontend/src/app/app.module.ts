import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursussenComponent } from './Componenten/Alle Cursussen/cursussen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursusService } from './Services/cursus.service';
import { HttpClientModule } from '@angular/common/http';
import { BestandToevoegenComponent } from './Componenten/Bestand toevoegen/bestand-toevoegen.component';

@NgModule({
  declarations: [
    AppComponent,
    CursussenComponent,
    BestandToevoegenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CursusService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursusService } from './Services/cursus.service';
import { HttpClientModule } from '@angular/common/http';
import { BestandToevoegenComponent } from './Componenten/Bestand toevoegen/bestand-toevoegen.component';
import { WeeknummerComponent } from './Componenten/Weeknummer/weeknummer.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    AppComponent,
    BestandToevoegenComponent,
    WeeknummerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    DatePickerModule
  ],
  providers: [CursusService],
  bootstrap: [AppComponent]
})
export class AppModule { }

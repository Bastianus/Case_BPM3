import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursussenComponent } from './Cursussen/Component/cursussen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursusService } from './Cursussen/Service/cursus.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CursussenComponent
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

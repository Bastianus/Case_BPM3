import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { WeeknummerComponent} from '../../Componenten/Weeknummer/weeknummer.component'


@NgModule({  
  imports: [ BrowserModule, DatePickerModule ],
  declarations: [WeeknummerComponent],
  bootstrap: [WeeknummerComponent]
})
export class DatepickerModule { }

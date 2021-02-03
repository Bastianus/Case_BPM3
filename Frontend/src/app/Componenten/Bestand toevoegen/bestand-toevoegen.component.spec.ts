import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Cursus } from 'src/app/Models/Cursus';
import { CursusParserService } from 'src/app/Services/cursus-parser.service';
import { CursusService } from 'src/app/Services/cursus.service';
import { FoutmeldingenService } from 'src/app/Services/foutmeldingen.service';
import { BestandToevoegenComponent } from './bestand-toevoegen.component';

describe('BestandToevoegenComponent', () => {
  let component: BestandToevoegenComponent;
  let fixture: ComponentFixture<BestandToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ BestandToevoegenComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestandToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

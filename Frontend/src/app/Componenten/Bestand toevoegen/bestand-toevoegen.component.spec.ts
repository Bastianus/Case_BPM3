import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BestandToevoegenComponent } from './bestand-toevoegen.component';

describe('BestandToevoegenComponent', () => {
  let component: BestandToevoegenComponent;
  let fixture: ComponentFixture<BestandToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FileReader],
      declarations: [ BestandToevoegenComponent ]
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

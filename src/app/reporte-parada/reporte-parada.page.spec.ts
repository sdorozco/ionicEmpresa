import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReporteParadaPage } from './reporte-parada.page';

describe('ReporteParadaPage', () => {
  let component: ReporteParadaPage;
  let fixture: ComponentFixture<ReporteParadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteParadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteParadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

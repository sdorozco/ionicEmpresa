import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioParadaPage } from './formulario-parada.page';

describe('FormularioParadaPage', () => {
  let component: FormularioParadaPage;
  let fixture: ComponentFixture<FormularioParadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioParadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioParadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

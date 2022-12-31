import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDatePage } from './modal-date.page';

describe('ModalDatePage', () => {
  let component: ModalDatePage;
  let fixture: ComponentFixture<ModalDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioParadaPageRoutingModule } from './formulario-parada-routing.module';

import { FormularioParadaPage } from './formulario-parada.page';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioParadaPageRoutingModule,
    PipesModule
  ],
  declarations: [FormularioParadaPage]
})
export class FormularioParadaPageModule {}

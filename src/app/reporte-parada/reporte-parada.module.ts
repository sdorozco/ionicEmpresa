import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteParadaPageRoutingModule } from './reporte-parada-routing.module';

import { ReporteParadaPage } from './reporte-parada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteParadaPageRoutingModule
  ],
  declarations: [ReporteParadaPage]
})
export class ReporteParadaPageModule {}

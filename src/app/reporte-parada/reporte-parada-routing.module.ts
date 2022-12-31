import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteParadaPage } from './reporte-parada.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteParadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteParadaPageRoutingModule {}

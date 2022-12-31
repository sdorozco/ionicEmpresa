import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioParadaPage } from './formulario-parada.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioParadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioParadaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDatePage } from './modal-date.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDatePageRoutingModule {}

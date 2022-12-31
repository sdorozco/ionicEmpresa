import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroUserPipe } from './filtro-user.pipe';


@NgModule({
  declarations: [FiltroPipe, FiltroUserPipe],
  exports: [FiltroPipe,FiltroUserPipe]
})
export class PipesModule { }

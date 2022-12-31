import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/no-login.guard";
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[NoLoginGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'formulario-parada',
    loadChildren: () => import('./formulario-parada/formulario-parada.module').then( m => m.FormularioParadaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'reporte-parada',
    loadChildren: () => import('./reporte-parada/reporte-parada.module').then( m => m.ReporteParadaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-usuario',
    loadChildren: () => import('./edit-usuario/edit-usuario.module').then( m => m.EditUsuarioPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'new-user',
    loadChildren: () => import('./new-user/new-user.module').then( m => m.NewUserPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },  {
    path: 'modal-date',
    loadChildren: () => import('./modal-date/modal-date.module').then( m => m.ModalDatePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

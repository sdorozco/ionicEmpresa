import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShowDialogService {

  constructor(private router:Router) { }
  showSweetInfo(title:string,content:string){
    Swal.fire({
      title: title,
      text: content,
      icon: 'info',
      timer: 2000
    });
  }
  showSweetDeleteSuccess(id){
    Swal.fire({
      title: "Reporte Eliminado Exitosamente",
      text: "El reporte "+id+" fue eliminado",
      icon: 'success',
      timer: 2000
    });
  this.router.navigateByUrl("/formulario-parada")
  }
  showSweetDeleteError(err){
    Swal.fire({
      title: "Error en Reporte",
      text: "Reporte no pudo ser eliminado "+err,
      icon: 'error',
      timer: 2000
    });
    this.router.navigateByUrl("/formulario-parada")
  }
  showSweetDeleteErrorUser(err){
    Swal.fire({
      title: "Error Eliminando Usuario",
      text: "El usuario no pudo ser eliminado "+err,
      icon: 'error',
      timer: 2000
    });
    this.router.navigateByUrl("/formulario-parada")
  }
  showSweetDeleteAddUser(err){
    Swal.fire({
      title: "Error Registrando Usuario",
      text: "El usuario no pudo ser Registrado "+err,
      icon: 'error',
      timer: 2000
    });
    this.router.navigateByUrl("/formulario-parada")
  }
  showSweetDeleteSuccessUser(nombre){
    Swal.fire({
      title: "Usuario Eliminado Exitosamente",
      text: "El Usuario "+nombre+" fue eliminado",
      icon: 'success',
      timer: 2000
    });
  this.router.navigateByUrl("/agregar-usuario")
  }
  showSweetError(err:string){
    if(err == 'Error: The email address is badly formatted.'){
      Swal.fire({
        title: 'Error!',
        text: 'Error, El correo Electrónico tiene un formato incorrecto',
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }else if(err == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.'){
      Swal.fire({
        title: 'Error!',
        text: 'Error, Usuario incorrecto',
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }
    else if(err == 'Error: The password is invalid or the user does not have a password.'){
      Swal.fire({
        title: 'Error!',
        text: 'Error, Contraseña incorrecta',
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }
  }
  showSweetDenie(){
    Swal.fire({
      title: 'Acceso Denegado!',
      text: 'Error, No estas autorizado a entrar a esta sección',
      icon: 'error',
      confirmButtonText: 'Continuar'
    });
  }
  showAddInfor(){
    Swal.fire({
      title: 'Informe Guardado Exitosamente',
      text: 'El informe fue guardado correctamente',
      icon: 'success',

      confirmButtonText: 'Continuar',
    })
  }
  showAddErrorInfor(err){
    Swal.fire({
      title: 'Error',
      text: err,
      icon: 'error',
      confirmButtonText: 'Continuar'
    });
  }
  showEmpty(){
    Swal.fire({
      title: 'Campos sin Seleccionar',
      text: "Todos los campos deben tener una seleccion para poder guardar el informe",
      icon: 'info',
      confirmButtonText: 'Continuar'
    });
  }
  showUpdateSuccess(){
    Swal.fire({
      title: 'Reporte Actualizado Exitosamente',
      icon: 'success',
      confirmButtonText: 'Continuar'
    });
  }
  showUpdateError(){
    Swal.fire({
      title: 'Error',
      text: "Error no se pudo realizar la actualización del reporte",
      icon: 'error',
      confirmButtonText: 'Continuar'
    });
  }

  showSweetUserAdd(){
    Swal.fire({
      title: "Usuario Guardado Exitosamente",
      text: "Se agrego un usuario a la Base de datos",
      icon: 'success',
      timer: 2000
    });
  this.router.navigateByUrl("/agregar-usuario")
  }
  showSweetUserUpdate(){
    Swal.fire({
      title: "Usuario Actualizado Exitosamente",
      text: "Se actualizo el usuario en la Base de datos",
      icon: 'success',
      timer: 2000
    });
  this.router.navigateByUrl("/agregar-usuario")
  }
  showSweetUserBlank(){
    Swal.fire({
      title: "Advertencia",
      text: "Los campos no pueden estar vacios",
      icon: 'warning',
      timer: 2000
    });
  }
  showSweetBlank(){
    Swal.fire({
      title: "Advertencia",
      text: "Los campos no pueden estar vacios",
      icon: 'warning',
      timer: 2000
    });
  }
  showUpdateErrorUser(){
    Swal.fire({
      title: 'Error',
      text: "Error no se pudo realizar la actualización de usuario",
      icon: 'error',
      confirmButtonText: 'Continuar'
    });
  }
 
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { user } from "../share/user";
import { area } from "../share/area";
import { operario } from "../share/operario";
import { estacion } from "../share/estacion";
import { motivo_parada } from "../share/motivo-parada";
import { listParada } from "../share/listParada";
import { usuario,areas,estaciones,operarios,motivos_parada,informesParada,mes,ReportesTransaccional} from '../share/references';
import Swal from 'sweetalert2'
import { Router } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { Storage } from "@ionic/storage-angular";
import { ShowDialogService } from "../servicios/show-dialog.service";
import { meses } from '../share/meses';
import { DataDateService } from "../servicios/data-date.service";

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  datos : any = []
  
  constructor(private db: AngularFirestore,private router: Router,
    public auth:AuthGuard,private storage:Storage,private sweet:ShowDialogService,private dataf: DataDateService) {  }
  
  getUser(){
    return this.db.collection(usuario).snapshotChanges().pipe(map(usuarios =>{
      return usuarios.map(us =>{
        const data = us.payload.doc.data() as user
        data.id = us.payload.doc.id
        return data;
      })
    }))
  }
  getUserId(id){
    return this.db.collection(usuario).doc(id).snapshotChanges().pipe(map(usuarios =>{  
        return usuarios.payload.id;
    }))
  }
  getUserforId(id){

    return this.db.collection(usuario).doc(id).snapshotChanges().pipe(map(usuarios =>{  
      
        const data = usuarios.payload.data() as user
        data.id = usuarios.payload.id
        return data;
    }))
  }
  getID(){
   return this.storage.get("id").then(res =>{
      return res
    })
  }
  getArea(){
    return this.db.collection(areas).snapshotChanges().pipe(map(areas =>{
      return areas.map(ar=>{
        const data = ar.payload.doc.data() as area
        data.id = ar.payload.doc.id
        return data;
      })
    }))
  }
  getMeses(){
    return this.db.collection(mes).snapshotChanges().pipe(map(mes =>{
      return mes.map(ar=>{
        const data = ar.payload.doc.data() as meses
        data.id = ar.payload.doc.id
        return data;
      })
    }))
  }
  getEstacion(){
    return this.db.collection(estaciones).snapshotChanges().pipe(map(estacion =>{
      return estacion.map(es=>{
        const data = es.payload.doc.data() as estacion
        data.id = es.payload.doc.id
        return data;
      })
    }))
  }
  getOperario(){
    return this.db.collection(operarios).snapshotChanges().pipe(map(operario =>{
      return operario.map(es=>{
        const data = es.payload.doc.data() as operario
        data.id = es.payload.doc.id
        return data;
      })
    }))
  }
  getMotivo_parada(){
    return this.db.collection(motivos_parada).snapshotChanges().pipe(map(motivo =>{
      return motivo.map(es=>{
        const data = es.payload.doc.data() as motivo_parada
        data.id = es.payload.doc.id
        return data;
      })
    }))
  }
  ValidateUser(usuarios,password){
    const rou = this.router
    const storage = this.storage
    return this.db.collection(usuario).ref.where("usuario","==",usuarios).get().then(function(query){
       if(query.empty){
        Swal.fire({
          title: 'Acceso Denegado!',
          text: 'Error, Usuario o Contraseña incorrecta',
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
       }
     return query.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data() as user
        if(data.password == password){
          storage.set("id",doc.id)
          rou.navigateByUrl("/home")
          return true
        }else{
          Swal.fire({
            title: 'Acceso Denegado!',
            text: 'Error, Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'Continuar'
          });
          return false
        }
    });
    }).catch(err =>{
      console.log(err)
      Swal.fire({
        title: 'Acceso Denegado!',
        text: 'Error, Usuario incorrecto',
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    })
  }
  getInformes(id){
      return this.db.collection(informesParada).doc(id).collection(id).snapshotChanges().pipe(map(res=>{
        return res.map(info=>{
          const data = info.payload.doc.data() as listParada
          data.id = info.payload.doc.id
          return data
        })
      }))
  }
  getInformesWhere(id,date,dato){
    return this.db.collection(informesParada).doc(id).collection(id).ref.where("fecha","==",date).get()
}
guardarDatos(id_user,id,fecha,hora,area,estacion,operario,motivo,estado,fecha_reinicio,hora_reinicio,descripcion,time){
  if(time == undefined || time == null){
    this.db.collection(ReportesTransaccional).doc(id_user).collection(id_user).doc(id).set({
      id: id,
      area: area,
      estacion: estacion,
      fecha: fecha,
      hora: hora,
      motivo: motivo,
      operario: operario,
      time: "",
      estado: estado,
      fecha_reinicio: fecha_reinicio,
      hora_reinicio: hora_reinicio,
      descripcion: descripcion
    })
  }else{
    this.db.collection(ReportesTransaccional).doc(id_user).collection(id_user).doc(id).set({
      id: id,
      area: area,
      estacion: estacion,
      fecha: fecha,
      hora: hora,
      motivo: motivo,
      operario: operario,
      estado: estado,
      time: time,
      fecha_reinicio: fecha_reinicio,
      hora_reinicio: hora_reinicio,
      descripcion: descripcion
    })
  }
}
getReportesTransaccional<tipo>(id){
  return this.db.collection<tipo>(ReportesTransaccional).doc(id).collection<tipo>(id).valueChanges()
}
deleteReportTransaccional(id,id_report){
  console.log(id)
  this.db.collection(ReportesTransaccional).doc(id).collection(id).doc(id_report).delete()
}
  async storageCreate() {
    await this.storage.create();
}
  getReporteParada(id,coleccion){
    return this.db.collection(informesParada).doc(id).collection(id).doc(coleccion).snapshotChanges().pipe(map(res=>{
      const data = res.payload.data() as listParada
      data.id = res.payload.id
      return data
    }))
  }

  addFormularioParada(id,fecha,hora,area,estacion,operario,motivo,estado){
    this.db.collection(informesParada).doc(id).collection(id).doc(fecha+":"+hora).set({
      id: fecha+":"+hora,
      area: area,
      estacion: estacion,
      fecha: fecha,
      hora: hora,
      motivo: motivo,
      operario: operario,
      estado: estado,
      fecha_reinicio: "",
      hora_reinicio: "",
      descripcion: ""
    }).then(res=>{
      this.sweet.showAddInfor()
      this.router.navigateByUrl("/formulario-parada")
    }).catch(err=>{
      this.sweet.showAddErrorInfor(err)
    })
  }
  updateInforme(id,lista,area,estacion,fecha,hora,motivo,operario,estado,fecha_reinicio,hora_reinicio,descripcion,time){
    this.db.collection(informesParada).doc(id).collection(id).doc(lista).update({
      area: area,
      estacion : estacion,
      fecha: fecha,
      hora : hora,
      operario : operario,
      motivo : motivo,
      estado: estado,
      fecha_reinicio: fecha_reinicio,
      hora_reinicio: hora_reinicio,
      descripcion: descripcion,
      time:time
    }).then(res=>{
      this.sweet.showUpdateSuccess()
      this.router.navigateByUrl("/formulario-parada")
    }).catch(err=>{
      this.sweet.showUpdateError()
    })
  }
  deleteReporte(id,user){
    this.db.collection(informesParada).doc(id).collection(id).doc(user).delete().then(res=>{
      this.sweet.showSweetDeleteSuccess(user)
    }).catch(err=>{
      this.sweet.showSweetDeleteError(err)
      this.router.navigateByUrl("/reporte-parada")
    })
  }
  addUser(user,pass){
    this.db.collection(usuario).add({
      usuario: user,
      password: pass
    }).then(resp=>{
      this.sweet.showSweetUserAdd()
    }).catch(err=>{
      this.sweet.showSweetDeleteAddUser(err)
    })
  }
  deleteUser(id,nombre){
    this.db.collection(usuario).doc(id).delete().then(res=>{
      this.sweet.showSweetDeleteSuccessUser(nombre)
    }).catch(err=>{
      this.sweet.showSweetDeleteErrorUser(err)
    })  
  }
  updateUser(id,user,password){
    this.db.collection(usuario).doc(id).update({
      usuario: user,
      password: password
    }).then(res=>{
      this.sweet.showSweetUserUpdate()
    }).catch(err=>{
      this.sweet.showUpdateErrorUser()
    })
  }
  filterGeneral(id){
    return this.db.collection(informesParada).doc(id).collection(id).snapshotChanges().pipe(map(res=>{
      return res.map(info=>{
        const data = info.payload.doc.data() as listParada
        data.id = info.payload.doc.id
        return data
      })
    }))
  }
}

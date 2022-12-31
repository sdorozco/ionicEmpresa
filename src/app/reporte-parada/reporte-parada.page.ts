import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage-angular";
import { DatabaseService } from "../servicios/database.service";
import { GeneratePDFService } from "../servicios/generate-pdf.service";
import { DataService } from "../servicios/data.service";
import { EstadoC } from "../share/references";
import { ShowDialogService } from "../servicios/show-dialog.service";
import Swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-reporte-parada',
  templateUrl: './reporte-parada.page.html',
  styleUrls: ['./reporte-parada.page.scss'],
})
export class ReporteParadaPage implements OnInit {
  today:string = new Date().toISOString()
  fecha_reinicio:string = this.today
  date:string = this.today.substring(0,10)
  datecito : string = ""
  estado:string = ""
  areas:string =  ""
  estaciones:string = ""
  operarios:string = ""
  motivos:string = ""
  id : string = ""
  user : string = ""
  lista : string = ""
  fecha : string = ""
  hora : string = ""
  hora_reinicio : string = ""
  descripcion : string = ""
  resultado_hora : any = ""
  resultado_minutos : any = ""
  time : string = ""
  constructor(public storage: Storage, public database: DatabaseService,public pdf: GeneratePDFService,private data: DataService,
  private sweet : ShowDialogService) { }

  public listado : any = [];
  public areaDatabase : any = [];
  public estacionDatabase : any = [];
  public operarioDatabase : any = [];
  public motivoDatabase : any = [];
  public excel : any 
  ngOnInit() {
    this.storage.get("id").then(resp=>{
      this.user = resp
      this.storage.get("list").then(res=>{
        this.lista = res
        this.database.getReporteParada(resp,res).subscribe(rest=>{
         this.listado = rest
         this.id = rest.id
         this.areas = rest.area
         this.motivos = rest.motivo
         this.estaciones = rest.estacion
         this.operarios = rest.operario
         this.hora = rest.hora
         this.fecha = rest.fecha
         this.estado = rest.estado
         this.datecito = rest.fecha_reinicio
         this.hora_reinicio = rest.hora_reinicio
         this.descripcion = rest.descripcion
         this.time = rest.time
         if(this.hora_reinicio.substring(11,16) === ""){
          this.resultado_hora = parseInt(this.hora_reinicio) - parseInt(this.hora)
          this.resultado_minutos = parseInt(this.hora_reinicio.substring(3)) - parseInt(this.hora.substring(3))
         }else{
          this.resultado_hora = parseInt(this.hora_reinicio.substring(11,16)) - parseInt(this.hora)
          this.resultado_minutos = parseInt(this.hora_reinicio.substring(11,16)) - parseInt(this.hora.substring(3))
         }
        })
      })
    })
    this.database.getArea().subscribe(area=>{
      this.areaDatabase = area;
    })
    this.database.getEstacion().subscribe(estacion=>{
      this.estacionDatabase = estacion;
    })
    this.database.getOperario().subscribe(operario=>{
      this.operarioDatabase = operario;
    })
    this.database.getMotivo_parada().subscribe(motivo=>{
      this.motivoDatabase = motivo
    })
  }
  
  updateReporte(){
    if(this.areas == "" || this.estaciones == "" || this.fecha == "" || this.hora == "" || this.motivos == "" || 
    this.operarios == "" || this.datecito == "" || this.hora_reinicio == "" || this.descripcion == ""){
      this.sweet.showSweetBlank()
    }else{
      if(this.hora_reinicio.substring(11,16) === ""){
        this.time = this.daydiff(this.parseDate(this.fecha),this.parseDate(moment(this.datecito).format("YYYY-MM-DD")))+":"+this.resultado_hora+":"+this.resultado_minutos
        this.database.updateInforme(this.user,this.lista,this.areas,this.estaciones,this.fecha,this.hora,
          this.motivos,this.operarios,EstadoC,moment(this.datecito).format("YYYY-MM-D"),this.hora_reinicio,this.descripcion,this.time)
      }else{
        this.time = this.daydiff(this.parseDate(this.fecha),this.parseDate(this.datecito))+":"+this.resultado_hora+":"+this.resultado_minutos
        this.database.updateInforme(this.user,this.lista,this.areas,this.estaciones,this.fecha,this.hora,
          this.motivos,this.operarios,EstadoC,moment(this.datecito).format("YYYY-MM-D"),this.hora_reinicio.substring(11,16),this.descripcion,this.time)
      }
    }
  }
  generatePdf(){
    if(this.datecito != "" || this.descripcion != "" || this.hora_reinicio != ""){
   this.pdf.PDFgenerator(this.areas,this.estaciones,this.fecha,this.hora,
      this.motivos,this.operarios,this.resultado_hora,this.resultado_minutos,this.daydiff(this.parseDate(this.fecha),this.parseDate(this.datecito)))
   }else{
     this.sweet.showSweetUserBlank()
   }
  }
  generarExcel(){
    if(this.datecito != "" || this.descripcion != "" || this.hora_reinicio != ""){
    if(this.hora_reinicio.substring(11,16) === ""){
      this.data.exportToExcel(this.areas,this.estaciones,this.fecha,this.hora,
        this.motivos,this.operarios,this.datecito,this.hora_reinicio,this.estado,this.resultado_hora,this.resultado_minutos,this.descripcion,this.excel,"Reporte Excel "+this.fecha,this.daydiff(this.parseDate(this.fecha),this.parseDate(this.datecito)))
    }else{
      this.data.exportToExcel(this.areas,this.estaciones,this.fecha,this.hora,
        this.motivos,this.operarios,this.datecito,this.hora_reinicio.substring(11,16),this.estado,this.resultado_hora,this.resultado_minutos,this.descripcion,this.excel,"Reporte Excel "+this.fecha,this.daydiff(this.parseDate(this.fecha),this.parseDate(this.datecito)))
    }
  }else{
    this.sweet.showSweetUserBlank()
  }
  }
  deleteReport(){
    Swal.fire({
      title: 'Eliminar Reporte',
      text: "Estas Seguro de que deseas eliminar el reporte?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: "NO"
    }).then((result) => {
      if (result.isConfirmed) {
      this.database.deleteReporte(this.user,this.id)
      }
    });
  }
  parseDate(str: string): Date {
    let mdy: String[] = str.split('-');
    return new Date(Number(mdy[0]), Number(mdy[1]) - 1, Number(mdy[2]));
  }

  daydiff(first, second): Number {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
}

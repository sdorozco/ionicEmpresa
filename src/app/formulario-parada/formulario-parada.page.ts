import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../servicios/database.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { ModalController } from '@ionic/angular';
import { ModalPage } from "../modal/modal.page";
import { ModalDatePage } from '../modal-date/modal-date.page';
import { listParada } from "../share/listParada";
import { ExcelReportService } from "../servicios/excel-report.service";
import { DataDateService } from '../servicios/data-date.service';

@Component({
  selector: 'app-formulario-parada',
  templateUrl: './formulario-parada.page.html',
  styleUrls: ['./formulario-parada.page.scss'],
})
export class FormularioParadaPage implements OnInit {
  public userDatabase : any = [];
  public list : any = []
  id:string = ""
  buscar = '';
  IDlist:string = ""
  public listFilter :any = []
  report: any = []
  report2: any = []
  reportes : any[] = []
  constructor(public router:Router, 
    public database: DatabaseService,
    private storage:Storage,
    private modal: ModalController,
    public excelR : ExcelReportService,
    private pdfExport : DataDateService) {}
  
  ngOnInit(){
    this.database.getID().then(id =>{
      this.database.getUserId(id).subscribe(user=>{
        this.id = user
        console.log(user)
        this.database.getInformes(this.id).subscribe(res=>{
          this.list = res
        })
        })
      })
     

  }
  listId(id){
    this.storage.remove("list")
    this.storage.set("list",id)
    this.router.navigateByUrl("/reporte-parada")
  }
  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    this.buscar = searchTerm;
  }
  async filtros(){
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps:{
        id:this.id
      }
    });
    await modal.present()

    const {data} = await modal.onDidDismiss()
    if(data === undefined || data === null){
      console.log("llego vacio")
    }else{
   console.log(data['mes'])
   this.buscar = data['mes']
    }
  }
  async dateFilter(){
    const modal = await this.modal.create({
      component: ModalDatePage,
      componentProps:{
        id:this.id
      }
    });
    await modal.present()

    const {data} = await modal.onDidDismiss()
    if(data === undefined || data === null){
      console.log("llego vacio")
    }else{
   this.excel(data['fecha_inicial'],data['fecha_final'])

   this.getReporte(data['fecha_inicial'],data['fecha_final'])
    }
  }
  public excel(fecha_inicial,fecha_final){
  var fecha = this.parseDate(fecha_inicial).toISOString().substring(0,7)
   const day = parseInt(this.parseDate(fecha_inicial).toISOString().substring(8,10))
   for (let listParad of this.list) {
    const date = listParad as listParada
    const limite = this.daydiff(this.parseDate(fecha_inicial),this.parseDate(fecha_final))
    for (let i = 0; i <= limite; i++) {
      
      this.report[i] = fecha+"-"+(day+i)
      if(date.fecha == this.parseDate(this.report[i]).toISOString().substring(0,10)){
       this.database.getInformesWhere(this.id, this.parseDate(this.report[i]).toISOString().substring(0,10),date.id).then(res=>{
          if(res.empty) {
            console.log("llego vacio");
          } else {
            res.forEach(doc=>{
              const data = doc.data() as listParada;
              data.id = doc.ref.id;
              if(date.id == data.id) {
                this.database.guardarDatos(this.id,data.id,data.fecha,data.hora,data.area,data.estacion,data.operario,
                  data.motivo,data.estado,data.fecha_reinicio,data.hora_reinicio,data.descripcion,data.time)
              }
            })
          }
        })
      }
    }
  }
  }
  getReporte(fecha_inicial,fecha_final) {
    this.database.getReportesTransaccional<listParada>(this.id).subscribe(res=>{
      this.pdfExport.PDFgeneratorReport(res)
      this.excelR.exportToExcel(res,"Reporte "+fecha_inicial+" - "+fecha_final,this.database,this.id)
     })
     
  }
  public parseDate(str: string): Date {
    let mdy: String[] = str.split('-');
    return new Date(Number(mdy[0]), Number(mdy[1]) - 1, Number(mdy[2]));
  }

  public daydiff(first, second): Number {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
}


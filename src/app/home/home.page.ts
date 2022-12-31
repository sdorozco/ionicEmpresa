import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../servicios/database.service";
import { ShowDialogService } from "../servicios/show-dialog.service";
import * as moment from "moment";
import { EstadoP} from "../share/references";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  today:string = new Date().toISOString()
  id:string = ""
  fecha :string = this.today.substring(0,10)
  date:string = this.today.substring(0,10)
  fechita : string =  this.today
  areas:string =  ""
  estaciones:string = ""
  operarios:string = ""
  motivos:string = ""
  hora:string = moment(this.today).format("HH:mm");
  constructor(private database: DatabaseService,private sweet:ShowDialogService) { }
  public areaDatabase : any = [];
  public estacionDatabase : any = [];
  public operarioDatabase : any = [];
  public motivoDatabase : any = [];

  ngOnInit() { 
    this.database.getID().then(id =>{
      this.database.getUserId(id).subscribe(user=>{
        this.id = user
        console.log(user)
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
  ngOnDestroy(){
    this.id = ""
    this.fecha  = ""
    this.date = ""
    this.fechita =  ""
    this.areas =  ""
    this.estaciones = ""
    this.operarios = ""
    this.motivos = ""
  }
  saveDataParada(){
    if(this.areas == "" || this.estaciones == "" || this.operarios == "" || this.motivos == ""){
      this.sweet.showEmpty()
    }else{
      this.database.addFormularioParada(this.id,this.fechita.substring(0,10),this.hora,this.areas,this.estaciones,this.operarios,this.motivos,EstadoP)
    }
  }
}

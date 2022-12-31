import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from "../servicios/database.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id
  today:string = new Date().toISOString()
  date:string = this.today.substring(0,10)
  date_inicial:string = this.today
  date_final:string = this.today
  mes : string = ""
  public mesesDatabase : any = [];
  constructor(private modal: ModalController,private database: DatabaseService) { }

  ngOnInit() {
    console.log(this.id)
    this.database.getMeses().subscribe(mes=>{
      this.mesesDatabase = mes;
    })
  }
  FiltrarModal(){
    this.modal.dismiss({
      fecha_inicial: this.date_inicial.substring(0,10),
      fecha_final: this.date_final.substring(0,10),
      mes: this.mes
    })
  }
  cerrarModal(){
    this.modal.dismiss()
  }
}



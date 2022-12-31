import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-date',
  templateUrl: './modal-date.page.html',
  styleUrls: ['./modal-date.page.scss'],
})
export class ModalDatePage implements OnInit {
  today:string = new Date().toISOString()
  fecha:string = this.today
  date : string = this.today.substring(0,10)
  date_inicial:string = this.today.substring(0,10)
  date_final:string = this.today.substring(0,10)

  constructor(private modal : ModalController) { }

  ngOnInit() {
  }
  dateModal(){
    this.modal.dismiss({
      fecha_inicial: this.date_inicial.substring(0,10),
      fecha_final: this.date_final.substring(0,10),
    })
  }
  cerrarModal(){
    this.modal.dismiss()
  }

}

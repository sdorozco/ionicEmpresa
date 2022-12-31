import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage-angular";
import { DatabaseService } from "../servicios/database.service";
import { ShowDialogService } from "../servicios/show-dialog.service";
@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.page.html',
  styleUrls: ['./edit-usuario.page.scss'],
})
export class EditUsuarioPage implements OnInit {
  usuario:string = ""
  password:string =  ""
  id:string =  ""
  pass:string = ""
  constructor(private storage: Storage, private database: DatabaseService, private sweet: ShowDialogService) { }
  public userDatabase : any = [];
  ngOnInit() {
    this.storage.get("list_user").then(res=>{
      this.database.getUserforId(res).subscribe(resp=>{
        this.usuario = resp.usuario
        this.password = resp.password
        this.id = resp.id
      })
    }).catch(err=>{

    })
  }
  guardar(){
    if(this.pass == "" || this.usuario == ""){
      this.sweet.showSweetUserBlank()
    }else{
        this.database.updateUser(this.id,this.usuario,this.pass)
    }
  }

}

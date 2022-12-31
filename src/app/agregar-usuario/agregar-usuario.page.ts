import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../servicios/database.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  public userDatabase : any = [];
  public list : any = []
  id:string = ""
  buscar = '';
  IDlist:string
  constructor(public router:Router, 
    public database: DatabaseService,
    private storage:Storage,private db:AngularFirestore) {}

  ngOnInit() {
    this.database.getUser().subscribe(res=>{
      this.list = res
    })
  }
  listId(id){
    this.storage.remove("list_user")
    this.storage.set("list_user",id)
    this.router.navigateByUrl("/edit-usuario")
  }
  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
    this.buscar = searchTerm;
  }
  deleteUser(id,user){
    this.database.deleteUser(id,user)
  }
}

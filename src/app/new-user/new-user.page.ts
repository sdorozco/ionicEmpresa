import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../servicios/database.service";
import { ShowDialogService } from "../servicios/show-dialog.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  usuario:string = ""
  pass:string = ""
  constructor(private database : DatabaseService, private sweet : ShowDialogService) { }
  
  ngOnInit() {
    
  }
  guardar(){
    if(this.usuario == "" || this.pass == ""){
      this.sweet.showSweetUserBlank()
    }else
    this.database.addUser(this.usuario,this.pass)
  }

}

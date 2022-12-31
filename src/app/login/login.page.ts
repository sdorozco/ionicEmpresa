import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ShowDialogService } from "../servicios/show-dialog.service";
import { DatabaseService } from "../servicios/database.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:string;
  password:string;
  public user:any
  public bduser: any = []
  constructor(private database: DatabaseService, 
     public router: Router,
     private sweet: ShowDialogService,) { }

  ngOnInit(){
    
  }
  onLogin(){
    if(this.usuario == null || this.password == null || this.usuario == "" || this.password == "") {
      this.sweet.showSweetInfo("Campos Vacios","Los campos no deben quedar vacios");
    }else{
      this.database.ValidateUser(this.usuario,this.password).then(res=>{
      })
    }
  }
}

import { Component } from '@angular/core';
import { Platform, MenuController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from "./servicios/auth.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { DatabaseService } from './servicios/database.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private route: Router,
    private menu: MenuController,
    private storage:Storage,
    private database:DatabaseService
  ) {
    this.initializeApp();
    
  }
  
  username:string
  id:string
  initializeApp() {
    this.database.storageCreate()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
    this.database.getID().then(id =>{
      this.database.getUserId(id).subscribe(user=>{
        this.id = user
        console.log(user)
        this.database.getUserforId(this.id).subscribe(useri=>{
          this.username = useri.usuario
          console.log(useri.usuario)
        })
      })
    })
  }
  logout(){
    this.auth.logout();
    this.menu.close()
    this.storage.clear()
    this.storage.remove("id").then(res=>{
      console.log("borrado")
    })
    this.route.navigateByUrl("/login");
  }
  navigateInforme(){
    this.menu.close()
    this.route.navigateByUrl("/formulario-parada");
  }

  navigateFormularioInicio(){
this.menu.close()
this.route.navigateByUrl("/formulario-inicio");

  }
  agregarUsuario(){
    this.menu.close()
    this.route.navigateByUrl("/agregar-usuario");
  }

  inicio(){
    this.menu.close()
    this.route.navigateByUrl("/home");
  }
  
 
}

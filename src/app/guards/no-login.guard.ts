import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage-angular";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class NoLoginGuard implements CanActivate {
  constructor(private auth:AngularFireAuth, private router: Router,private storage: Storage){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.storage.get("id").then(res=>{
    if(res == null){
      return true
    }else{
      this.router.navigate(["/home"])
      return false
    }
  })
 }
}

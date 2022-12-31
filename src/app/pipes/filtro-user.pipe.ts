import { Pipe, PipeTransform } from '@angular/core';
import { user } from "../share/user";

@Pipe({
  name: 'filtroUser'
})
export class FiltroUserPipe implements PipeTransform {

  transform(lista: user[], texto: string ): user[] {
    
    if(texto.length === 0){
      return lista;
    }

    texto = texto.toLocaleLowerCase();

    return lista.filter(list =>{
      return list.usuario.includes(texto);
    });
  }

}

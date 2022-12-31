import { Pipe, PipeTransform } from '@angular/core';
import { listParada } from "../share/listParada";
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: listParada[], texto: string ): listParada[] {
    
    if(texto.length === 0){
      return lista;
    }

    texto = texto.toLocaleLowerCase();

    return lista.filter(list =>{
      return list.estado.toLocaleLowerCase().includes(texto) || list.fecha.includes(texto)
    });
  }
}

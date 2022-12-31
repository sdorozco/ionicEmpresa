import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async exportToExcel (areas,estaciones,fecha,hora,motivos,operarios,fecha_reinicio,
    hora_Reinicio,estado,horas,minutos,descripcion,excel,reporte,dias) {
    {
     excel = [{
      Fecha: fecha,
      Hora: hora,
      Area: areas,
      Estacion: estaciones,
      Operario: operarios,
      Motivo: motivos,
      Fecha_Reinicio: fecha_reinicio,
      Hora_Reinicio: hora_Reinicio,
      Estado: estado,
      Tiempo: dias+":"+horas+":"+minutos,
      Descripcion: descripcion
    }];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet (wb, ws, reporte);
    XLSX.writeFile (wb, reporte + '.xlsx');
      }
    }
  }
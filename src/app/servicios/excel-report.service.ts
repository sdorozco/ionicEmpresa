import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { listParada } from '../share/listParada';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {

  constructor() { }

async exportToExcel (datos : listParada[],reporte,database : DatabaseService,id) {
  datos.map(res=>{
    database.deleteReportTransaccional(id,res.id)
  })
    {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet (wb, ws, reporte);
    XLSX.writeFile (wb, reporte + '.xlsx');
      }
    }
  }

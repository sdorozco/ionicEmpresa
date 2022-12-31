import { Injectable } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { listParada } from '../share/listParada';

@Injectable({
  providedIn: 'root'
})
export class DataDateService {

  constructor() { }
  html:string
  PDFgeneratorReport(datos : listParada[]){
    
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    this.html = 'El siguiente reporte de parada corresponde a la fecha: ' 
var docDefinition = {
content: [
{
columns: [
[
{ text: "Reporte ", style: 'header' }, 
{ text: ' '},
{text: ''+this.html, style: 'contenido'},
{text: ' '},{text:' '},
{text: 'Detalles del Reporte.'},{text:' '}
]
],
},
{
  layout: 'lightHorizontalLines', // optional
  table: {
    // headers are automatically repeated if the table spans over multiple pages
    // you can declare how many rows should be treated as headers
    headerRows: 2,
    widths: [ '*', 'auto', 100, '*' ],
    
    style: 'bodyStyle',
    body: [
      [ 'AREA', 'ESTACIÓN', 'OPERARIO', 'MOTIVO'],
      
      [datos.map(m=>{
        return m.area
      }), datos.map(m=>{
        return m.estacion
      }), datos.map(m=>{
        return m.operario
      }),datos.map(m=>{
        return m.motivo
      })]
    ]
  }
}
],
styles: {
contenido:{
margin: 1
},
header: {
bold: true,
fontSize: 20,
alignment: 'center'
},
sub_header: {
fontSize: 18,
alignment: 'left'
},

},
pageSize: 'A4',
pageOrientation: 'portrait'
};
pdfmake.createPdf(docDefinition).download("prueba")
}
 
}

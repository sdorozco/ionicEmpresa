import { Injectable } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root'
})
export class GeneratePDFService {
  html:string
  constructor() { }

  PDFgenerator(area,estacion,fecha,hora,motivo,operario,horas,minutos,dias){
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    this.html = 'El siguiente reporte de parada corresponde a la fecha: '+fecha+
    ' y hora: '+hora+' en donde se presento el motivo '+motivo+' en el área '+area+' y estación '+estacion+
    ' donde el operario '+operario+' estaba realizando su labor, y pudo continuar su labor tras '+dias+' días, '+horas+' horas y '+minutos+' minutos.' 
var docDefinition = {
content: [
{
columns: [
[
{ text: "Reporte "+fecha+" : "+hora, style: 'header' }, 
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
    headerRows: 1,
    widths: [ '*', 'auto', 100, '*' ],

    body: [
      [ 'AREA', 'ESTACIÓN', 'OPERARIO', 'MOTIVO'],
      [ area, estacion, operario, motivo ]
    ]
  }
}

],
styles: {
contenido:{
margin: 5
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
pdfmake.createPdf(docDefinition).download(fecha+" "+hora)
 }
}

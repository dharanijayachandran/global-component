import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }


  generatePDF(pdfObject, pdfSearchFilterFields) {

    let head = [pdfObject.tableHeaderNames];

    let pdfTableBodyData = pdfObject.tableBodyData;

    // Create Object for PDF

    var doc = new jsPDF('l', 'mm', "a1");

    doc.setFontSize(20);
    doc.text(pdfObject.title, 15, 10);

    /* 
    ========================================================
    Search filter fields  - Starts here
    ========================================================
  */

    if (pdfSearchFilterFields.searchFilterKeysValues.length) {
      doc.setFontSize(16);
      doc.text(pdfSearchFilterFields.searchCriteriaText, 15, 24);

      let pdfSearchFilterFieldsData = pdfSearchFilterFields.searchFilterKeysValues;

      (doc as any).autoTable({
        body: pdfSearchFilterFieldsData,
        theme: 'plain',
        head: null,
        styles: {
          cellWidth: 100,
        },
        bodyStyles: {
          fontSize: 12,
        },
        headStyles: {
          fontSize: 12
        },
        startY: 25,
        didParseCell: data => {
          if (data.column.index === 0) {
            data.cell.styles.fontStyle = "bold"
          } else {
            data.cell.minWidth = 200;
            data.cell.cellWidth = 200;
          }
        }
      });
    }


    /* 
    ========================================================
    Search filter fields  - ends here
    ========================================================
  */

    /* 
    ========================================================
      Add table body data and display in PDF - Starts here 
      ========================================================
  */

    (doc as any).autoTable({
      headStyles: {
        cellWidth: 'auto',
        overflow: 'visible',
        lineWidth: 1,
        lineColor: ['F0EEEE'],
        fontSize: 12
      },
      head: head,
      body: pdfTableBodyData,
      bodyStyles: { fontSize: 12 },
      theme: 'grid',
      didParseCell: function (cell, data) {
        if (cell.section === 'head') {
          cell.cell.styles.fillColor = "#f2f3f4";
          cell.cell.styles.textColor = "#000000"
        }
      },
    })


    /* 
     ========================================================
       Add table body data and display in PDF -  Ends here
       ========================================================
    */


    doc.setFontSize(12);
    let finalY = (doc as any).lastAutoTable.finalY + 15; // The y position on the page
    doc.text("Disclaimer: This is system generated report.", 15, finalY)


    /* 
  ========================================================
    Generate PDF File with given name - Starts here
    ========================================================
  */
    doc.save(pdfObject.fileName);
    // doc.output('dataurlnewwindow'); 

    /* 
========================================================
Generate PDF File with given name - Ends here
========================================================
*/

  }



}

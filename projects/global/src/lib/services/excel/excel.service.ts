import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  constructor() {

  }

  generateExcel(excelObject, excelSearchFilterFields) {

    //Create workbook and worksheet
    let workbook = new Workbook();
    // create new sheet with pageSetup settings for A4 - landscape
    let worksheet = workbook.addWorksheet(excelObject.excelWorkSheetName, {
      pageSetup: { paperSize: 9, orientation: 'landscape' }
    });
    worksheet.properties.defaultColWidth = 20;

    //Add Row and formatting
    let excelWorkSheetTitle = worksheet.addRow([excelObject.title]);
    excelWorkSheetTitle.font = {
      name: 'Calibri',
      family: 4,
      size: 20,
      underline: false,
      bold: true
    }
    excelWorkSheetTitle.alignment = {
      horizontal: 'left',
      vertical: 'middle'
    }

    worksheet.addRow([]);

    // Merge cells between A1 to N2
    worksheet.mergeCells('A1:N2');

    //Blank Row 
    worksheet.addRow([]);


    /* 
    ========================================================
      Search filter fields  - Starts here
      ========================================================
    */

    if (excelSearchFilterFields.searchFilterKeysValues.length) {
      //Add Row and formatting
      let searchCriteriaText = worksheet.addRow([excelSearchFilterFields.searchCriteriaText]);
      searchCriteriaText.font = {
        name: 'Calibri',
        family: 4,
        size: 16,
        bold: true
      }
      excelWorkSheetTitle.alignment = {
        horizontal: 'left',
        vertical: 'middle'
      }

      let excelSearchFilterFieldsData = excelSearchFilterFields.searchFilterKeysValues;


      excelSearchFilterFieldsData.forEach(d => {
        let row = worksheet.addRow(d);
        // Cell Style for Table header data : Fill and Border and Font
        row.eachCell((cell, number) => {
          cell.font = {
            name: 'Calibri',
            family: 4,
            bold: false,
            size: 12
          }
          if (number == 1) {
            cell.font.bold = true
          }
        });
      });
    }



    /* 
      ========================================================
      Search filter fields  - ends here
      ========================================================
    */

    worksheet.addRow([]);

    /* 
     ========================================================
       Creating Row for Table header and display in Excel sheet  - Starts here
       ========================================================
    */

    //Add Header Row
    let excelTableHeaderNames = worksheet.addRow(excelObject.tableHeaderNames);

    // Cell Style for Table header data : Fill and Border and Font
    excelTableHeaderNames.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F2DEFF' },
        // bgColor: { argb: 'FF0000FF' }
      }

      cell.font = {
        name: 'Calibri',
        family: 4,
        bold: true,
        size: 12
      }

      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    /* 
     ========================================================
       Creating Row for Table header and display in Excel sheet -  Ends here
       ========================================================
    */


    /* 
      ========================================================
        Add table body data and display in Excel - Starts here 
        ========================================================
     */

    let excelTableBodyData = excelObject.tableBodyData;

    excelTableBodyData.forEach(d => {
      let row = worksheet.addRow(d);

      // Cell Style for Table header data : Fill and Border and Font
      row.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' },
          // bgColor: { argb: 'FF0000FF' }
        }
        cell.font = {
          name: 'Calibri',
          family: 4,
          bold: false,
          size: 12
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });
    });

    /* 
     ========================================================
       Add table body data and display in Excel -  Ends here
       ========================================================
    */

    worksheet.addRow([]);

    /* 
     ========================================================
       Footer Row - Starts here
       ========================================================
    */

    let excelFooterRow = worksheet.addRow(['Disclaimer: This is system generated report.']);
    excelFooterRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'none',
      fgColor: { argb: 'FFFFFF' }
    };
    excelFooterRow.getCell(1).font = {
      name: 'Calibri',
      family: 4,
      bold: true,
      size: 12
    }
    // excelFooterRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Merge Cells
    worksheet.mergeCells(`A${excelFooterRow.number}:F${excelFooterRow.number}`);

    /* 
    ========================================================
      Footer Row - Ends here
      ========================================================
   */

    /* 
   ========================================================
     Generate Excel File with given name - Starts here
     ========================================================
  */

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, excelObject.fileName + '.xlsx');
    })

    /* 
  ========================================================
    Generate Excel File with given name - Ends here
    ========================================================
 */

  }
}
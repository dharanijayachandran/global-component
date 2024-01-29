import { L10n } from "@syncfusion/ej2-base";
import { MatPaginatorIntl } from '@angular/material/paginator';
import '@angular/localize/init';

// Syncfusion - dropdown list - No Records Found
export function syncDropdownNoRecordsFoundLocale() {
   
    L10n.load({
        'hi': {
            'dropdowns': {
                'noRecordsTemplate': "कोई रिकॉर्ड नहीं मिला!"
            },
            dropdowntree:{
                noRecordsTemplate: "कोई रिकॉर्ड नहीं मिला!"
            }
        }, 'ar': {
            'dropdowns': {
                'noRecordsTemplate': "لا توجد سجلات!"
            },
            dropdowntree: {
                noRecordsTemplate: "لا توجد سجلات!"
            }
        }
    });
}
 

const matRangeLabelIntl = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
        return $localize`:@@paginator.zeroRange:0 of ${length}`
    }
    length = Math.max(length, 0)
    const startIndex = page * pageSize

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?  Math.min(startIndex + pageSize, length) : startIndex + pageSize
    return $localize`:@@paginator.rangeOfLabel:${startIndex + 1} - ${endIndex} of ${length}`
}


export function MyPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl()

    paginatorIntl.itemsPerPageLabel = $localize`:@@paginator.displayPerPage:Items per page`
    paginatorIntl.nextPageLabel = $localize`:@@paginator.nextPage:Next page`
    paginatorIntl.previousPageLabel = $localize`:@@paginator.prevPage:Prev page`
    paginatorIntl.lastPageLabel=$localize`:@@paginator.lastPage:Last page`
    paginatorIntl.firstPageLabel=$localize`:@@paginator.firstPage:First page`
    paginatorIntl.getRangeLabel = matRangeLabelIntl
 
    return paginatorIntl
}
  
 
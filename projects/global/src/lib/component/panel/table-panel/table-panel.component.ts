import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { exportTable } from '../../../exportTable';

@Component({
  selector: 'app-panel-user',
  templateUrl: './table-panel.component.html',
  inputs: ['name', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  styleUrls: ['./table-panel.component.css']
})
export class TablePanelComponent implements OnInit {
  @Output() scrollBarDirective = new EventEmitter<any>();
  screenStatus: string = '';
  name:string;
  variant:boolean;
  noBody:boolean;
  noButton:boolean;
  bodyClass:boolean;
  footerClass:boolean;
  panelClass:boolean;
  @ViewChild('panelFooter') panelFooter;
  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;
  pageName: string;
  clickToAddNew = true;
  @ViewChild("ClicktoMaximize") ClicktoMaximize: ElementRef;
  @ViewChild("ClicktoMinimize") ClicktoMinimize: ElementRef;
  constructor(private router: Router, private render: Renderer2, private elRef: ElementRef,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
    this.screenStatus = this.ClicktoMaximize.nativeElement.innerText;
    this.cdr.detectChanges();
  }

  // To navigate to assign tenant menus
  @Output() eventEmitToPageNaviagte = new EventEmitter<string>();
  // Add new
  addNew() {
    // Dynamically getting page for Add new For example - addTenant, addAccount
    if (this.pageName == "templateList") {
      this.eventEmitToPageNaviagte.emit();
    } else if (this.pageName == 'analogTemplateTagList') {
      this.eventEmitToPageNaviagte.emit();
    } else {
      this.router.navigate([this.pageName]);
    }

  }


  @Output() panelExpandCollapse = new EventEmitter();
  panelExpand() {
    this.expand = !this.expand;
    this.panelExpandCollapse.emit(this.expand);
    if (this.expand) {
      //  this.screenStatus = "Click to Minimize";
      this.screenStatus = this.ClicktoMinimize.nativeElement.innerText;
    } else {
      // this.screenStatus = "Click to Maximize";
      this.screenStatus = this.ClicktoMaximize.nativeElement.innerText;
    }
  }


  // Refresh functionality for table list
  @Output() refreshTableList = new EventEmitter<string>();
  panelReload() {
    this.reload = true;
    this.refreshTableList.emit();
    // this.refreshTableList.emit('refreshTable');
    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    this.remove = !this.remove;
  }

  // Search button show/hide
  inpputSearchBoxElement
  searchButton(dataSource?) {
    this.inpputSearchBoxElement = document.getElementById("filter");
    if (this.inpputSearchBoxElement.style.display === "none") {
      this.inpputSearchBoxElement.style.display = "inline-block";
      // this.setTableDasourceAsDefault(dataSource);
    } else {
      this.inpputSearchBoxElement.style.display = "none";
      this.setTableDasourceAsDefault(dataSource);
    }
  }

  searchButtonPanel(dataSource?) {
    this.inpputSearchBoxElement = document.getElementById("search");
    if (this.inpputSearchBoxElement.style.display === "none") {
      this.inpputSearchBoxElement.style.display = "inline-block";
      // this.setTableDasourceAsDefault(dataSource);
    } else {
      this.inpputSearchBoxElement.style.display = "none";
      this.setTableDasourceAsDefault(dataSource);
    }
  }
  /* 
    Developer : Anandhan
    Purpose: In table panel, Click to search/filter > click to hide/show input filter search box >
              response data set back to Table datasource and input field make as a empty
  */

  setTableDasourceAsDefault(dataSource) {
    if (this.inpputSearchBoxElement != undefined) {
      (this.inpputSearchBoxElement as HTMLInputElement).value = '';
    }

    this.applyFilter('', dataSource);
  }



  // Panel header filter
  applyFilter(filterValue, dataSource) {
    dataSource.filter = filterValue.trim().toLowerCase();
    this.scrollBarDirective.emit();
  }

  exportTable(tableName, fileName) {
    exportTable.exportToExcel(tableName, fileName);
  }
}

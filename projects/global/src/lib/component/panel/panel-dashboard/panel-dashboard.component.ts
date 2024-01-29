import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panel-dashboard',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel-dashboard.component.html',
  styleUrls: ['./panel-dashboard.component.css']
})
export class PanelDashboardComponent implements  AfterViewInit {
  @ViewChild('panelFooter') panelFooter;
  title:string;
  variant:boolean;
  noBody:boolean;
  noButton:boolean;
  bodyClass:boolean;
  footerClass:boolean;
  panelClass:boolean;
  collapse:boolean;
  expand = false;
  reload = false;
  remove = false;
  showFooter = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
  }

  panelExpand() {
    this.expand = !this.expand;
  }
  
  
  panelRemove() {
    confirm("Are Your Sure !");
    this.remove = !this.remove;
  }
}

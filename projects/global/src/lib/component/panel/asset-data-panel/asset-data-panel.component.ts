import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-asset-data-panel',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './asset-data-panel.component.html',
  styleUrls: ['./asset-data-panel.component.css']
})
export class AssetDataPanelComponent implements OnInit {
  screenStatus: string = "";
  title:string;
  variant:boolean;
  noBody:boolean;
  noButton:boolean;
  bodyClass:boolean;
  footerClass:boolean;
  panelClass:boolean;
  collapse:boolean;
  @ViewChild('panelFooter') panelFooter;
  expand = false;
  reload = false;
  remove = false;
  showFooter = false;
  @ViewChild("ClicktoMaximize") ClicktoMaximize: ElementRef;
  @ViewChild("ClicktoMinimize") ClicktoMinimize: ElementRef;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
    this.screenStatus = this.ClicktoMaximize.nativeElement.innerText;
    this.cdr.detectChanges();
  }

  panelExpand() {
    this.expand = !this.expand;
    if (this.expand) {
      //  this.screenStatus = "Click to Minimize";
      this.screenStatus = this.ClicktoMinimize.nativeElement.innerText;
    } else {
      // this.screenStatus = "Click to Maximize";
      this.screenStatus = this.ClicktoMaximize.nativeElement.innerText;
    }
  }

  @Output() removeLineChart = new EventEmitter<string>();
  panelRemove(id) {
    this.removeLineChart.emit();
    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }


}

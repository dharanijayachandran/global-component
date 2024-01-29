import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UIModalNotificationPage } from '../../modal-notification/modal-notification';
@Component({
  selector: 'app-panel-remove',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel-remove.component.html',
  styleUrls: ['./panel-remove.component.css']
})
export class PanelRemoveComponent implements AfterViewInit {
  @ViewChild('panelFooter') panelFooter;
  @ViewChild(UIModalNotificationPage) modelNotification;
  title:string;
  variant:boolean;
  noBody:boolean;
  noButton:boolean;
  bodyClass:boolean;
  footerClass:boolean;
  panelClass:boolean;
  reload = false;
  collapse = false;
  remove = false;
  closeResult: string;
  showFooter = false;
  lineWidgetForm: boolean;
  expand = false;
  constructor(private modalService: NgbModal, @Inject(DOCUMENT) document: any) {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
  }

  panelReload() {
    this.reload = true;

    setTimeout(() => {
        this.reload = false;
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    
    this.modelNotification.swalDanger('Are you sure?', 'You will not be able to recover this Widget!');
    
    this.remove = !this.remove;
  }

  openFormModel(content,test:string) {
    alert(test);

    this.lineWidgetForm=true;
    this.modalService.open(content, 
      {
          windowClass: 'custom-class',
          backdrop:'static'
      }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  panelExpand() {
    this.expand = !this.expand;

  }
}

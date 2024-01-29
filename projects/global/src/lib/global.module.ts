import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UIModalNotificationPage } from './component/modal-notification/modal-notification';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AssetDataPanelComponent } from './component/panel/asset-data-panel/asset-data-panel.component';
import { PanelBlankComponent } from './component/panel/panel-blank/panel-blank.component';
import { PanelDashboardComponent } from './component/panel/panel-dashboard/panel-dashboard.component';
import { PanelRemoveComponent } from './component/panel/panel-remove/panel-remove.component';
import { TablePanelComponent } from './component/panel/table-panel/table-panel.component';
import { NumberDirective } from './directive/number-validate/numbers-only.directive';
import { ScrollbarDirective } from './directive/scroll-bar/scroll-bar.directive';
import { GlobalComponent } from './global.component';
import { HyphenPipe } from './pipe/hypen/hyphen.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyPaginatorIntl, syncDropdownNoRecordsFoundLocale } from './common/generic-export';
import { MatPaginatorIntl } from '@angular/material/paginator';


@NgModule({
  declarations: [
    GlobalComponent,
    UIModalNotificationPage,
    PageNotFoundComponent,
    AssetDataPanelComponent,
    PanelBlankComponent,
    PanelDashboardComponent,
    PanelRemoveComponent,
    TablePanelComponent,
    NumberDirective,
    ScrollbarDirective,
    HyphenPipe
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    GlobalComponent,
    UIModalNotificationPage,
    PageNotFoundComponent,
    AssetDataPanelComponent,
    PanelBlankComponent,
    PanelDashboardComponent,
    PanelRemoveComponent,
    TablePanelComponent,
    NumberDirective,
    ScrollbarDirective,
    HyphenPipe
  ],
  providers:[
    {
      provide: MatPaginatorIntl,
      useValue: MyPaginatorIntl()
    }, {
      // Syncfusion dropdown - No records found localization
      provide: syncDropdownNoRecordsFoundLocale,
      useValue: syncDropdownNoRecordsFoundLocale()
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GlobalModule { }

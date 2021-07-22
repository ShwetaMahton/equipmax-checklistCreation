import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { ChecklistpoolComponent } from './checklistpool/checklistpool.component';
import { AssetTableIndexComponent } from './asset-table-index/asset-table-index.component';
import { DialogAssetTableComponent } from './dialog-asset-table/dialog-asset-table.component';
import { ChecklistLogTableComponent } from './checklist-log-table/checklist-log-table.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { DialogAssetLogComponent } from './dialog-asset-log/dialog-asset-log.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { UpdateChecklistComponent } from './update-checklist/update-checklist.component';
import { AssetsAmcCostComponent } from './assets-amc-cost/assets-amc-cost.component';
import { ChartsModule } from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BarChartLineChartComponent } from './bar-chart-line-chart/bar-chart-line-chart.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { PdfViewerModule } from 'ng2-pdf-viewer';
//import { PdfParseModule } from 'pdf-parse';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

 @NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    routingcomponents,
    DialogOverviewExampleDialogComponent,
    AssetTableComponent,
    ChecklistpoolComponent,
    AssetTableIndexComponent,
    DialogAssetTableComponent,
    ChecklistLogTableComponent,
    DialogAssetLogComponent,
    UpdateChecklistComponent,
    AssetsAmcCostComponent,
    EditChecklistComponent,
    VirtualScrollComponent,
    BarChartLineChartComponent,
    LoginModuleComponent
   
  ],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ChartsModule,
    NgxPaginationModule,
    ScrollingModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    PdfViewerModule,
    PdfJsViewerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }

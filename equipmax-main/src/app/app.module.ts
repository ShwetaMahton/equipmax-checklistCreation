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
import { DialogAssetLogComponent } from './dialog-asset-log/dialog-asset-log.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
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
    DialogAssetLogComponent
   
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
    NgxMatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

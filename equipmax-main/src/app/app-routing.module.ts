import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatechecklistComponent } from './createchecklist/createchecklist.component';
import { AssetTableComponent} from './asset-table/asset-table.component';
import { ChecklistpoolComponent } from './checklistpool/checklistpool.component';
import { AssetTableIndexComponent } from './asset-table-index/asset-table-index.component';
import { DialogAssetTableComponent } from './dialog-asset-table/dialog-asset-table.component';
import { ChecklistLogTableComponent } from './checklist-log-table/checklist-log-table.component';
import {AssetsAmcCostComponent} from './assets-amc-cost/assets-amc-cost.component';

const routes: Routes = [
  {path: 'createchecklist', component:CreatechecklistComponent },
  {path: 'asset-table' , component: AssetTableComponent},
  {path: 'asset-table/:id', component: AssetTableIndexComponent},
  {path: 'checklistpool', component: ChecklistpoolComponent},
  {path: 'dialog-table/:id', component: DialogAssetTableComponent},
  {path: 'checklist', component: ChecklistLogTableComponent},
  {path: 'assets-amc-cost', component:AssetsAmcCostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [CreatechecklistComponent, AssetTableComponent, ChecklistpoolComponent, AssetTableIndexComponent,AssetsAmcCostComponent]

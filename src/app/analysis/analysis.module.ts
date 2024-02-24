import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AnalysisCreateComponent} from "./create/analysis-create.component";
import {AnalysisManageComponent} from "./manage/analysis-manage.component";

const routes: Routes = [
  {
    path: 'create',
    component: AnalysisCreateComponent,
    data: {breadcrumbs: ['analysis', 'create']}
  },
  {
    path: 'manage',
    component: AnalysisManageComponent,
    data: {breadcrumbs: ['analysis', 'manage']}
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AnalysisModule { }

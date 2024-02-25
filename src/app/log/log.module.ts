import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AnalysisLogComponent} from "./analysis-log/analysis-log.component";

const routes: Routes = [
  {
    path: 'analysis-log',
    component: AnalysisLogComponent,
    data: { breadcrumbs: ['analysis-log'] }
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class LogModule { }

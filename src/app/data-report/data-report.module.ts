import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PrecursorReportComponent} from "./precursor-report/precursor-report.component";
import {ProteinGroupReportComponent} from "./protein-group-report/protein-group-report.component";
import {DataReportComponent} from "./data-report.component";

const routes: Routes = [
  {
    path: "precursor",
    component: PrecursorReportComponent
  },
  {
    path: "protein-group",
    component: ProteinGroupReportComponent
  },
  {
    path: "",
    component: DataReportComponent
  }
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class DataReportModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExperimentCreateComponent} from "./create/experiment-create.component";
import {RouterModule, Routes} from "@angular/router";
import {ExperimentManageComponent} from "./manage/experiment-manage.component";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: 'create',
    component: ExperimentCreateComponent,
    data: {breadcrumbs: ['experiment', 'create']}
  },
  {
    path: 'manage',
    component: ExperimentManageComponent,
    data: {breadcrumbs: ['experiment', 'manage']}
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExperimentModule { }



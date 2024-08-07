import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {breadcrumbs: ['home']}
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
  }
  ,
  {
    path: 'experiment',
    loadChildren: () => import('./experiment/experiment.module').then(m => m.ExperimentModule),
    data: {breadcrumbs: ['experiment']}
  },
  {
    path: 'analysis',
    loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule),
    data: {breadcrumbs: ['analysis']}
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
    data: {breadcrumbs: ['task']}
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  },
  {
    path: 'data-report',
    loadChildren: () => import('./data-report/data-report.module').then(m => m.DataReportModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'home',
    data: {breadcrumbs: ['home']}
  }
];

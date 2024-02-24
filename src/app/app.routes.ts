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
    path: '**',
    redirectTo: 'home',
    data: {breadcrumbs: ['home']}
  }
];

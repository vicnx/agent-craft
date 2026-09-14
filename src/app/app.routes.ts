import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/welcome/welcome').then((m) => m.Welcome),
    title: 'AgentCraft · Inicio',
  },
  {
    path: 'builder',
    redirectTo: 'builder/custom',
    pathMatch: 'full',
  },
  {
    path: 'builder/:presetId',
    loadComponent: () =>
      import('./features/builder/builder').then((m) => m.Builder),
    title: 'AgentCraft · Studio de Reglas',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

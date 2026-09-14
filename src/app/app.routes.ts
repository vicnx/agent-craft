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
    loadComponent: () =>
      import('./features/builder/builder').then((m) => m.Builder),
    title: 'AgentCraft · Studio de Reglas',
  },
  {
    path: 'builder/:presetId',
    loadComponent: () =>
      import('./features/builder/builder').then((m) => m.Builder),
    title: 'AgentCraft · Configurar Preset',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

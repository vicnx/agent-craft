import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/constants/routes.constant';

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/welcome/welcome').then((m) => m.Welcome),
    title: 'AgentCraft · Inicio',
  },
  {
    path: APP_ROUTES.BUILDER,
    redirectTo: `${APP_ROUTES.BUILDER}/custom`,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.BUILDER_PARAM,
    loadComponent: () =>
      import('./features/builder/builder').then((m) => m.Builder),
    title: 'AgentCraft · Studio de Reglas',
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.HOME,
  },
];

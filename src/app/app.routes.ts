import { Route } from '@angular/router';
import { AuthenticatedGuard } from '@goal-editor/shared';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('@goal-editor/home').then(m => m.HomeComponent),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('@goal-editor/auth').then(m => m.LoginComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

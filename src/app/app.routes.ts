import { Route } from '@angular/router';
import { AuthenticatedGuard, SidebarLayoutComponent } from '@goal-editor/shared';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('@goal-editor/auth').then(m => m.LoginComponent)
    },
    {
        path: '',
        component: SidebarLayoutComponent,
        canActivate: [AuthenticatedGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('@goal-editor/home').then(m => m.HomeComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

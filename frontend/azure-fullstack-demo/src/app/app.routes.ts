import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { MainLayout } from './shared/components/main-layout/main-layout';
import { DevPage } from './features/dev/dev-page/dev-page';
import { WelcomePage } from './features/welcome/welcome-page/welcome-page';
import { DashboardPage } from './features/dashboard/dashboard-page/dashboard-page';

const devRoutes: Routes = environment.isDev
    ? [
        {
            path: 'dev',
            component: DevPage
        }
    ]
    : [];

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                component: WelcomePage
            },
            {
                path: 'dashboard',
                component: DashboardPage
            },
            ...devRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ]
    }
];

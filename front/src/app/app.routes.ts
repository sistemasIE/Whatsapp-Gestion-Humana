import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [{
  path:'login',
  loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
  canDeactivate: [authGuard],
},
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'documentos',
    loadComponent: () =>
      import('./components/documents/documents.component').then(
        (m) => m.DocumentsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'otros',
    loadComponent: () =>
      import('./components/others/others.component').then(
        (m) => m.OthersComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'qr',
    loadComponent: () =>
      import('./components/qr/qr.component').then((m) => m.QrComponent),
    canActivate: [authGuard],
  },
];

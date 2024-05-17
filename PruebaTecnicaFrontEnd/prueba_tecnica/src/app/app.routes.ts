import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
    //rutas hijas o sub rutas
    children: [
      {
        path: 'encuestas',
        title: 'encuestas',
        loadComponent: () => import('./home/list-forms/list-forms.component'),
      },
    
      {
        path: 'llenar/:linkFormulario',
        title: 'llenar encuesta',
        loadComponent: () =>
          import('./home/llenar-encuesta/llenar-encuesta.component'),
      },
    ],
  },
  {
    path: 'formularios',
    title: 'formularios',
    loadComponent: () => import('./formularios/formularios.component'),
    children: [
      {
        path: 'form-campo',
        title: 'formularioCampo',
        loadComponent: () =>
          import('./formularios/form-campo/form-campo.component'),
      },
      {
        path: 'resultados/:linkFormulario',
        title: 'resultados',
        loadComponent: () =>
          import('./formularios/dashboard-resultados/dashboard-resultados.component'),
      },
      {
        path: 'list-campo/:linkFormulario',
        title: 'Campos',
        loadComponent: () =>
          import('./formularios/list-campo/list-campo.component'),
      },
      {
        path: 'form-encuesta',
        title: 'formularioEncuesta',
        loadComponent: () =>
          import('./formularios/form-encuesta/form-encuesta.component'),
      },
      {
        path: 'form-edit/:linkFormulario',
        title: 'formularioEncuesta',
        loadComponent: () =>
          import('./formularios/formedit-encuesta/formedit-encuesta.component'),
      },
      {
        path: 'opciones',
        title: 'opciones',
        loadComponent: () =>
          import('./formularios/opciones/opciones.component'),
      },
      {
        path: 'login',  
        title: 'login',
        loadComponent: () => import('./formularios/login/login.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/encuestas',
    pathMatch: 'full',
  },
];

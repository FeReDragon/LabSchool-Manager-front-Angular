import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../app/guards/auth.guard'; // Importando o authGuard
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  {
    path: 'alunos',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  {
    path: 'acompanhamentos',
    loadChildren: () => import('./pedagogic-support/pedagogic-support.module').then(m => m.PedagogicSupportModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent,
    canActivate: [authGuard]  // Adicionando o guard
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

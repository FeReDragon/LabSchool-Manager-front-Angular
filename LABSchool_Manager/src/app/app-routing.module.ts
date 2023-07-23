import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../app/guards/auth.guard'; // Importando o authGuard
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [

    { path: 'login', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  {
    path: 'pedagogic-support',
    loadChildren: () => import('./pedagogic-support/pedagogic-support.module').then(m => m.PedagogicSupportModule),
    canActivate: [authGuard] // Adicionando o guard
  },
  { path: 'not-found', 
  component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
  
 
  // outras rotas vão aqui...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


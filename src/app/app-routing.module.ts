import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './configuration/forms/forms.component';
import { RoleGuard } from './role.guard';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: DashboardComponent },
  { path: 'signup', component: SignupComponent, canActivate: [RoleGuard],
    data: {expectedRole:'ADMIN'}
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  

  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'configuration',
        loadChildren:()=>import('./configuration/configuration.module').then(m=>m.ConfigurationModule),
        canActivate:[RoleGuard],
        data:{expectedRole:'ADMIN|TEACHER'}
      },

      {
        path:'students-management',
        loadChildren:()=>import('./students-management/students-management.module').then(m=>m.StudentsManagementModule),
        canActivate:[RoleGuard],
        data:{expectedRole:'ADMIN'}
      },

     
      
    ]
  },

 

 // { path: '**', redirectTo: '' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

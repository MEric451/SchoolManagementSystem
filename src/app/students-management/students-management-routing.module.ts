import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsProfileComponent } from './students-profile/students-profile.component';
import { StudentsEnrollmentComponent } from './students-enrollment/students-enrollment.component';
import { GradeManagementComponent } from './grade-management/grade-management.component';

const routes: Routes = [
  {path:'students-profile', component:StudentsProfileComponent},

  {path: 'students-enrollment', component:StudentsEnrollmentComponent},

  {path: 'grade-management', component:GradeManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsManagementRoutingModule { }

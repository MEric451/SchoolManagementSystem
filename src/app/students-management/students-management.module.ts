import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsManagementRoutingModule } from './students-management-routing.module';
import { StudentsEnrollmentComponent } from './students-enrollment/students-enrollment.component';
import { StudentsProfileComponent } from './students-profile/students-profile.component';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { GradeManagementComponent } from './grade-management/grade-management.component';

@NgModule({
  declarations: [
    StudentsProfileComponent,
    StudentsEnrollmentComponent,
    GradeManagementComponent
  ],
  imports: [
    CommonModule,
    StudentsManagementRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  
  ]
})
export class StudentsManagementModule { }

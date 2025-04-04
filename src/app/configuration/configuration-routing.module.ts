import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeComponent } from './grade/grade.component';
import { FormsComponent } from './forms/forms.component';
import { StreamsComponent } from './streams/streams.component';
import { SubjectsComponent } from './subjects/subjects.component';



const routes: Routes = [
  {
    path: 'grade',
    component: GradeComponent
  },

  {
    path: 'forms', component: FormsComponent
  },

  {
    path: 'streams', component: StreamsComponent
  },

  {
    path: 'subjects', component: SubjectsComponent
  },

  {
    path: 'grade', component: GradeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }

import { Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

export const routes: Routes = [
  { path: 'liste', component: CourseListComponent },
  { path: 'ajouter', component: CourseAddComponent },
  { path: 'edit/:id', component: CourseEditComponent },
  { path: 'detail/:id', component: CourseDetailComponent },
  { path: '', redirectTo: 'liste', pathMatch: 'full' } 

];
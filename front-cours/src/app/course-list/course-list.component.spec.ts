import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data as any[];
    });
  }

  delete(course: any) {
    if(confirm("Supprimer ?")) {
      this.courseService.deleteCourse(course._id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
}
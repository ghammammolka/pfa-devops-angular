import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit {

  course: any = {};
  selectedFile: File | null = null;
  previewUrl: any = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.courseService.getCourseById(id).subscribe((data: any) => {
        this.course = data;
      });
    }
  }

  // 📂 fichier choisi
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {

    const formData = new FormData();

    formData.append('title', this.course.title);
    formData.append('description', this.course.description);
    formData.append('level', this.course.level);
    formData.append('formateur', this.course.formateur);

    // 🔥 fichier prioritaire
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.course.image);
    }

    this.courseService.updateCourse(this.course._id, formData)
      .subscribe(() => {
        alert("Cours modifié !");
        this.router.navigate(['/liste']);
      });
  }
}
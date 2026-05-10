import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-add.component.html'
})
export class CourseAddComponent {

  // 📦 données cours
  course = {
    title: '',
    description: '',
    level: '',
    formateur: '',
    image: '' // URL
  };

  // 📂 fichier upload
  selectedFile: File | null = null;

  // 👀 preview image
  previewUrl: any = null;

  constructor(private courseService: CourseService) {}

  // 📂 choisir fichier + preview
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // 🚀 submit
  submit() {

    // 🔒 validation
    if (!this.course.title || !this.course.level) {
      alert("Remplir les champs obligatoires !");
      return;
    }

    const formData = new FormData();

    formData.append('title', this.course.title);
    formData.append('description', this.course.description);
    formData.append('level', this.course.level);
    formData.append('formateur', this.course.formateur);

    // 🔥 priorité fichier
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.course.image);
    }

    this.courseService.addCourse(formData).subscribe({
      next: () => {
        alert("Cours ajouté !");

        // reset
        this.course = {
          title: '',
          description: '',
          level: '',
          formateur: '',
          image: ''
        };

        this.selectedFile = null;
        this.previewUrl = null;
      },
      error: (err) => {
        console.log(err);
        alert("Erreur !");
      }
    });
  }
}
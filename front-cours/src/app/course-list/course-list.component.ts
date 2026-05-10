import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  // 📦 liste des cours
  courses: any[] = [];

  // 🔍 recherche
  searchText: string = '';

  // 🎯 filtre niveau
  selectedLevel: string = '';

  // 🔄 mode affichage (table ou carte)
  viewMode: string = 'table';

  constructor(private courseService: CourseService) {}

  // 🚀 au chargement
  ngOnInit(): void {
    this.loadCourses();
  }

  // 📥 récupérer tous les cours
  loadCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data as any[];
    });
  }

  // 🔍 filtre + recherche
  getFilteredCourses() {
    return this.courses
      .filter(c =>
        c.title.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter(c =>
        this.selectedLevel === '' || c.level === this.selectedLevel
      );
  }

  // 🗑️ suppression avec SweetAlert
  delete(c: any) {
    Swal.fire({
      title: 'Supprimer ?',
      text: "Tu ne peux pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(c._id).subscribe(() => {
          this.loadCourses();
          Swal.fire('Supprimé !', 'Le cours a été supprimé.', 'success');
        });
      }
    });
  }

  // 🔄 changer affichage (table ↔ cartes)
  toggleView() {
    this.viewMode = this.viewMode === 'table' ? 'card' : 'table';
  }
}
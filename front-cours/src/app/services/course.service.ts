import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  // GET ALL
  getCourses() {
    return this.http.get(`${environment.apiUrl}/${environment.prefix}/courses`);
  }

  // ADD
  addCourse(data: any) {
    return this.http.post(`${environment.apiUrl}/${environment.prefix}/courses`, data);
  }

  // DELETE
  deleteCourse(id: string) {
    return this.http.delete(`${environment.apiUrl}/${environment.prefix}/courses/${id}`);
  }

  //update 
  updateCourse(id: string, data: any) {
  return this.http.put(`${environment.apiUrl}/${environment.prefix}/courses/${id}`, data);
}
getCourseById(id: string) {
  return this.http.get(`${environment.apiUrl}/${environment.prefix}/courses/${id}`);
}
}
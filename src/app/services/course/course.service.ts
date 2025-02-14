import { Injectable } from '@angular/core';
import { Strings } from '../../enums/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  get courses(){
    return this.courses$.asObservable();
  }

  constructor() { }

  getCourses() : Course[] {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    const courses = data ? JSON.parse(data) : [];

    if(data){
      this.updateCourses(courses);
      return courses;
    }

    return [];
  }

  addCourse(data : Course){
    let courses = this.courses$.getValue();
    courses = [...courses, {...data, id: courses.length + 1}];

    this.updateCourses(courses);

    this.setItem(courses);

    return courses;
  }

  deleteCourse(data : Course){
    let courses = this.courses$.getValue();
    courses = courses.filter(course => course.id !== data.id);    
    this.updateCourses(courses);
    this.setItem(courses);
  }

  updateCourses(data : Course[]){
    this.courses$.next(data);
  }

  
  setItem(data : Course[]){
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }


}

import { CommonModule } from '@angular/common';
import { Component,inject, Input } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  courses: any[] = [];
  @Input() isAdmin = false;
  private readonly courseService = inject(CourseService);
  coursesSub!: Subscription;

  ngOnInit() {
    this.courses = this.courseService.getCourses();

    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }

  ngOnDestroy() {
    if(this.coursesSub) this.coursesSub.unsubscribe();
  }
}

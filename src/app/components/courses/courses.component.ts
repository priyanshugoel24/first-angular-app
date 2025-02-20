import { CommonModule } from '@angular/common';
import { Component,inject, Input } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';
import { Course } from '../../interfaces/course.interface';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  animations : [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity : 0, transform : 'translateY(20px)'}),
        animate('500ms ease-out',
          style({opacity : 1, transform : 'translateY(0)'})
        )
      ])
    ])
  ]
})
export class CoursesComponent {
  courses: any[] = [];
  @Input() isAdmin = false;
  private readonly courseService = inject(CourseService);
  private readonly toastr = inject(ToastrService);
  coursesSub!: Subscription;

  ngOnInit() {
    this.courses = this.courseService.getCourses();

    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        this.toastr.error('An error occurred while fetching courses');
        console.error(error);
      }
    });
  }

  deleteCourse(course: Course) {
    try{
      this.courseService.deleteCourse(course);
      this.toastr.success('Course deleted successfully');
    } catch(error){
      this.toastr.error('An error occurred while deleting course');
      console.error(error);
    }
  }

  ngOnDestroy() {
    if(this.coursesSub) this.coursesSub.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { CoursesComponent } from "../courses/courses.component";
import { Strings } from '../../enums/strings.enum';
import { CommonModule } from '@angular/common';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses : Course[] = [];

 
  
}

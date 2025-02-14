import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../../enums/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,NgIf, CoursesComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  model : any = {};
  cover! : string | null;
  showError :boolean = false;
  cover_file : any;
  isSaved : boolean = false;
  courses : Course[] = [];
  private courseService = inject(CourseService);
  // ngOnInit(){
  //   this.getCourses();
  // }

  // getCourses(){
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   this.courses = data ? JSON.parse(data) : [];
  // }
  
  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }

    console.log(form.value);

    this.saveCourse(form);
  }

  clearForm(form : NgForm){
    if(form){
      form.resetForm();
      this.cover = null;
      this.cover_file = null;
    }
  }

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result!.toString();
        this.cover = dataURL;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveCourse(form: NgForm){
    try{
      const formValue = form.value; 
      console.log(formValue);
  
      const data : Course = {
        ...formValue,
        image: this.cover,
        id: this.courses.length + 1,
      }
  
      await this.courseService.addCourse(data);      
  
      this.clearForm(form);

    } catch(e){
      console.log(e);
    }
  }

  // deleteCourse(course : any){
  //   this.courses = this.courses.filter(course_item => course_item.id != course.id);

  //   localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses));

  // }



}

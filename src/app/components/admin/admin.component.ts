import { CommonModule, NgIf } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../../enums/strings.enum';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,NgIf, CoursesComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  model : any = {};
  cover! : string;
  showError :boolean = false;
  cover_file : any;
  isSaved : boolean = false;
  courses : any[] = [];

  ngOnInit(){
    this.getCourses();
  }

  getCourses(){
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    this.courses = data ? JSON.parse(data) : [];
  }

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

    this.saveCourse(form.value);
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

  saveCourse(formValue : any){
    console.log(formValue);

    const data = {
      ...formValue,
      image: this.cover,
    }
    

    this.courses = [...this.courses, data];
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses));
  }


}

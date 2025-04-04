// students-enrollment.component.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, AfterViewInit, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-students-enrollment',
  templateUrl: './students-enrollment.component.html',
  styleUrls: ['./students-enrollment.component.css']
})

export class StudentsEnrollmentComponent {
  studentForm!: FormGroup;

  classLevels = [
    { level: 1, name: 'Form 1' },
    { level: 2, name: 'Form 2' },
    { level: 3, name: 'Form 3' },
    { level: 4, name: 'Form 4' }

  ]

  streamID = [
    { level: 1, name: 'West' },
    { level: 2, name: 'East' }
  ]

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      classLevel: ['', Validators.required],
      streamID: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('session expired')
      this.router.navigate(['/login'])
      return
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });



    if (this.studentForm.valid) {
      const data = this.studentForm.value

      this.http.post('http://172.16.10.16:8085/api/students/create', data, { headers }).subscribe({
        next: (response) => {
          alert('success')
        },
        error: (err) => {
          alert('failed')
        }
      })
    }


  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-students-profile',
  templateUrl: './students-profile.component.html',
  styleUrls: ['./students-profile.component.css']
})
export class StudentsProfileComponent implements OnInit {
  studentForm!: FormGroup;
  students:any[]=[];
  isEditing = false;
profileForm: any;
  selectedStudentIndex: number | null = null;
  
 constructor(private fb: FormBuilder, private http: HttpClient) {}
 
  ngOnInit(): void {
      this.fetchStudents();

       // Initialize the profileForm
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      classLevel: ['', Validators.required],
      streamID: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  fetchStudents() {
    const token = localStorage.getItem('token');

    if(!token) {
      alert('Session expired');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<any []>('http://172.16.10.16:8085/api/students', { headers }).subscribe({
      next: (response) => {
        this.students = response; // Store API response in students array
        console.log('Fetched students:', this.students);
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        alert('Failed to fetch students');
      }
    });
    
  }
  editProfile(student:any) {
    this.isEditing = true;
    this.selectedStudentIndex = this.students.indexOf(student);

    //populate form with the selected data
    this.profileForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      classLevel: student.classLevel,
      streamID: student.streamID,
      dateOfBirth: student.dateOfBirth,
    });
  }

  saveProfile() {
    if (this.profileForm.valid && this.selectedStudentIndex !==null ) {
      const updatedStudent = this.profileForm.value;

      this.students[this.selectedStudentIndex] = updatedStudent;

      console.log('Saving student profile: ', updatedStudent);
      const token = localStorage.getItem('token');

      // Hide edit form
      this.isEditing = false;
      this.selectedStudentIndex = null;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.profileForm.reset();
    this.selectedStudentIndex = null;
  }
}


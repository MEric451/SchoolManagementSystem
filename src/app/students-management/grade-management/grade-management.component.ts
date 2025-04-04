import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grade-management',
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.css']
})

export class GradeManagementComponent implements OnInit {
  gradeForm!: FormGroup;
  forms: string[] = [];
  streams: string[] = [];
  subjects: string[] = [];
  grades: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.gradeForm = this.fb.group({
      studentName: ['', Validators.required],
      form: ['', Validators.required],
      stream: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    // Load Forms, Streams, and Subjects from API
    this.loadForms();
    this.loadStreams();
  }

  // Fetch Forms
  loadForms() {
    this.http.get<string[]>('/api/forms').subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  // Fetch Streams
  loadStreams() {
    this.http.get<string[]>('/api/streams').subscribe(
      (data) => {
        this.streams = data;
      },
      (error) => {
        console.error('Error fetching streams:', error);
      }
    );
  }

  // Fetch Subjects when a form is selected
  onFormChange() {
    const selectedForm = this.gradeForm.value.form;
    if (selectedForm) {
      this.http.get<string[]>(`/api/subjects?form=${selectedForm}`).subscribe(
        (data) => {
          this.subjects = data;
        },
        (error) => {
          console.error('Error fetching subjects:', error);
        }
      );
    }
  }

  // Submit Grade
  submitGrade() {
    if (this.gradeForm.valid) {
      const newGrade = this.gradeForm.value;

      // Call API to submit grade
      this.http.post('/api/grades', newGrade).subscribe(
        (response) => {
          console.log('Grade submitted:', response);
          this.grades.push(newGrade); // Add new grade to the table
          this.gradeForm.reset(); // Reset form
        },
        (error) => {
          console.error('Error submitting grade:', error);

        }
      );
    }
  }
}

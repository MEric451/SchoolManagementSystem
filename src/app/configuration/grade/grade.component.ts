import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Grade {
  id: number;
  studentName: string;
  formId: number;
  streamId: number;
  subjectId: number;
  score: number;
  grade: string;
}

@Component({
  selector: 'app-grades',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  gradeForm: FormGroup;
  grades: Grade[] = [];
  editingGrade: Grade | null = null;
  nextId: number = 1;

  // Sample data for Forms, Streams, and Subjects
  forms = [
    { id: 1, name: 'Form 1' },
    { id: 2, name: 'Form 2' },
    { id: 3, name: 'Form 3' },
    { id: 4, name: 'Form 4' }
  ];

  streams = [
    { id: 1, name: 'West' },
    { id: 2, name: 'East' }
  ];

  subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Kiswahili' },
    { id: 4, name: 'Chemistry' },
    { id: 5, name: 'Physics' },
    { id: 6, name: 'Biology' },
    { id: 7, name: 'History' },
    { id: 8, name: 'Geography' },
    { id: 9, name: 'Business Studies' },
    { id: 10, name: 'C.R.E' },
    { id: 11, name: 'Agriculture' }
  ];

  constructor(private fb: FormBuilder) {
    this.gradeForm = this.fb.group({
      studentName: ['', Validators.required],
      formId: ['', Validators.required],
      streamId: ['', Validators.required],
      subjectId: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {}

  addGrade(): void {
    if (this.gradeForm.valid) {
      const newGrade: Grade = {
        id: this.nextId++,
        ...this.gradeForm.value,
        grade: this.calculateGrade(this.gradeForm.value.score) // Assign letter grade
      };
      this.grades.push(newGrade);
      this.gradeForm.reset();
    }
  }

  loadGradeForEdit(grade: Grade): void {
    this.editingGrade = { ...grade };
    this.gradeForm.patchValue({
      studentName: grade.studentName,
      formId: grade.formId,
      streamId: grade.streamId,
      subjectId: grade.subjectId,
      score: grade.score
    });
  }

  updateGrade(): void {
    if (this.gradeForm.valid && this.editingGrade) {
      const index = this.grades.findIndex(g => g.id === this.editingGrade!.id);
      if (index !== -1) {
        this.grades[index] = {
          id: this.editingGrade.id,
          ...this.gradeForm.value,
          grade: this.calculateGrade(this.gradeForm.value.score)
        };
      }
      this.cancelEdit();
    }
  }

  deleteGrade(grade: Grade): void {
    this.grades = this.grades.filter(g => g.id !== grade.id);
  }

  cancelEdit(): void {
    this.editingGrade = null;
    this.gradeForm.reset();
  }

  getSubjectName(subjectId: number): string {
    const subject = this.subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  }
  

  // Convert numeric score to letter grade
  calculateGrade(score: number): string {
    if (score >= 80) return 'A';
    if (score >= 75) return 'A-';
    if (score >= 70) return 'B+';
    if (score >= 65) return 'B';
    if (score >= 60) return 'B-';
    if (score >= 55) return 'C+';
    if (score >= 50) return 'C';
    if (score >= 45) return 'C-';
    if (score >= 40) return 'D+';
    if (score >= 35) return 'D';
    if (score >= 30) return 'D-';
    return 'E';
  }
}

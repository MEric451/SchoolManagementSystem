import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from './subjects.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjectForm: FormGroup;
  subjects: Subject[] = [];
  editingSubject: Subject | null = null;
  searchTerm: string = '';

  constructor(private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      description: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    // Load initial subjects (this could come from an API)
    this.subjects = [
      { id: 1, name: 'Mathematics', code: 'MATH101', description: 'Fundamentals of math', category: 'Core' },
      { id: 2, name: 'English', code: 'ENG101', description: 'English language and literature', category: 'Core' },
      { id: 3, name: 'Science', code: 'SCI101', description: 'General science', category: 'Elective' }
    ];
  }

  get filteredSubjects(): Subject[] {
    if (!this.searchTerm) {
      return this.subjects;
    }
    return this.subjects.filter(sub =>
      sub.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (sub.code && sub.code.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  addSubject(): void {
    if (this.subjectForm.valid) {
      const newSubject: Subject = {
        id: this.subjects.length ? Math.max(...this.subjects.map(s => s.id)) + 1 : 1,
        ...this.subjectForm.value
      };
      this.subjects.push(newSubject);
      this.subjectForm.reset();
    }
  }

  loadSubjectForEdit(subject: Subject): void {
    this.editingSubject = subject;
    this.subjectForm.patchValue({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      category: subject.category
    });
  }

  updateSubject(): void {
    if (this.subjectForm.valid && this.editingSubject) {
      const index = this.subjects.findIndex(s => s.id === this.editingSubject!.id);
      if (index !== -1) {
        this.subjects[index] = { id: this.editingSubject.id, ...this.subjectForm.value };
      }
      this.cancelEdit();
    }
  }

  deleteSubject(subject: Subject): void {
    const confirmed = confirm(`Are you sure you want to delete ${subject.name}?`);
    if (confirmed) {
      this.subjects = this.subjects.filter(s => s.id !== subject.id);
      if (this.editingSubject && this.editingSubject.id === subject.id) {
        this.cancelEdit();
      }
    }
  }

  resetForm(): void {
    this.subjectForm.reset(); // Clears all form inputs
  }
  

  cancelEdit(): void {
    this.editingSubject = null;
    this.subjectForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SchoolForm {
  id: number;
  name: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  forms: SchoolForm[] = [];
  formForm: FormGroup;
  editingForm: SchoolForm | null = null;
  nextId: number = 1;

  constructor(private fb: FormBuilder) {
    this.formForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pre-populate with default forms
    this.forms = [
      { id: this.nextId++, name: 'Form 1' },
      { id: this.nextId++, name: 'Form 2' },
      { id: this.nextId++, name: 'Form 3' },
      { id: this.nextId++, name: 'Form 4' }
    ];
  }

  addForm(): void {
    if (this.formForm.valid) {
      const newForm: SchoolForm = {
        id: this.nextId++,
        name: this.formForm.value.name
      };
      this.forms.push(newForm);
      this.formForm.reset();
    }
  }

  loadFormForEdit(form: SchoolForm): void {
    this.editingForm = { ...form }; // clone the form object
    this.formForm.patchValue({ name: form.name });
  }

  updateForm(): void {
    if (this.editingForm && this.formForm.valid) {
      const index = this.forms.findIndex(f => f.id === this.editingForm!.id);
      if (index !== -1) {
        this.forms[index].name = this.formForm.value.name;
      }
      this.cancelEdit();
    }
  }

  deleteForm(form: SchoolForm): void {
    this.forms = this.forms.filter(f => f.id !== form.id);
  }

  cancelEdit(): void {
    this.editingForm = null;
    this.formForm.reset();
  }
}

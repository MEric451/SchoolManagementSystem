import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Stream {
  id: number;
  name: string;
  formId: number;
}

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams: Stream[] = [];
  streamForm: FormGroup;
  editingStream: Stream | null = null;
  nextId: number = 1;

  // Simulated list of forms
  forms = [
    { id: 1, name: 'Form 1' },
    { id: 2, name: 'Form 2' },
    { id: 3, name: 'Form 3' },
    { id: 4, name: 'Form 4' }
  ];
  
  selectedFormId: number = 1; // Default to Form 1

  constructor(private fb: FormBuilder) {
    this.streamForm = this.fb.group({
      name: ['', Validators.required],
      formId: [this.selectedFormId, Validators.required]
    });
  }

  ngOnInit(): void {
    // Pre-populate with default streams for Form 1
    this.streams = [
      { id: this.nextId++, name: 'West', formId: 1 },
      { id: this.nextId++, name: 'East', formId: 1 }
    ];
  }

  addStream(): void {
    if (this.streamForm.valid) {
      const newStream: Stream = {
        id: this.nextId++,
        name: this.streamForm.value.name,
        formId: this.streamForm.value.formId
      };
      this.streams.push(newStream);
      this.streamForm.reset({ formId: this.selectedFormId });  //links the stream to the selected form
    }
  }

  loadStreamForEdit(stream: Stream): void {
    this.editingStream = { ...stream };
    this.streamForm.patchValue({
      name: stream.name,
      formId: stream.formId
    });
  }

  updateStream(): void {
    if (this.editingStream && this.streamForm.valid) {
      const index = this.streams.findIndex(s => s.id === this.editingStream!.id);
      if (index !== -1) {
        this.streams[index] = {
          id: this.editingStream.id,
          name: this.streamForm.value.name,
          formId: this.streamForm.value.formId
        };
      }
      this.cancelEdit();
    }
  }

  deleteStream(stream: Stream): void {
    this.streams = this.streams.filter(s => s.id !== stream.id);
  }

  cancelEdit(): void {
    this.editingStream = null;
    this.streamForm.reset({ formId: this.selectedFormId });
  }

  // Return streams filtered by the selected form
  get filteredStreams(): Stream[] {
    return this.streams.filter(s => s.formId === this.selectedFormId);
  }

  // Update selected form (triggered by a dropdown change)
  onFormChange(event: any): void {
    this.selectedFormId = +event.target.value;
    // Update form control for formId in streamForm
    this.streamForm.patchValue({ formId: this.selectedFormId });
  }
}

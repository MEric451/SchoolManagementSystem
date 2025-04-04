export interface Grade {
    id: number;
    studentName: string;
    formId: number; // Form 1, Form 2, etc.
    streamId: number; // Stream (West, East, etc.)
    subjectId: number; // Subject being graded
    score: number; // Numeric score (0 - 100)
    grade: string; // Letter grade (A, B+, C, etc.)
  }
  

// src/types/index.ts
interface Task {
  title: string;
  description: string;
  assignee: string | null;
  priority: 'high' | 'medium' | 'low';
  dueDate: string | null;
}

interface TranscriptAnalysisResult {
  tasks: Task[];
  summary: string;
}
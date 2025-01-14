// src/types/index.ts
interface Task {
    title: string;
    description: string;
    dueDate?: string;
    assignee?: string;
    priority?: string;
  }
  
  interface TranscriptAnalysisResult {
    tasks: Task[];
    summary: string;
  }
  
 
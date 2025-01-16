
// // src/types/index.ts
// interface Task {
//   title: string;
//   description: string;
//   assignee: string | null;
//   priority: 'high' | 'medium' | 'low';
//   dueDate: string | null;
// }

// interface TranscriptAnalysisResult {
//   tasks: Task[];
//   summary: string;
// }

// src/types/index.ts
interface TranscriptTask {
  title: string;
  description: string;
  assignee?: string;
  dueDate?: string;
  priority?: string;
}

interface MondayItem {
  name: string;
  column_values: {
    text: string;
    person?: string;
    date?: string;
    status?: string;
  }[];
}
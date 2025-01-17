"use client"
import { useState } from 'react';
import { Upload } from 'lucide-react';

interface Task {
  title: string;
  description: string;
  assignee?: string;
  dueDate?: string;
}

interface ProcessTranscriptResponse {
  success: boolean;
  tasks: Task[];
}

const TranscriptUploader = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardId, setBoardId] = useState('');

  const handleTranscriptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !boardId) return;

    setLoading(true);
    try {
      const text = await file.text();
      const response = await fetch('/api/process-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: text,
          boardId
        }),
      });

      const data: ProcessTranscriptResponse = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Error processing transcript:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Monday.com Board ID
        </label>
        <input
          type="text"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your board ID"
        />
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".txt,.doc,.docx"
            onChange={handleTranscriptUpload}
            className="hidden"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Upload meeting transcript</p>
        </label>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          Processing transcript...
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Extracted Tasks:</h3>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="p-4 border rounded">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                {task.assignee && (
                  <p className="text-sm">Assignee: {task.assignee}</p>
                )}
                {task.dueDate && (
                  <p className="text-sm">Due: {task.dueDate}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptUploader;
// src/utils/openai.ts
import OpenAI from 'openai';

export class OpenAIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: false // Ensure server-side only
    });
  }

  async analyzeTranscript(transcript: string): Promise<TranscriptAnalysisResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that extracts actionable tasks from meeting transcripts.
              Please output your response as a valid JSON object with the following structure:
              {
                "tasks": [
                  {
                    "title": "Task title",
                    "description": "Detailed description",
                    "assignee": "Person name or null",
                    "priority": "high/medium/low",
                    "dueDate": "YYYY-MM-DD or null"
                  }
                ],
                "summary": "Brief meeting summary"
              }`
          },
          {
            role: "user",
            content: `Please analyze this meeting transcript and extract tasks in the specified JSON format: ${transcript}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message.content || "{}");
      
      // Validate the structure
      if (!result.tasks || !Array.isArray(result.tasks)) {
        throw new Error("Invalid response structure");
      }
      
      return {
        tasks: result.tasks.map(task => ({
          title: task.title || '',
          description: task.description || '',
          assignee: task.assignee || null,
          priority: task.priority || 'medium',
          dueDate: task.dueDate || null
        })),
        summary: result.summary || ''
      };
    } catch (error) {
      console.error('Error in OpenAI service:', error);
      throw error;
    }
  }
}

// Types
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
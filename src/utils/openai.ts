// // src/utils/openai.ts
// import OpenAI from 'openai';

// export class OpenAIService {
//   private openai: OpenAI;

//   constructor(apiKey: string) {
//     this.openai = new OpenAI({
//       apiKey: apiKey,
//       dangerouslyAllowBrowser: false // Ensure server-side only
//     });
//   }

//   async analyzeTranscript(transcript: string): Promise<TranscriptAnalysisResult> {
//     try {
//       const completion = await this.openai.chat.completions.create({
//         model: "gpt-4-turbo-preview",
//         messages: [
//           {
//             role: "system",
//             content: `You are a helpful assistant that extracts actionable tasks from meeting transcripts.
//               Please output your response as a valid JSON object with the following structure:
//               {
//                 "tasks": [
//                   {
//                     "title": "Task title",
//                     "description": "Detailed description",
//                     "assignee": "Person name or null",
//                     "priority": "high/medium/low",
//                     "dueDate": "YYYY-MM-DD or null"
//                   }
//                 ],
//                 "summary": "Brief meeting summary"
//               }`
//           },
//           {
//             role: "user",
//             content: `Please analyze this meeting transcript and extract tasks in the specified JSON format: ${transcript}`
//           }
//         ],
//         response_format: { type: "json_object" }
//       });

//       const result = JSON.parse(completion.choices[0].message.content || "{}");
      
//       // Validate the structure
//       if (!result.tasks || !Array.isArray(result.tasks)) {
//         throw new Error("Invalid response structure");
//       }
      
//       return {
//         tasks: result.tasks.map(task => ({
//           title: task.title || '',
//           description: task.description || '',
//           assignee: task.assignee || null,
//           priority: task.priority || 'medium',
//           dueDate: task.dueDate || null
//         })),
//         summary: result.summary || ''
//       };
//     } catch (error) {
//       console.error('Error in OpenAI service:', error);
//       throw error;
//     }
//   }
// }

// // Types
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


// // src/utils/openai.ts
// import { OpenAI } from 'openai';

// export async function extractTasksFromTranscript(transcript: string): Promise<TranscriptTask[]> {
//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
//   });

//   const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       {
//         role: "system",
//         content: "Extract actionable tasks from the meeting transcript. Format as JSON array with fields: title, description, assignee (if mentioned), dueDate (if mentioned), priority (if mentioned)"
//       },
//       {
//         role: "user",
//         content: transcript
//       }
//     ],
//     response_format: { type: "json_object" }
//   });

//   const tasks = JSON.parse(response.choices[0].message.content).tasks;
//   return tasks;
// }


// src/utils/openai.ts
import OpenAI from 'openai';

export async function extractTasksFromTranscript(transcript: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a task extractor. Extract actionable tasks from the meeting transcript.
        Format your response as a JSON string with the following structure:
        {
          "tasks": [
            {
              "title": "Task title",
              "description": "Detailed description",
              "assignee": "Person assigned (if mentioned)",
              "dueDate": "Due date (if mentioned)",
              "priority": "Priority level (if mentioned)"
            }
          ]
        }`
      },
      {
        role: "user",
        content: transcript
      }
    ],
    temperature: 0.7,
    max_tokens: 1500
  });

  try {
    // Extract the JSON string from the response and parse it
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }
    
    // Parse the JSON response
    const parsedContent = JSON.parse(content);
    
    // Validate the response structure
    if (!parsedContent.tasks || !Array.isArray(parsedContent.tasks)) {
      throw new Error('Invalid response structure from OpenAI');
    }
    
    return parsedContent.tasks;
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    throw new Error('Failed to parse tasks from transcript');
  }
}
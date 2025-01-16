// src/utils/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function extractTasksFromTranscript(transcript: string) {
  // Initialize the Google Generative AI with your API key
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  // Get the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Extract actionable tasks from this meeting transcript.
  Format your response exactly as a JSON string with this structure:
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
  }
  Only respond with the JSON, no other text.`;

  try {
    const result = await model.generateContent([
      prompt,
      transcript
    ]);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const parsedContent = JSON.parse(text);
    
    // Validate the response structure
    if (!parsedContent.tasks || !Array.isArray(parsedContent.tasks)) {
      throw new Error('Invalid response structure from Gemini');
    }
    
    return parsedContent.tasks;
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw new Error('Failed to parse tasks from transcript');
  }
}
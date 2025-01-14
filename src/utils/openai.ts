 // src/utils/openai.ts
 import { OpenAI } from 'openai';
  
 export class OpenAIService {
   private openai: OpenAI;
 
   constructor(apiKey: string) {
     this.openai = new OpenAI({ apiKey });
   }
 
   async analyzeTranscript(transcript: string): Promise<TranscriptAnalysisResult> {
     const completion = await this.openai.chat.completions.create({
       model: "gpt-4-turbo-preview",
       messages: [
         {
           role: "system",
           content: "You are a helpful assistant that extracts actionable tasks from meeting transcripts. For each task, identify the title, description, potential assignee, and priority."
         },
         {
           role: "user",
           content: `Please analyze this meeting transcript and extract tasks: ${transcript}`
         }
       ]
     });
 
     // Parse the response into structured tasks
     const result = JSON.parse(completion.choices[0].message.content || "{}");
     return result;
   }
 }
 
 
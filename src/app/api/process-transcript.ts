
  // src/pages/api/process-transcript.ts
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { OpenAIService } from '@/utils/openai';
  import { MondayService } from '@/services/monday';
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { transcript, boardId } = req.body;
  
      // Initialize services
      const openaiService = new OpenAIService(process.env.OPENAI_API_KEY!);
      const mondayService = new MondayService(process.env.MONDAY_API_TOKEN!);
  
      // Analyze transcript
      const analysis = await openaiService.analyzeTranscript(transcript);
  
      // Create tasks in Monday.com
      const createdTasks = await Promise.all(
        analysis.tasks.map(task => mondayService.createTask(boardId, task))
      );
  
      res.status(200).json({ tasks: createdTasks });
    } catch (error) {
      console.error('Error processing transcript:', error);
      res.status(500).json({ message: 'Error processing transcript' });
    }
  }

  // src/pages/api/process-transcript.ts
  import { NextApiRequest, NextApiResponse } from 'next';
  import { extractTasksFromTranscript } from '@/utils/openai';
  import { createMondayTasks } from '@/utils/monday';
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const { transcript, boardId } = req.body;
      const tasks = await extractTasksFromTranscript(transcript);
      await createMondayTasks(tasks, boardId);
      
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing transcript' });
    }
  }
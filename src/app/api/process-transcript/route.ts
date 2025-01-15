// src/app/api/process-transcript/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/utils/openai';
import { MondayService } from '@/services/monday';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, boardId } = body;

    if (!transcript || !boardId) {
      return NextResponse.json(
        { message: 'Missing required fields: transcript and boardId' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.MONDAY_API_TOKEN) {
      return NextResponse.json(
        { message: 'Monday.com API token is not configured' },
        { status: 500 }
      );
    }

    // Initialize services
    const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);
    const mondayService = new MondayService(process.env.MONDAY_API_TOKEN);

    // Analyze transcript
    const analysis = await openaiService.analyzeTranscript(transcript);
    console.log('Analysis result:', analysis); // Debug log

    // Create tasks in Monday.com
    const createdTasks = [];
    for (const task of analysis.tasks) {
      try {
        const result = await mondayService.createTask(boardId, task);
        createdTasks.push(result);
      } catch (error) {
        console.error('Error creating specific task:', error);
        // Continue with other tasks even if one fails
      }
    }

    return NextResponse.json({ 
      success: true,
      tasks: createdTasks 
    });

  } catch (error) {
    console.error('Error processing transcript:', error);
    return NextResponse.json(
      { 
        message: 'Error processing transcript',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
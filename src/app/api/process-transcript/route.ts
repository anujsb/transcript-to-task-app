// // // // src/app/api/process-transcript/route.ts
// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { OpenAIService } from '@/utils/openai';
// // // import { MondayService } from '@/services/monday';

// // // // Force Node.js runtime
// // // export const runtime = 'nodejs';
// // // export const dynamic = 'force-dynamic';

// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const body = await request.json();
// // //     const { transcript, boardId } = body;

// // //     if (!transcript || !boardId) {
// // //       return NextResponse.json(
// // //         { message: 'Missing required fields: transcript and boardId' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     if (!process.env.OPENAI_API_KEY) {
// // //       return NextResponse.json(
// // //         { message: 'OpenAI API key is not configured' },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     if (!process.env.MONDAY_API_TOKEN) {
// // //       return NextResponse.json(
// // //         { message: 'Monday.com API token is not configured' },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     // Initialize services
// // //     const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);
// // //     const mondayService = new MondayService(process.env.MONDAY_API_TOKEN);

// // //     // Analyze transcript
// // //     const analysis = await openaiService.analyzeTranscript(transcript);
// // //     console.log('Analysis result:', analysis); // Debug log

// // //     // Create tasks in Monday.com
// // //     const createdTasks = [];
// // //     for (const task of analysis.tasks) {
// // //       try {
// // //         const result = await mondayService.createTask(boardId, task);
// // //         createdTasks.push(result);
// // //       } catch (error) {
// // //         console.error('Error creating specific task:', error);
// // //         // Continue with other tasks even if one fails
// // //       }
// // //     }

// // //     return NextResponse.json({ 
// // //       success: true,
// // //       tasks: createdTasks 
// // //     });

// // //   } catch (error) {
// // //     console.error('Error processing transcript:', error);
// // //     return NextResponse.json(
// // //       { 
// // //         message: 'Error processing transcript',
// // //         error: error instanceof Error ? error.message : 'Unknown error'
// // //       },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }


// // // src/app/api/process-transcript/route.ts
// // import { NextResponse } from 'next/server';
// // import { extractTasksFromTranscript } from '@/utils/openai';
// // import { createMondayTasks } from '@/utils/monday';

// // export async function POST(request: Request) {
// //   try {
// //     const { transcript, boardId } = await request.json();

// //     if (!transcript || !boardId) {
// //       return NextResponse.json(
// //         { error: 'Transcript and boardId are required' },
// //         { status: 400 }
// //       );
// //     }

// //     const tasks = await extractTasksFromTranscript(transcript);
// //     await createMondayTasks(tasks, boardId);
    
// //     return NextResponse.json({ 
// //       success: true, 
// //       tasks 
// //     });
// //   } catch (error) {
// //     console.error('Error processing transcript:', error);
// //     return NextResponse.json(
// //       { error: 'Error processing transcript' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // Return 405 for other methods
// // export async function GET() {
// //   return NextResponse.json(
// //     { error: 'Method not allowed' },
// //     { status: 405 }
// //   );
// // }

// // export async function PUT() {
// //   return NextResponse.json(
// //     { error: 'Method not allowed' },
// //     { status: 405 }
// //   );
// // }

// // export async function DELETE() {
// //   return NextResponse.json(
// //     { error: 'Method not allowed' },
// //     { status: 405 }
// //   );
// // }


// // src/app/api/process-transcript/route.ts
// import { NextResponse } from 'next/server';
// import { extractTasksFromTranscript } from '@/utils/openai';
// import { createMondayTasks } from '@/utils/monday';

// export async function POST(request: Request) {
//   try {
//     const { transcript, boardId } = await request.json();

//     if (!transcript || !boardId) {
//       return NextResponse.json(
//         { error: 'Transcript and boardId are required' },
//         { status: 400 }
//       );
//     }

//     try {
//       const tasks = await extractTasksFromTranscript(transcript);
      
//       // Only try to create Monday tasks if we successfully extracted tasks
//       if (tasks && tasks.length > 0) {
//         await createMondayTasks(tasks, boardId);
//       }
      
//       return NextResponse.json({ 
//         success: true, 
//         tasks 
//       });
//     } catch (error) {
//       console.error('Error in task processing:', error);
//       return NextResponse.json(
//         { error: error instanceof Error ? error.message : 'Error processing transcript' },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.json(
//       { error: 'Invalid request format' },
//       { status: 400 }
//     );
//   }
// }

// src/app/api/process-transcript/route.ts
import { NextResponse } from 'next/server';
import { extractTasksFromTranscript } from '@/utils/gemini';
import { createMondayTasks } from '@/utils/monday';

export async function POST(request: Request) {
  try {
    const { transcript, boardId } = await request.json();

    if (!transcript || !boardId) {
      return NextResponse.json(
        { error: 'Transcript and boardId are required' },
        { status: 400 }
      );
    }

    try {
      const tasks = await extractTasksFromTranscript(transcript);
      
      // Only try to create Monday tasks if we successfully extracted tasks
      if (tasks && tasks.length > 0) {
        await createMondayTasks(tasks, boardId);
      }
      
      return NextResponse.json({ 
        success: true, 
        tasks 
      });
    } catch (error) {
      console.error('Error in task processing:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Error processing transcript' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
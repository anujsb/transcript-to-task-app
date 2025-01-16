
// // // // // // src/app/api/meetings/[meetingId]/transcript/route.ts
// // // // // import { NextResponse } from 'next/server';
// // // // // import { getServerSession } from 'next-auth';
// // // // // import { getTranscript } from '@/lib/meet-service';

// // // // // export async function GET(
// // // // //   request: Request,
// // // // //   { params }: { params: { meetingId: string } }
// // // // // ) {
// // // // //   const session = await getServerSession();
  
// // // // //   if (!session?.accessToken) {
// // // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // // //   }

// // // // //   try {
// // // // //     const transcript = await getTranscript(
// // // // //       session.accessToken as string,
// // // // //       params.meetingId
// // // // //     );
// // // // //     return NextResponse.json(transcript);
// // // // //   } catch (error) {
// // // // //     console.error('Error getting transcript:', error);
// // // // //     return NextResponse.json(
// // // // //       { error: 'Failed to get transcript' },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }


// // // // import { NextRequest, NextResponse } from 'next/server';
// // // // import { getServerSession } from 'next-auth';
// // // // import { getTranscript } from '@/lib/meet-service';

// // // // export async function GET(
// // // //   request: NextRequest,
// // // //   context: {
// // // //     params: {
// // // //       meetingId: string;
// // // //     };
// // // //   }
// // // // ) {
// // // //   const session = await getServerSession();
  
// // // //   if (!session?.accessToken) {
// // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // //   }

// // // //   try {
// // // //     const transcript = await getTranscript(
// // // //       session.accessToken as string,
// // // //       context.params.meetingId
// // // //     );
// // // //     return NextResponse.json(transcript);
// // // //   } catch (error) {
// // // //     console.error('Error getting transcript:', error);
// // // //     return NextResponse.json(
// // // //       { error: 'Failed to get transcript' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // // // // import { NextRequest, NextResponse } from 'next/server';
// // // // // // // // import { getServerSession } from 'next-auth';
// // // // // // // // import { getTranscript } from '@/lib/meet-service';

// // // // // // // // export async function GET(
// // // // // // // //   request: NextRequest,
// // // // // // // //   { params }: { params: { meetingId: string } }
// // // // // // // // ) {
// // // // // // // //   const session = await getServerSession();
  
// // // // // // // //   if (!session?.accessToken) {
// // // // // // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // // // // // //   }

// // // // // // // //   try {
// // // // // // // //     const transcript = await getTranscript(
// // // // // // // //       session.accessToken as string,
// // // // // // // //       params.meetingId
// // // // // // // //     );
// // // // // // // //     return NextResponse.json(transcript);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Error getting transcript:', error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { error: 'Failed to get transcript' },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { NextRequest } from 'next/server';
// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { getServerSession } from 'next-auth';
// // // // // // // import { getTranscript } from '@/lib/meet-service';

// // // // // // // type Props = {
// // // // // // //   params: {
// // // // // // //     meetingId: string;
// // // // // // //   };
// // // // // // // };

// // // // // // // export async function GET(
// // // // // // //   req: NextRequest,
// // // // // // //   context: Props
// // // // // // // ) {
// // // // // // //   const session = await getServerSession();
  
// // // // // // //   if (!session?.accessToken) {
// // // // // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     const transcript = await getTranscript(
// // // // // // //       session.accessToken as string,
// // // // // // //       context.params.meetingId
// // // // // // //     );
// // // // // // //     return NextResponse.json(transcript);
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error getting transcript:', error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { error: 'Failed to get transcript' },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }


// // // // // // import { NextRequest } from 'next/server';
// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import { getTranscript } from '@/lib/meet-service';

// // // // // // export async function GET(
// // // // // //   request: Request,
// // // // // //   context: { params: Record<string, string | string[]> }
// // // // // // ) {
// // // // // //   const session = await getServerSession();
// // // // // //   const meetingId = context.params.meetingId as string;
  
// // // // // //   if (!session?.accessToken) {
// // // // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // // // //   }

// // // // // //   try {
// // // // // //     const transcript = await getTranscript(
// // // // // //       session.accessToken as string,
// // // // // //       meetingId
// // // // // //     );
// // // // // //     return NextResponse.json(transcript);
// // // // // //   } catch (error) {
// // // // // //     console.error('Error getting transcript:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Failed to get transcript' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // import { NextRequest } from 'next/server';
// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { getServerSession } from 'next-auth';
// // // // // // import { getTranscript } from '@/lib/meet-service';

// // // // // // interface RouteSegment {
// // // // // //   params: {
// // // // // //     meetingId: string;
// // // // // //   };
// // // // // //   searchParams: { [key: string]: string | string[] | undefined };
// // // // // // }

// // // // // // export async function GET(
// // // // // //   request: NextRequest, 
// // // // // //   { params }: RouteSegment
// // // // // // ) {
// // // // // //   const session = await getServerSession();
  
// // // // // //   if (!session?.accessToken) {
// // // // // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // // // // //   }

// // // // // //   try {
// // // // // //     const transcript = await getTranscript(
// // // // // //       session.accessToken as string,
// // // // // //       params.meetingId
// // // // // //     );
// // // // // //     return NextResponse.json(transcript);
// // // // // //   } catch (error) {
// // // // // //     console.error('Error getting transcript:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Failed to get transcript' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }


// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { getServerSession } from 'next-auth';
// // // import { getTranscript } from '@/lib/meet-service';

// // // type Props = {
// // //   params: {
// // //     meetingId: string;
// // //   };
// // // };

// // // export async function GET(
// // //   request: NextRequest,
// // //   { params }: Props
// // // ) {
// // //   const session = await getServerSession();
  
// // //   if (!session?.accessToken) {
// // //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// // //   }

// // //   try {
// // //     const transcript = await getTranscript(
// // //       session.accessToken as string,
// // //       params.meetingId
// // //     );
// // //     return NextResponse.json(transcript);
// // //   } catch (error) {
// // //     console.error('Error getting transcript:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to get transcript' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { getServerSession } from 'next-auth';
// // import { getTranscript } from '@/lib/meet-service';

// // export async function GET(
// //   _request: Request,
// //   context: { params: { meetingId: string } }
// // ) {
// //   const session = await getServerSession();
  
// //   if (!session?.accessToken) {
// //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// //   }

// //   try {
// //     const transcript = await getTranscript(
// //       session.accessToken as string,
// //       context.params.meetingId
// //     );
// //     return NextResponse.json(transcript);
// //   } catch (error) {
// //     console.error('Error getting transcript:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to get transcript' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { getTranscript } from '@/lib/meet-service';

// interface RouteContext {
//   params: {
//     meetingId: string;
//   };
// }

// export async function GET(
//   req: NextRequest,
//   { params }: RouteContext
// ): Promise<NextResponse> {
//   const session = await getServerSession();
  
//   if (!session?.accessToken) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     const transcript = await getTranscript(
//       session.accessToken as string,
//       params.meetingId
//     );
//     return NextResponse.json(transcript);
//   } catch (error) {
//     console.error('Error getting transcript:', error);
//     return NextResponse.json(
//       { error: 'Failed to get transcript' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getTranscript } from '@/lib/meet-service';

export async function GET(
  request: Request
): Promise<NextResponse> {
  const meetingId = request.url.split('/').pop();
  const session = await getServerSession();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const transcript = await getTranscript(
      session.accessToken as string,
      meetingId as string
    );
    return NextResponse.json(transcript);
  } catch (error) {
    console.error('Error getting transcript:', error);
    return NextResponse.json(
      { error: 'Failed to get transcript' },
      { status: 500 }
    );
  }
}
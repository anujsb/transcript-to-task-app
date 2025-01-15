
// // src/app/api/meetings/[meetingId]/transcript/route.ts
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { getTranscript } from '@/lib/meet-service';

// export async function GET(
//   request: Request,
//   { params }: { params: { meetingId: string } }
// ) {
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

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getTranscript } from '@/lib/meet-service';

type RouteContext = {
  params: {
    meetingId: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const session = await getServerSession();

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const transcript = await getTranscript(
      session.accessToken as string,
      context.params.meetingId
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

// https://560b-2401-4900-1c44-cfb5-cd12-9626-5e71-ef51.ngrok-free.app -> https://localhost:3000 
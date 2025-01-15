
// src/app/api/meetings/[meetingId]/transcript/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getTranscript } from '@/lib/meet-service';

export async function GET(
  request: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const transcript = await getTranscript(
      session.accessToken as string,
      params.meetingId
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
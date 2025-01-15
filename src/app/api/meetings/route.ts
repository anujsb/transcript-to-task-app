
// src/app/api/meetings/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createMeeting } from '@/lib/meet-service';

export async function POST() {
  const session = await getServerSession();
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const meeting = await createMeeting(session.accessToken as string);
    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}

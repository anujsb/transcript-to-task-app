'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function MeetingManager() {
  const { data: session } = useSession();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const createMeeting = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
      });
      const meeting = await response.json();
      setMeetings([...meetings, meeting]);
    } catch (error) {
      console.error('Error creating meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTranscript = async (meetingId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/meetings/${meetingId}/transcript`);
      const data = await response.json();
      setTranscript(data);
      setSelectedMeeting(meetingId);
    } catch (error) {
      console.error('Error getting transcript:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div>Please sign in to manage meetings</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={createMeeting}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create New Meeting'}
        </button>
      </div>

      {meetings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Meetings</h2>
          {meetings.map((meeting: any) => (
            <div key={meeting.id} className="p-4 border rounded">
              <h3 className="font-medium">{meeting.title}</h3>
              <p className="text-gray-600">{meeting.joinUrl}</p>
              <button
                onClick={() => getTranscript(meeting.id)}
                className="mt-2 px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                View Transcript
              </button>
            </div>
          ))}
        </div>
      )}

      {transcript && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Meeting Transcript</h2>
          <div className="space-y-2">
            {transcript.entries?.map((entry: any) => (
              <div key={entry.name} className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{entry.speakerInfo.displayName}:</p>
                <p>{entry.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.startTime).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
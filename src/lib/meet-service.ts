// // src/lib/meet-service.ts
// import { google } from 'googleapis';
// import { OAuth2Client } from 'google-auth-library';
// import { calendar_v3 } from 'googleapis';

// export function getOAuthClient() {
//   return new OAuth2Client(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI
//   );
// }

// export async function createMeeting(accessToken: string) {
//   const auth = getOAuthClient();
//   auth.setCredentials({ access_token: accessToken });
  
//   // Use Calendar API instead of Meet API for creating meetings
//   const calendar = google.calendar({ version: 'v3', auth });
  
//   const event = await calendar.events.insert({
//     calendarId: 'primary',
//     conferenceDataVersion: 1,
//     requestBody: {
//       summary: 'New Meeting',
//       start: {
//         dateTime: new Date().toISOString(),
//         timeZone: 'UTC',
//       },
//       end: {
//         dateTime: new Date(Date.now() + 3600000).toISOString(),
//         timeZone: 'UTC',
//       },
//       conferenceData: {
//         createRequest: {
//           requestId: `${Date.now()}`,
//           conferenceSolutionKey: { type: 'hangoutsMeet' },
//         },
//       },
//     },
//   });

//   return {
//     id: event.data.id,
//     meetingUrl: event.data.conferenceData?.entryPoints?.[0]?.uri,
//     startTime: event.data.start?.dateTime,
//     endTime: event.data.end?.dateTime,
//   };
// }

// export async function getTranscript(accessToken: string, meetingId: string) {
//   const auth = getOAuthClient();
//   auth.setCredentials({ access_token: accessToken });
  
//   // Use the correct API endpoint for transcripts
//   const meet = google.meetTranscripts({ version: 'v2', auth });
  
//   const transcript = await meet.conferenceRecords.transcripts.list({
//     parent: `conferenceRecords/${meetingId}`,
//   });

//   return transcript.data;
// }

// src/lib/meet-service.ts
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export function getOAuthClient() {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export async function createMeeting(accessToken: string) {
  const auth = getOAuthClient();
  auth.setCredentials({ access_token: accessToken });
  
  // Use Calendar API to create a meeting
  const calendar = google.calendar({ version: 'v3', auth });
  
  const event = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: 'New Meeting',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(Date.now() + 3600000).toISOString(),
        timeZone: 'UTC',
      },
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  });

  return {
    id: event.data.id,
    meetingUrl: event.data.conferenceData?.entryPoints?.[0]?.uri,
    startTime: event.data.start?.dateTime,
    endTime: event.data.end?.dateTime,
  };
}

// If Meet Transcripts API is unavailable, consider removing the following function
export async function getTranscript(accessToken: string, meetingId: string) {
  throw new Error("Meet Transcripts API is not supported or available.");
}
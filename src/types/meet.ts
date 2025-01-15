// src/types/meet.ts
export interface MeetingTranscript {
    name: string;
    createTime: string;
    languageCode: string;
    entries: TranscriptEntry[];
  }
  
  export interface TranscriptEntry {
    name: string;
    createTime: string;
    startTime: string;
    endTime: string;
    content: string;
    speakerInfo: {
      displayName: string;
    };
  }

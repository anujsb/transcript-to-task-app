// src/app/page.tsx
import { AuthCheck } from '@/components/AuthCheck';
import MeetingManager from '@/components/MeetingManager';

export default function Home() {
  return (
    <AuthCheck fallback={
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Welcome to Meeting Manager</h2>
        <p className="mb-4">Please sign in to manage your meetings and transcripts</p>
      </div>
    }>
      <MeetingManager />
    </AuthCheck>
  );
}
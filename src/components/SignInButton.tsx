// src/components/SignInButton.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-700">
          Signed in as {session.user.email}
        </p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}

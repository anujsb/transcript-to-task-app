
// src/components/AuthCheck.tsx
'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface AuthCheckProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return fallback || <div>Please sign in to access this content</div>;
  }

  return <>{children}</>;
}
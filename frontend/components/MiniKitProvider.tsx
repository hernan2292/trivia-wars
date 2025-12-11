'use client';

import { ReactNode } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  // MiniKit initializes automatically, but we can add configuration here if needed
  // or handle initial checks.
  // For now, it's a wrapper to ensure client-side rendering context if needed.
  // In the future, we might wrap context here.
  
  // Note: MiniKit.install() is typically called in useEffect if not auto-handled,
  // but the library exposes the global object.
  // Let's ensure strict mode compliance.
  
  return <>{children}</>;
}

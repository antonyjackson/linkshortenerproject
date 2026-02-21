'use client';

import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export function SignUpButtonWrapper() {
  return (
    <SignUpButton mode="modal">
      <Button size="lg" className="text-base">
        Get Started Free
      </Button>
    </SignUpButton>
  );
}

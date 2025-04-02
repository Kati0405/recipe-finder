'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='text-sm text-blue-600 hover:underline inline-flex items-center cursor-pointer'
      aria-label='Go back to previous page'
    >
      ← Back
    </button>
  );
}

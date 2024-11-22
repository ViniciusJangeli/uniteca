'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginScreen from '@/app/(pages)/login/page';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/inicio');
    } else {
      router.push('/')
    }
  }, [router]);

  return <LoginScreen />;
}

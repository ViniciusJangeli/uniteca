'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginScreen from '@/app/(pages)/login/page';

export default function Home() {
  const user = false; // Simulando que o usuário não está logado
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  return (
      <LoginScreen/>
  );
}

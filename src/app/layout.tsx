'use client';

import { QueryClient, QueryClientProvider } from "react-query";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { usePathname } from 'next/navigation';  // Importando usePathname

const montserrat = localFont({
  src: "./fonts/Montserrat-Regular.ttf",
  variable: "--font-montserrat",
  weight: "400",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isRootPath = pathname === '/' || pathname === '/login';

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ptBr">
        <Head>
          <title>UniTeca</title>
          <meta name="description" content="Seu Software de Gestão para Bibliotecas!" />
        </Head>
        <body className={`${montserrat.variable} antialiased`}>
          <Toaster position="bottom-center" />
          {!isRootPath && <NavBar />}
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}

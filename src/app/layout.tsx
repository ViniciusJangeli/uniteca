import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const montserrat = localFont({
  src: "./fonts/Montserrat-Regular.ttf",
  variable: "--font-montserrat",
  weight: "400"
})

export const metadata: Metadata = {
  title: "UniTeca",
  description: "Seu Software de Gestão para Bibliotecas!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

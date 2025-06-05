import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Comunidade Ativa',
  description: 'Plataforma de agendamento de saúde.',
  manifest: '/manifest.json', // Link to the manifest file
  themeColor: '#77B5FE',
  icons: {
    icon: [ // For favicons
      { url: 'https://placehold.co/32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://placehold.co/16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [ // For apple-touch-icon
      { url: 'https://placehold.co/180x180.png' },
      { url: 'https://placehold.co/152x152.png', sizes: '152x152' },
      { url: 'https://placehold.co/167x167.png', sizes: '167x167' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Comunidade Ativa" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Com.Ativa" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#77B5FE" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="mask-icon" href="https://placehold.co/512x512.png" color="#77B5FE" />

      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}

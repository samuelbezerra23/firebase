import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Comunidade Ativa',
  description: 'Plataforma de agendamento de saúde.',
  manifest: '/manifest.json', // Link to the manifest file
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
        <meta name="theme-color" content="#77B5FE" />

        {/* Add to home screen for Safari on iOS */}
        <link rel="apple-touch-icon" href="https://placehold.co/180x180.png" data-ai-hint="app icon" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://placehold.co/152x152.png" data-ai-hint="app icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://placehold.co/180x180.png" data-ai-hint="app icon" />
        <link rel="apple-touch-icon" sizes="167x167" href="https://placehold.co/167x167.png" data-ai-hint="app icon" />
        
        {/* Consider adding more specific icons for different resolutions if needed */}
        <link rel="icon" type="image/png" sizes="32x32" href="https://placehold.co/32x32.png" data-ai-hint="favicon" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://placehold.co/16x16.png" data-ai-hint="favicon" />
        
        <link rel="mask-icon" href="https://placehold.co/512x512.png" color="#77B5FE" data-ai-hint="app icon" />

      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}

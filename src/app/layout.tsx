
import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster";
import { PWAInstaller } from '@/components/layout/PWAInstaller'; // Import the new client component

export const metadata: Metadata = {
  title: 'Comunidade Ativa',
  description: 'Plataforma de agendamento de saúde.',
  manifest: '/manifest.json',
  themeColor: '#77B5FE',
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png' },
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#77B5FE' }
    ]
  },
  appleWebApp: {
    capable: true,
    title: "Com.Ativa",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "Comunidade Ativa",
  other: {
    "msapplication-TileColor": "#77B5FE",
    "msapplication-config": "/icons/browserconfig.xml",
    "mobile-web-app-capable": "yes",
    "msapplication-tap-highlight": "no",
  }
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
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <MainLayout>{children}</MainLayout>
        <Toaster />
        <PWAInstaller /> {/* Use the client component here */}
      </body>
    </html>
  );
}

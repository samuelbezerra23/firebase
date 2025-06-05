import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Comunidade Ativa',
  description: 'Plataforma de agendamento de saúde.',
  manifest: '/manifest.json',
  themeColor: '#77B5FE',
  icons: {
    icon: [ // For favicons
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [ // For apple-touch-icon
      { url: '/icons/apple-touch-icon.png' }, // Typically 180x180
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    // other: [ // For other specific icons if needed in metadata
    //   { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#77B5FE' }
    // ]
  },
  appleWebApp: { // Specific meta tags for iOS web apps
    capable: true,
    title: "Com.Ativa",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: "Comunidade Ativa", // Corresponds to <meta name="application-name" ...>
  other: { // For meta tags not directly covered by Next.js's Metadata object
    "msapplication-TileColor": "#77B5FE",
    "msapplication-config": "/icons/browserconfig.xml", // Ensure this file exists and is configured
    "mobile-web-app-capable": "yes", // For older Android browsers
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
        
        {/* Mask icon for Safari pinned tabs - place directly in head if not fully supported by metadata.other yet */}
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#77B5FE" />

        {/* Explicitly setting some meta tags that might not be fully covered or for broader compatibility */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name_APPLE_MOBILE_WEB_APP_TITLE="Com.Ativa" /> {/* This seems like a typo, should be apple-mobile-web-app-title */}
        <meta name="apple-mobile-web-app-title" content="Com.Ativa" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />

      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}

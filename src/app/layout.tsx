
import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Comunidade Ativa',
  description: 'Plataforma de agendamento de saúde.',
  manifest: '/manifest.json',
  themeColor: '#77B5FE', // Cor principal da UI para a barra de status do Android
  icons: {
    icon: [ // Favicons
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [ // Ícones para dispositivos Apple
      { url: '/icons/apple-touch-icon.png' }, // Tamanho padrão (geralmente 180x180)
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-167x167.png', sizes: '167x167' },
    ],
    other: [ // Outros ícones e metadados relacionados a ícones
      { rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg', color: '#77B5FE' }
    ]
  },
  appleWebApp: { // Configurações para Web App em iOS
    capable: true, // Permite que seja adicionado à tela inicial como um app
    title: "Com.Ativa", // Nome que aparece sob o ícone no iOS
    statusBarStyle: "default", // Estilo da barra de status (default, black, black-translucent)
  },
  formatDetection: { // Impede que números de telefone sejam formatados automaticamente como links
    telephone: false,
  },
  applicationName: "Comunidade Ativa", // Nome da aplicação
  other: { // Outras meta tags diversas
    "msapplication-TileColor": "#77B5FE", // Cor do tile no Windows
    "msapplication-config": "/icons/browserconfig.xml", // Configuração para tiles do Windows
    "mobile-web-app-capable": "yes", // Para navegadores Android mais antigos
    "msapplication-tap-highlight": "no", // Remove o destaque de toque no IE Mobile
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

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
      </body>
    </html>
  );
}

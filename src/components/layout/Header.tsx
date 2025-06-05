import Link from 'next/link';
import { Stethoscope, Home, ListChecks } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary hover:text-primary/80 transition-colors">
            <Stethoscope size={32} />
            Comunidade Ativa
          </Link>
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
              <Home size={18} />
              Profissionais
            </Link>
            <Link href="/my-appointments" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">
              <ListChecks size={18} />
              Meus Agendamentos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

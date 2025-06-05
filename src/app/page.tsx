import { ProfessionalList } from '@/components/professionals/ProfessionalList';
import { professionals } from '@/lib/mockData';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  // In a real app, professionals would be fetched from an API
  // For now, we use mock data directly.
  // Add a simple search bar placeholder for UI aesthetics
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">Encontre o Profissional Ideal</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Navegue pela lista de profissionais de saúde qualificados e agende sua consulta.
        </p>
      </div>
      
      {/* Placeholder for a search/filter bar - non-functional for this scope */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Buscar por nome ou especialidade..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            disabled // Non-functional for now
          />
        </div>
      </div>
      
      <ProfessionalList professionals={professionals} />
    </div>
  );
}

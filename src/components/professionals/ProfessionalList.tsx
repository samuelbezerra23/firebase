import type { Professional } from '@/lib/mockData';
import { ProfessionalCard } from './ProfessionalCard';

interface ProfessionalListProps {
  professionals: Professional[];
}

export function ProfessionalList({ professionals }: ProfessionalListProps) {
  if (!professionals || professionals.length === 0) {
    return <p className="text-center text-muted-foreground">Nenhum profissional encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {professionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
}

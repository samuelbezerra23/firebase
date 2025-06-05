
import { getProfessionalById, type Professional } from '@/lib/mockData';
import { SchedulePageClient } from '@/components/professionals/SchedulePageClient';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SchedulePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: SchedulePageProps) {
  const professional = getProfessionalById(params.id);
  if (!professional) {
    return { title: 'Profissional Não Encontrado | Comunidade Ativa' };
  }
  return {
    title: `Agendar com ${professional.name} | Comunidade Ativa`,
    description: `Agende sua consulta com ${professional.name}, ${professional.specialty}, de forma rápida e fácil.`,
  };
}

export default function ScheduleProfessionalPage({ params }: SchedulePageProps) {
  const professional = getProfessionalById(params.id);

  if (!professional) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <Button variant="outline" asChild>
          <Link href={`/professionals/${professional.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Perfil de {professional.name}
          </Link>
        </Button>
      </div>
      <SchedulePageClient professional={professional} />
    </div>
  );
}

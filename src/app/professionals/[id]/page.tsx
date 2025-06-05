import { getProfessionalById, type Professional } from '@/lib/mockData';
import { ProfessionalProfileClient } from '@/components/professionals/ProfessionalProfileClient';
import { notFound } from 'next/navigation';

interface ProfessionalPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProfessionalPageProps) {
  const professional = getProfessionalById(params.id);
  if (!professional) {
    return { title: 'Profissional Não Encontrado' };
  }
  return {
    title: `${professional.name} - ${professional.specialty} | Comunidade Ativa`,
    description: `Veja o perfil de ${professional.name}, ${professional.specialty}, e agende uma consulta.`,
  };
}

export default function ProfessionalPage({ params }: ProfessionalPageProps) {
  const professional = getProfessionalById(params.id);

  if (!professional) {
    notFound();
  }

  return <ProfessionalProfileClient professional={professional} />;
}

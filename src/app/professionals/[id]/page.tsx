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
    title: `Perfil de ${professional.name} - ${professional.specialty} | Comunidade Ativa`,
    description: `Veja o perfil completo de ${professional.name}, ${professional.specialty}, suas experiências e informações de contato.`,
  };
}

export default function ProfessionalPage({ params }: ProfessionalPageProps) {
  const professional = getProfessionalById(params.id);

  if (!professional) {
    notFound();
  }

  return <ProfessionalProfileClient professional={professional} />;
}

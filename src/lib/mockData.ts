import type { LucideIcon } from 'lucide-react';

export interface ProfessionalAvailability {
  day: string;
  timeSlots: string[];
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  description: string;
  experience: string[];
  availability: ProfessionalAvailability[];
  contactInfo: {
    email: string;
    phone: string;
  };
  icon?: LucideIcon; // Optional: for specialty icon
}

export interface Appointment {
  id: string;
  professionalId: string;
  professionalName: string;
  specialty: string;
  date: string; // Store as ISO string or YYYY-MM-DD
  time: string;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Ana Silva',
    specialty: 'Clínica Geral',
    photoUrl: 'https://placehold.co/300x300.png',
    description: 'Médica experiente com foco em cuidados primários e preventivos. Atendimento humanizado e personalizado para todas as idades.',
    experience: [
      'Residência em Clínica Médica na USP',
      '5 anos de experiência em UBS',
      'Pós-graduação em Saúde da Família',
    ],
    availability: [
      { day: 'Segunda-feira', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Quarta-feira', timeSlots: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
      { day: 'Sexta-feira', timeSlots: ['09:00', '10:00', '11:00'] },
    ],
    contactInfo: {
      email: 'ana.silva@email.com',
      phone: '(11) 98765-4321',
    },
  },
  {
    id: '2',
    name: 'Carlos Pereira',
    specialty: 'Fisioterapia',
    photoUrl: 'https://placehold.co/300x300.png',
    description: 'Fisioterapeuta dedicado à reabilitação motora e alívio de dores. Especialista em terapia manual e exercícios terapêuticos.',
    experience: [
      'Graduação em Fisioterapia pela UNIFESP',
      'Especialização em Ortopedia e Traumatologia',
      'Certificação em Pilates Clínico',
      '7 anos de prática clínica',
    ],
    availability: [
      { day: 'Terça-feira', timeSlots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      { day: 'Quinta-feira', timeSlots: ['08:00', '09:00', '13:00', '14:00', '15:00'] },
      { day: 'Sábado', timeSlots: ['09:00', '10:00', '11:00'] },
    ],
    contactInfo: {
      email: 'carlos.pereira@email.com',
      phone: '(11) 91234-5678',
    },
  },
  {
    id: '3',
    name: 'Sofia Oliveira',
    specialty: 'Psicologia',
    photoUrl: 'https://placehold.co/300x300.png',
    description: 'Psicóloga com abordagem Cognitivo-Comportamental. Auxilia no tratamento de ansiedade, depressão e questões de relacionamento.',
    experience: [
      'Mestrado em Psicologia Clínica pela PUC-SP',
      'Formação em Terapia Cognitivo-Comportamental',
      'Experiência com atendimento online e presencial',
      '4 anos de atuação',
    ],
    availability: [
      { day: 'Segunda-feira', timeSlots: ['10:00', '11:00', '15:00', '16:00', '17:00'] },
      { day: 'Quarta-feira', timeSlots: ['10:00', '11:00', '15:00'] },
      { day: 'Sexta-feira', timeSlots: ['15:00', '16:00', '17:00'] },
    ],
    contactInfo: {
      email: 'sofia.oliveira@email.com',
      phone: '(11) 99999-8888',
    },
  },
];

export const appointments: Appointment[] = [
  {
    id: 'appt1',
    professionalId: '1',
    professionalName: 'Dr. Ana Silva',
    specialty: 'Clínica Geral',
    date: '2024-07-15',
    time: '10:00',
    status: 'Confirmado',
  },
  {
    id: 'appt2',
    professionalId: '2',
    professionalName: 'Carlos Pereira',
    specialty: 'Fisioterapia',
    date: '2024-07-18',
    time: '14:00',
    status: 'Pendente',
  },
  {
    id: 'appt3',
    professionalId: '3',
    professionalName: 'Sofia Oliveira',
    specialty: 'Psicologia',
    date: '2024-06-20',
    time: '16:00',
    status: 'Cancelado',
  },
];

export const getProfessionalById = (id: string): Professional | undefined => {
  return professionals.find(p => p.id === id);
};

export const getUserAppointments = (): Appointment[] => {
  // In a real app, this would be filtered by user ID
  return appointments;
};

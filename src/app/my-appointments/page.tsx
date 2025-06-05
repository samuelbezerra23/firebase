import { AppointmentList } from '@/components/appointments/AppointmentList';
import { getUserAppointments } from '@/lib/mockData';

export const metadata = {
  title: 'Meus Agendamentos | Comunidade Ativa',
  description: 'Consulte seus agendamentos de saúde.',
};

export default function MyAppointmentsPage() {
  const userAppointments = getUserAppointments(); 
  // In a real app, this would be fetched based on the logged-in user.

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">Meus Agendamentos</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Acompanhe o status das suas consultas agendadas.
        </p>
      </div>
      <AppointmentList appointments={userAppointments} />
    </div>
  );
}

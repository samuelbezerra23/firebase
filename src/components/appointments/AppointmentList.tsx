import type { Appointment } from '@/lib/mockData';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  if (!appointments || appointments.length === 0) {
    return <p className="text-center text-muted-foreground py-10">Você não possui agendamentos no momento.</p>;
  }

  return (
    <div className="space-y-6">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}

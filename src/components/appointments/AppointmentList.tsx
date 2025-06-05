
import type { Appointment } from '@/lib/mockData';
import { AppointmentCard } from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
  onDeleteAppointment: (appointmentId: string) => void;
  onEditAppointment: (appointmentId: string) => void; // This prop might no longer be needed if Link handles navigation
}

export function AppointmentList({ appointments, onDeleteAppointment }: AppointmentListProps) {
  if (!appointments || appointments.length === 0) {
    return <p className="text-center text-muted-foreground py-10">Você não possui agendamentos no momento.</p>;
  }

  return (
    <div className="space-y-6">
      {appointments.map((appointment) => (
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment}
          onDelete={onDeleteAppointment}
          // onEdit is now handled by the Link component directly in AppointmentCard
        />
      ))}
    </div>
  );
}

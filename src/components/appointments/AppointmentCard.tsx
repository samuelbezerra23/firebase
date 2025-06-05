import type { Appointment } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, Tag, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
}

function formatDate(dateString: string) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', { // Add T00:00:00 to avoid timezone issues if date is just YYYY-MM-DD
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmado':
        return 'default'; // Will use primary color by default for Badge
      case 'Pendente':
        return 'secondary';
      case 'Cancelado':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmado':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pendente':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Cancelado':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-headline text-primary">{appointment.professionalName}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
              <Tag size={14} /> {appointment.specialty}
            </CardDescription>
          </div>
          <Badge variant={getStatusBadgeVariant(appointment.status)} className="flex items-center gap-1 text-xs sm:text-sm">
            {getStatusIcon(appointment.status)}
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-muted-foreground">
          <CalendarDays className="mr-2 h-5 w-5 text-primary/80" />
          <span>Data: {formatDate(appointment.date)}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="mr-2 h-5 w-5 text-primary/80" />
          <span>Horário: {appointment.time}</span>
        </div>
      </CardContent>
    </Card>
  );
}

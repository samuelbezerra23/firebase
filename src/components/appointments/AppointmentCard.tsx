
"use client"; 

import type { Appointment } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarDays, Clock, Tag, CheckCircle, XCircle, AlertTriangle, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link'; 
import React from 'react'; 

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (appointmentId: string) => void;
  // onEdit é tratado pelo Link agora
}

function formatDate(dateString: string) {
  const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function AppointmentCard({ appointment, onDelete }: AppointmentCardProps) {
  const getStatusBadgeVariant = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmado':
        return 'default'; 
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
      <CardFooter className="flex justify-end space-x-2 p-4 pt-0">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/professionals/${appointment.professionalId}/schedule?edit=${appointment.id}`}>
            <Pencil className="mr-1 h-3 w-3" /> Editar
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-1 h-3 w-3" /> Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Você tem certeza que deseja excluir este agendamento com {appointment.professionalName} em {formatDate(appointment.date)} às {appointment.time}? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(appointment.id)}>
                Confirmar Exclusão
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}


"use client"; // This page now needs client-side interactivity

import React, { useState, useEffect, useCallback } from 'react';
import { AppointmentList } from '@/components/appointments/AppointmentList';
import { getUserAppointments, deleteAppointment as deleteAppointmentFromMock, type Appointment } from '@/lib/mockData';
import { useToast } from "@/hooks/use-toast";

// Metadata can still be exported from a client component file in Next.js 13+ App Router
// but it's often cleaner to keep it separate or ensure it's static.
// For simplicity here, we'll keep it.
export const metadata = {
  title: 'Meus Agendamentos | Comunidade Ativa',
  description: 'Consulte e gerencie seus agendamentos de saúde.',
};

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = useCallback(() => {
    setIsLoading(true);
    try {
      // Simulate API call delay if needed or directly get data
      const userAppointments = getUserAppointments();
      setAppointments(userAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      toast({
        title: "Erro ao Carregar Agendamentos",
        description: "Não foi possível buscar seus agendamentos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleDeleteAppointment = useCallback(async (appointmentId: string) => {
    try {
      const success = deleteAppointmentFromMock(appointmentId);
      if (success) {
        setAppointments(prev => prev.filter(app => app.id !== appointmentId));
        toast({
          title: "Agendamento Excluído",
          description: "Seu agendamento foi excluído com sucesso.",
        });
      } else {
        toast({
          title: "Erro ao Excluir",
          description: "Não foi possível encontrar o agendamento para exclusão.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      toast({
        title: "Erro ao Excluir",
        description: "Ocorreu um erro ao tentar excluir o agendamento.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Placeholder for edit functionality navigation
  const handleEditAppointment = useCallback((appointmentId: string) => {
    // Navigation will be handled by Link component in AppointmentCard for now
    console.log("Attempting to edit appointment:", appointmentId);
    // router.push(`/my-appointments/edit/${appointmentId}`); // This would be used if navigation is programmatic here
  }, []);


  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">Meus Agendamentos</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Carregando seus agendamentos...
          </p>
        </div>
        {/* Optional: Add a spinner or skeleton loaders here */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight">Meus Agendamentos</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Acompanhe e gerencie o status das suas consultas agendadas.
        </p>
      </div>
      <AppointmentList 
        appointments={appointments} 
        onDeleteAppointment={handleDeleteAppointment}
        onEditAppointment={handleEditAppointment} // Pass down the handler
      />
    </div>
  );
}

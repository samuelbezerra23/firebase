
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import type { Professional, Appointment } from '@/lib/mockData';
import { addAppointment, updateAppointment, getAppointmentById, type NewAppointmentData } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  professional: Professional;
  editingAppointmentId?: string;
}

export function BookingForm({ professional, editingAppointmentId }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [patientName, setPatientName] = useState<string>(""); // Patient name will still be asked or prefilled if available
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (editingAppointmentId) {
      setIsLoadingAppointment(true);
      const appointmentToEdit = getAppointmentById(editingAppointmentId);
      if (appointmentToEdit) {
        // The date string from mockData needs to be parsed correctly.
        // Appending 'T00:00:00' ensures it's treated as local time.
        const initialDate = new Date(`${appointmentToEdit.date}T00:00:00`);
        setSelectedDate(initialDate);
        setSelectedTime(appointmentToEdit.time);
        // Assuming patient name is not part of Appointment, so it's not prefilled from there.
        // If it were, you'd setPatientName(appointmentToEdit.patientName)
      } else {
        toast({
          title: "Erro ao Carregar Agendamento",
          description: "Não foi possível encontrar os dados do agendamento para edição.",
          variant: "destructive",
        });
      }
      setIsLoadingAppointment(false);
    }
  }, [editingAppointmentId, toast]);

  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' });
      // Ensure consistent formatting for matching with availability keys
      const formattedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).replace('-feira', '-feira');
      const daySchedule = professional.availability.find(a => a.day === formattedDay);
      setAvailableSlots(daySchedule ? daySchedule.timeSlots : []);
      // Reset time if it's not part of an existing appointment being edited or if date changes
      if (!editingAppointmentId || (editingAppointmentId && selectedDate.toISOString().split('T')[0] !== getAppointmentById(editingAppointmentId)?.date)) {
         // Only reset selectedTime if not editing or if the date changed from the original editing appointment
        const appointmentToEdit = editingAppointmentId ? getAppointmentById(editingAppointmentId) : null;
        if (!appointmentToEdit || selectedDate.toISOString().split('T')[0] !== appointmentToEdit.date) {
          setSelectedTime(undefined);
        }
      }
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, professional.availability, editingAppointmentId]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !patientName) {
      toast({
        title: "Erro no Formulário",
        description: "Por favor, preencha nome, data e horário.",
        variant: "destructive",
      });
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];

    if (editingAppointmentId) {
      const success = updateAppointment(editingAppointmentId, {
        date: dateString,
        time: selectedTime,
        // Status will be set to 'Pendente' by updateAppointment if date/time changes
      });
      if (success) {
        toast({
          title: "Agendamento Atualizado!",
          description: `Sua consulta com ${professional.name} foi reagendada para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime} e está pendente de confirmação.`,
          className: "bg-accent text-accent-foreground",
        });
        router.push('/my-appointments');
      } else {
        toast({
          title: "Erro ao Atualizar",
          description: "Não foi possível atualizar o agendamento.",
          variant: "destructive",
        });
      }
    } else {
      const appointmentData: NewAppointmentData = {
        professionalId: professional.id,
        professionalName: professional.name,
        specialty: professional.specialty,
        date: dateString,
        time: selectedTime,
      };
      addAppointment(appointmentData);
      toast({
        title: "Agendamento Solicitado!",
        description: `${patientName}, sua consulta com ${professional.name} em ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime} foi solicitada e está pendente de confirmação.`,
        className: "bg-accent text-accent-foreground",
      });
      router.push('/my-appointments');
    }
    
    // Reset form fields after successful submission for new appointments
    // For edits, we navigate away, so resetting here might not be strictly necessary
    // but good practice if navigation failed or was conditional.
    if (!editingAppointmentId) {
        setSelectedDate(undefined);
        setSelectedTime(undefined);
        setPatientName("");
    }
  };
  
  const today = new Date();
  today.setHours(0,0,0,0);

  if (isLoadingAppointment) {
    return <p>Carregando dados do agendamento...</p>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">
          {editingAppointmentId ? 'Editar Agendamento' : 'Agendar Consulta'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="patientName" className="text-foreground">Seu Nome</Label>
            <Input 
              id="patientName" 
              type="text" 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)} 
              placeholder="Digite seu nome completo" 
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="date-picker" className="text-foreground">Data da Consulta</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mt-1 rounded-md border bg-card"
              disabled={(date) => date < today}
            />
          </div>

          {selectedDate && (
            <div>
              <Label htmlFor="time-slot" className="text-foreground">Horário Disponível</Label>
              {availableSlots.length > 0 ? (
                <Select onValueChange={setSelectedTime} value={selectedTime}>
                  <SelectTrigger id="time-slot" className="w-full mt-1">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Horários para {selectedDate.toLocaleDateString('pt-BR')}</SelectLabel>
                      {availableSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">Nenhum horário disponível para esta data ou profissional não atende neste dia. Por favor, selecione outra data.</p>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
            disabled={!selectedDate || !selectedTime || !patientName || isLoadingAppointment}
          >
            {editingAppointmentId ? 'Confirmar Reagendamento' : 'Solicitar Agendamento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import type { Professional } from '@/lib/mockData';
import { addAppointment, type NewAppointmentData } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export function BookingForm({ professional }: { professional: Professional }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [patientName, setPatientName] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' });
      const formattedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).replace('-feira', '-feira');
      const daySchedule = professional.availability.find(a => a.day === formattedDay);
      setAvailableSlots(daySchedule ? daySchedule.timeSlots : []);
      setSelectedTime(undefined); 
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, professional.availability]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !patientName) {
      toast({
        title: "Erro no Agendamento",
        description: "Por favor, preencha nome, data e horário.",
        variant: "destructive",
      });
      return;
    }

    const appointmentData: NewAppointmentData = {
      professionalId: professional.id,
      professionalName: professional.name,
      specialty: professional.specialty,
      date: selectedDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      time: selectedTime,
    };

    try {
      addAppointment(appointmentData);
      toast({
        title: "Agendamento Solicitado!",
        description: `${patientName}, sua consulta com ${professional.name} em ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime} foi solicitada e está pendente de confirmação.`,
        className: "bg-accent text-accent-foreground",
      });
      
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setPatientName("");
      
      // Optionally navigate to "My Appointments" page
      router.push('/my-appointments');

    } catch (error) {
      console.error("Failed to add appointment:", error);
      toast({
        title: "Erro no Servidor",
        description: "Não foi possível salvar o agendamento. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };
  
  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Agendar Consulta</CardTitle>
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
              disabled={(date) => date < today} // Disable past dates
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
                <p className="mt-1 text-sm text-muted-foreground">Nenhum horário disponível para esta data. Por favor, selecione outra data.</p>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
            disabled={!selectedDate || !selectedTime || !patientName}
          >
            Solicitar Agendamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

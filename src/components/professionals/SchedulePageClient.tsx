"use client";

import Image from 'next/image';
import type { Professional } from '@/lib/mockData';
import { BookingForm } from '@/components/appointments/BookingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface SchedulePageClientProps {
  professional: Professional;
}

export function SchedulePageClient({ professional }: SchedulePageClientProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 space-y-6">
        <Card className="shadow-lg sticky top-24"> {/* Added sticky top for better UX on scroll */}
          <CardHeader className="items-center text-center p-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-md mb-4">
              <Image
                src={professional.photoUrl}
                alt={professional.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint="professional portrait"
              />
            </div>
            <CardTitle className="text-2xl font-bold font-headline text-primary">{professional.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">{professional.specialty}</Badge>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <h3 className="text-lg font-semibold font-headline text-foreground mb-3 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Horários de Atendimento
            </h3>
            {professional.availability.length > 0 ? (
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {professional.availability.map(avail => (
                  <li key={avail.day}>
                    <strong>{avail.day}:</strong> {avail.timeSlots.join(', ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Este profissional não possui horários cadastrados no momento.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <BookingForm professional={professional} />
      </div>
    </div>
  );
}

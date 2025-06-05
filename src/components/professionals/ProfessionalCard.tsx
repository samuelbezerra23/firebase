import Link from 'next/link';
import Image from 'next/image';
import type { Professional } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarCheck } from 'lucide-react';

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={professional.photoUrl}
            alt={professional.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="person avatar"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline mb-2 text-primary">{professional.name}</CardTitle>
        <Badge variant="secondary" className="mb-3">{professional.specialty}</Badge>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {professional.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/professionals/${professional.id}`}>
            Ver Perfil
          </Link>
        </Button>
        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={`/professionals/${professional.id}/schedule`}>
            Agendar
            <CalendarCheck className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Professional } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, Info, UserCircle, Briefcase, CalendarCheck } from 'lucide-react';

interface ProfessionalProfileClientProps {
  professional: Professional;
}

export function ProfessionalProfileClient({ professional }: ProfessionalProfileClientProps) {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="p-0">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-card shadow-md">
              <Image
                src={professional.photoUrl} 
                alt={professional.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint="professional portrait"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{professional.name}</h1>
              <Badge variant="default" className="mt-2 text-lg bg-primary/80 text-primary-foreground">{professional.specialty}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="about" className="text-sm md:text-base">
                <UserCircle className="mr-2 h-4 w-4" /> Sobre
              </TabsTrigger>
               <TabsTrigger value="contact" className="text-sm md:text-base">
                <Mail className="mr-2 h-4 w-4" /> Contato
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold font-headline text-foreground flex items-center">
                  <Info className="mr-2 h-5 w-5 text-primary" /> Descrição
                </h3>
                <p className="text-muted-foreground">{professional.description}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold font-headline text-foreground flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" /> Experiência
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {professional.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <h3 className="text-xl font-semibold font-headline text-foreground">Informações de Contato</h3>
               <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${professional.contactInfo.email}`} className="hover:text-primary">{professional.contactInfo.email}</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>{professional.contactInfo.phone}</span>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`/professionals/${professional.id}/schedule`}>
                Agendar Consulta com {professional.name}
                <CalendarCheck className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

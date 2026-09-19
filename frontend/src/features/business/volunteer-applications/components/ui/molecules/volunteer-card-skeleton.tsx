import { Card, CardContent } from "@/app/(web)/_components/molecules/card/card";
import { Skeleton } from "@mantine/core";

export function VolunteerCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-primary/10 bg-white">
      <CardContent className="flex h-full flex-col gap-6 p-6 md:p-8">
        {/* Título y subtítulo */}
        <div className="space-y-2">
          <Skeleton height={26} width="70%" radius="sm" />
          <Skeleton height={14} width="40%" radius="sm" />
        </div>

        {/* Descripción y requisitos */}
        <div className="space-y-3 border-t border-border/50 pt-5">
          <Skeleton height={10} width="30%" radius="sm" />
          <Skeleton height={12} radius="sm" />
          <Skeleton height={12} width="90%" radius="sm" />

          <Skeleton height={10} width="30%" radius="sm" className="mt-3" />
          <Skeleton height={12} radius="sm" />
          <Skeleton height={12} width="80%" radius="sm" />
        </div>

        {/* Rango de edad */}
        <Skeleton height={56} radius="md" />

        {/* Ubicación */}
        <div className="space-y-2">
          <Skeleton height={10} width="25%" radius="sm" />
          <Skeleton height={12} width="95%" radius="sm" />
          <Skeleton height={14} width="50%" radius="sm" />
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-3">
          <Skeleton height={52} radius="md" />
          <Skeleton height={52} radius="md" />
        </div>

        {/* Contacto */}
        <div className="space-y-2">
          <Skeleton height={10} width="25%" radius="sm" />
          <Skeleton height={14} width="70%" radius="sm" />
          <Skeleton height={14} width="50%" radius="sm" />
        </div>

        {/* Pie */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-5">
          <Skeleton height={28} width={140} radius="xl" />
          <Skeleton height={28} width={90} radius="xl" />
        </div>
      </CardContent>
    </Card>
  );
}

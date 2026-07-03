
import Title from "../../atoms/title";
import Button from "../../atoms/button/button";
import { PetCard } from "../../atoms/card/pet-card-item";
import { usePetSearch } from "@/core/application/hooks/pet/usePetSearch";
import Container from "@/components/atoms/container";

export default function PetsSection() {
  const { filteredPets } = usePetSearch();

  return (
    <section className="w-full py-10 pt-20 bg-gray-50">
      <Container>
        <Title htmlTag="h2" className="text-center mb-5 text-slate-800">
          Nuestras Mascotas{" "}
          <span className="text-primary">Esperando un Hogar</span>
        </Title>
        <p className="text-gray-500 text-center text-lg">
          Conoce a los adorables compañeros que están listos para cambiar sus
          vidas. Cada uno tiene una historia única y mucho amor para dar.
        </p>

        <div className="mt-10">
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} {...pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                No encontramos mascotas
              </h3>
              <p className="text-lg text-foreground/70 max-w-md mx-auto">
                Intenta con otros criterios de búsqueda o filtros
              </p>
              <Button href="/mascotas">
                Ver todas las mascotas
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

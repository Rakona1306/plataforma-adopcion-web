"use client";

import { useState } from "react";
import { Badge } from "../../atoms/badge/badge";
import { Card, CardContent } from "./card";
import { BiHeart, BiMessageSquare } from "react-icons/bi";
import Button from "../../atoms/button/button";

interface PetCardProps {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  image: string;
  description: string;
  gender: string;
  vaccinated: boolean;
}

export function PetCard({
  name,
  type,
  breed,
  age,
  description,
  gender,
  vaccinated,
}: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-primary/20">
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
          {type === "Perro" ? "🐶" : "🐱"}
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all"
        >
          <BiHeart
            className={`w-5 h-5 transition-colors ${
              isFavorite
                ? "fill-primary text-primary"
                : "text-foreground/40 hover:text-primary"
            }`}
          />
        </button>
        <div className="absolute top-3 left-3 flex gap-2">
          {vaccinated && (
            <Badge className="bg-green-500/90 hover:bg-green-600">
              Vacunado
            </Badge>
          )}
          <Badge className="bg-primary/90 hover:bg-primary">
            {gender === "M" ? "♂️ Macho" : "♀️ Hembra"}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-1 p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-foreground/60">
            {breed} • {age}
          </p>
        </div>

        <p className="text-sm text-foreground/70 line-clamp-2">{description}</p>

        <div className="flex gap-2 pt-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
            Adoptar
          </Button>
          <Button className="flex-1 border-primary/30">
            <BiMessageSquare className="w-4 h-4" />
            Padrino
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

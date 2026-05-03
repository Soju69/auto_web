import type { Car } from "@/types/car";
import { CarCard } from "@/components/cars/CarCard";

type CarGridProps = {
  cars: Car[];
};

export function CarGrid({ cars }: CarGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} priority={index < 3} />
      ))}
    </div>
  );
}

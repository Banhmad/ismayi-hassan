import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  price: string;
  location: string;
}

interface FeaturedServicesProps {
  services?: ServiceItem[];
}

const FeaturedServices = ({
  services = defaultServices,
}: FeaturedServicesProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Services</h2>
        <a href="#" className="text-primary hover:underline">
          View All
        </a>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {services.map((service) => (
            <CarouselItem
              key={service.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary">
                    {service.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {service.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < service.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {service.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">
                      {service.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {service.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 lg:-left-6" />
        <CarouselNext className="-right-4 lg:-right-6" />
      </Carousel>
    </div>
  );
};

const defaultServices: ServiceItem[] = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    category: "Accommodation",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    rating: 4.8,
    price: "$250/night",
    location: "Miami, FL",
  },
  {
    id: "2",
    title: "Gourmet Italian Restaurant",
    category: "Restaurant",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    rating: 4.5,
    price: "$$",
    location: "New York, NY",
  },
  {
    id: "3",
    title: "Professional Home Cleaning",
    category: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    rating: 4.7,
    price: "$80/hr",
    location: "Chicago, IL",
  },
  {
    id: "4",
    title: "Airport Luxury Transfer",
    category: "Transportation",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    rating: 4.6,
    price: "$75",
    location: "Los Angeles, CA",
  },
  {
    id: "5",
    title: "Boutique Fashion Store",
    category: "Retail",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    rating: 4.4,
    price: "$$$",
    location: "San Francisco, CA",
  },
  {
    id: "6",
    title: "Real Estate Investment Opportunity",
    category: "Investment",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    rating: 4.9,
    price: "$$$$$",
    location: "Austin, TX",
  },
];

export default FeaturedServices;

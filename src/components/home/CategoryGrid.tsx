import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Building2,
  ShoppingBag,
  Utensils,
  Wrench,
  Car,
  TrendingUp,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  link?: string;
}

interface CategoryGridProps {
  categories?: CategoryItem[];
  onCategorySelect?: (categoryId: string) => void;
}

const CategoryGrid = ({
  categories = [
    {
      id: "accommodation",
      name: "Accommodation",
      icon: <Building2 className="h-10 w-10" />,
      description: "Find hotels, apartments, and vacation rentals",
      link: "/accommodation",
    },
    {
      id: "retail",
      name: "Retail",
      icon: <ShoppingBag className="h-10 w-10" />,
      description: "Shop from local and global retailers",
      link: "/retail",
    },
    {
      id: "grocery",
      name: "Grocery",
      icon: <ShoppingBag className="h-10 w-10" />,
      description: "Order groceries and household essentials",
      link: "/grocery",
    },
    {
      id: "restaurants",
      name: "Restaurants",
      icon: <Utensils className="h-10 w-10" />,
      description: "Discover dining options and food delivery",
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: <Car className="h-10 w-10" />,
      description: "Book rides, rentals, and delivery services",
      link: "/transportation",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      icon: <Wrench className="h-10 w-10" />,
      description: "Home repairs and professional services",
      link: "/maintenance",
    },
  ],
  onCategorySelect = () => {},
}: CategoryGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Browse Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            onClick={() => {
              onCategorySelect(category.id);
              if (category.link) {
                window.location.href = category.link;
              }
            }}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

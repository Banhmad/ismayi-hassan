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
  Plane,
  Home,
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
      name: "خدمات إقامة",
      icon: <Building2 className="h-10 w-10" />,
      description: "فنادق، شقق، وإيجارات عطلات",
      link: "/accommodation",
    },
    {
      id: "retail",
      name: "خدمات تجارية",
      icon: <ShoppingBag className="h-10 w-10" />,
      description: "تسوق من المتاجر المحلية والعالمية",
      link: "/retail",
    },
    {
      id: "restaurants",
      name: "خدمات مطاعم",
      icon: <Utensils className="h-10 w-10" />,
      description: "اكتشف خيارات الطعام وخدمات التوصيل",
      link: "/restaurants",
    },
    {
      id: "maintenance",
      name: "خدمات صيانة",
      icon: <Wrench className="h-10 w-10" />,
      description: "إصلاحات منزلية وخدمات مهنية",
      link: "/maintenance",
    },
    {
      id: "transportation",
      name: "خدمات توصيل ونقل",
      icon: <Car className="h-10 w-10" />,
      description: "حجز رحلات، تأجير، وخدمات توصيل",
      link: "/transportation",
    },
    {
      id: "travel",
      name: "خدمات سفر",
      icon: <Plane className="h-10 w-10" />,
      description: "حجز رحلات طيران وفنادق",
      link: "/travel",
    },
    {
      id: "investment",
      name: "خدمات استثمارية",
      icon: <TrendingUp className="h-10 w-10" />,
      description: "فرص استثمارية وخدمات مالية",
      link: "/investment",
    },
  ],
  onCategorySelect = () => {},
}: CategoryGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="mb-2 p-3 rounded-full bg-primary/10 text-primary">
                {category.icon}
              </div>
              <h3 className="text-base font-semibold">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

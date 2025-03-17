import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  image: string;
  rating: number;
  price: number;
  location?: string;
  type:
    | "accommodation"
    | "retail"
    | "restaurant"
    | "maintenance"
    | "transportation"
    | "investment";
}

// بيانات وهمية للخدمات المميزة من كل قسم
const topRatedServices: ServiceItem[] = [
  {
    id: "acc1",
    title: "فندق القصر الملكي",
    category: "إقامة",
    categoryId: "accommodation",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    rating: 4.9,
    price: 750,
    location: "الرياض",
    type: "accommodation",
  },
  {
    id: "acc2",
    title: "فيلا الواحة الفاخرة",
    category: "إقامة",
    categoryId: "accommodation",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    rating: 4.8,
    price: 1200,
    location: "جدة",
    type: "accommodation",
  },
  {
    id: "ret1",
    title: "متجر التكنولوجيا الحديثة",
    category: "تجزئة",
    categoryId: "retail",
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80",
    rating: 4.7,
    price: 0,
    type: "retail",
  },
  {
    id: "res1",
    title: "مطعم الأصالة العربية",
    category: "مطاعم",
    categoryId: "restaurant",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    rating: 4.8,
    price: 0,
    location: "الرياض",
    type: "restaurant",
  },
  {
    id: "main1",
    title: "خدمات الصيانة المنزلية",
    category: "صيانة",
    categoryId: "maintenance",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    rating: 4.9,
    price: 0,
    type: "maintenance",
  },
  {
    id: "trans1",
    title: "سيارة فاخرة للإيجار",
    category: "نقل",
    categoryId: "transportation",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    rating: 4.6,
    price: 350,
    type: "transportation",
  },
  {
    id: "trans2",
    title: "خدمة توصيل سريعة",
    category: "نقل",
    categoryId: "transportation",
    image:
      "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=800&q=80",
    rating: 4.7,
    price: 0,
    type: "transportation",
  },
  {
    id: "inv1",
    title: "فرصة استثمارية عقارية",
    category: "استثمار",
    categoryId: "investment",
    image:
      "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80",
    rating: 4.8,
    price: 500000,
    type: "investment",
  },
];

const ServiceCarousel = () => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // تغيير الخدمة المعروضة كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % topRatedServices.length,
        );
        setIsAnimating(false);
      }, 500); // مدة الانتقال
    }, 5000); // مدة العرض

    return () => clearInterval(interval);
  }, []);

  const service = topRatedServices[currentIndex];

  // تنسيق السعر حسب نوع الخدمة
  const formatPrice = (service: ServiceItem) => {
    if (service.price === 0) return "";

    switch (service.type) {
      case "accommodation":
        return `${service.price} ر.س / ليلة`;
      case "transportation":
        return service.title.includes("سيارة")
          ? `${service.price} ر.س / يوم`
          : "";
      case "investment":
        return `${service.price.toLocaleString()} ر.س`;
      default:
        return `${service.price} ر.س`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("topRatedServices") || "الخدمات الأعلى تقييماً"}
      </h2>

      <div className="relative overflow-hidden rounded-lg shadow-md">
        <div
          className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        >
          <div className="relative h-64 md:h-80">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Badge className="mb-2 bg-primary">{service.category}</Badge>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {service.title}
                  </h3>
                  {service.location && (
                    <p className="text-sm opacity-90">{service.location}</p>
                  )}
                </div>
                <div className="flex items-center bg-black/30 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-bold">{service.rating}</span>
                </div>
              </div>

              {formatPrice(service) && (
                <p className="text-lg font-bold">{formatPrice(service)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {topRatedServices.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;

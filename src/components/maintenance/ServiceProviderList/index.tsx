import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Clock,
  Calendar,
  Wrench,
  Hammer,
  Paintbrush,
  Plug,
  Droplet,
  Thermometer,
  Truck,
  Construction,
  Scissors,
  Zap,
  Home,
  ChevronLeft,
  Phone,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  distance: number; // in km
  location: string;
  services: string[];
  hourlyRate: number;
  experience: number; // in years
  availability: string[];
  verified: boolean;
  description: string;
}

interface CategoryInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const categories: Record<string, CategoryInfo> = {
  plumbing: {
    id: "plumbing",
    name: "السباكة",
    icon: <Droplet className="h-8 w-8" />,
    description:
      "إصلاح تسربات المياه، تركيب وصيانة الأنابيب والصنابير والأحواض",
  },
  electrical: {
    id: "electrical",
    name: "الكهرباء",
    icon: <Zap className="h-8 w-8" />,
    description:
      "تركيب وإصلاح الأنظمة الكهربائية، الإضاءة، والأجهزة الكهربائية",
  },
  carpentry: {
    id: "carpentry",
    name: "النجارة",
    icon: <Hammer className="h-8 w-8" />,
    description: "تصنيع وإصلاح الأثاث الخشبي، تركيب الأبواب والنوافذ",
  },
  painting: {
    id: "painting",
    name: "الدهان",
    icon: <Paintbrush className="h-8 w-8" />,
    description: "طلاء المنازل والمباني، إصلاح الجدران، ديكورات داخلية",
  },
  hvac: {
    id: "hvac",
    name: "التكييف والتبريد",
    icon: <Thermometer className="h-8 w-8" />,
    description: "تركيب وصيانة أنظمة التكييف والتدفئة والتهوية",
  },
  appliances: {
    id: "appliances",
    name: "صيانة الأجهزة المنزلية",
    icon: <Plug className="h-8 w-8" />,
    description: "إصلاح وصيانة الأجهزة المنزلية مثل الثلاجات والغسالات",
  },
  cleaning: {
    id: "cleaning",
    name: "خدمات التنظيف",
    icon: <Home className="h-8 w-8" />,
    description:
      "تنظيف المنازل والمكاتب، تنظيف السجاد والمفروشات، تنظيف النوافذ",
  },
  gardening: {
    id: "gardening",
    name: "تنسيق الحدائق",
    icon: <Scissors className="h-8 w-8" />,
    description: "تصميم وتنسيق الحدائق، قص الأشجار، تركيب أنظمة الري",
  },
  construction: {
    id: "construction",
    name: "البناء والترميم",
    icon: <Construction className="h-8 w-8" />,
    description: "أعمال البناء، الترميم، تجديد المنازل، أعمال الهدم",
  },
  moving: {
    id: "moving",
    name: "خدمات النقل",
    icon: <Truck className="h-8 w-8" />,
    description: "نقل الأثاث والمعدات، فك وتركيب الأثاث، التخزين",
  },
  general: {
    id: "general",
    name: "صيانة عامة",
    icon: <Wrench className="h-8 w-8" />,
    description: "خدمات الصيانة العامة للمنازل والمباني التجارية",
  },
};

// Mock service providers for each category
const mockServiceProviders: Record<string, ServiceProvider[]> = {
  plumbing: [
    {
      id: "p1",
      name: "أحمد محمد",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      rating: 4.8,
      reviewCount: 124,
      distance: 2.5,
      location: "الرياض، حي النزهة",
      services: ["إصلاح تسربات", "تركيب صنابير", "تسليك مجاري", "تركيب سخانات"],
      hourlyRate: 80,
      experience: 8,
      availability: ["اليوم", "غداً", "بعد غد"],
      verified: true,
      description:
        "فني سباكة محترف مع خبرة 8 سنوات في جميع أعمال السباكة المنزلية والتجارية. متخصص في إصلاح التسربات وتركيب الأدوات الصحية.",
    },
    {
      id: "p2",
      name: "خالد العتيبي",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
      rating: 4.6,
      reviewCount: 98,
      distance: 3.8,
      location: "الرياض، حي الملز",
      services: [
        "صيانة خزانات المياه",
        "تركيب مضخات",
        "إصلاح تسربات",
        "تمديدات مياه",
      ],
      hourlyRate: 75,
      experience: 6,
      availability: ["غداً", "بعد غد"],
      verified: true,
      description:
        "فني سباكة متخصص في صيانة خزانات المياه وتركيب المضخات. أقدم خدمات عالية الجودة بأسعار منافسة.",
    },
    {
      id: "p3",
      name: "محمد السالم",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
      rating: 4.9,
      reviewCount: 156,
      distance: 1.2,
      location: "الرياض، حي العليا",
      services: [
        "تركيب أدوات صحية",
        "صيانة حمامات",
        "تركيب سخانات",
        "إصلاح تسربات",
      ],
      hourlyRate: 90,
      experience: 12,
      availability: ["اليوم", "غداً"],
      verified: true,
      description:
        "فني سباكة ذو خبرة 12 عاماً في مجال السباكة. متخصص في تركيب وصيانة الأدوات الصحية بجودة عالية وضمان على جميع الأعمال.",
    },
  ],
  electrical: [
    {
      id: "e1",
      name: "سعد الشمري",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saad",
      rating: 4.7,
      reviewCount: 112,
      distance: 3.1,
      location: "الرياض، حي الروضة",
      services: [
        "تمديدات كهربائية",
        "إصلاح أعطال",
        "تركيب إضاءة",
        "صيانة لوحات كهرباء",
      ],
      hourlyRate: 85,
      experience: 9,
      availability: ["اليوم", "غداً", "بعد غد"],
      verified: true,
      description:
        "كهربائي محترف مع خبرة 9 سنوات في التمديدات الكهربائية وإصلاح الأعطال. حاصل على شهادات معتمدة في السلامة الكهربائية.",
    },
    {
      id: "e2",
      name: "فهد القحطاني",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad",
      rating: 4.5,
      reviewCount: 87,
      distance: 4.2,
      location: "الرياض، حي الملك فهد",
      services: [
        "تركيب أنظمة أمان",
        "كاميرات مراقبة",
        "صيانة مولدات",
        "تمديدات كهربائية",
      ],
      hourlyRate: 90,
      experience: 7,
      availability: ["غداً", "بعد غد"],
      verified: true,
      description:
        "كهربائي متخصص في تركيب أنظمة الأمان وكاميرات المراقبة. أقدم خدمات احترافية للمنازل والشركات بأحدث التقنيات.",
    },
  ],
  hvac: [
    {
      id: "h1",
      name: "عبدالله الحربي",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
      rating: 4.8,
      reviewCount: 132,
      distance: 2.8,
      location: "الرياض، حي الياسمين",
      services: ["تركيب مكيفات", "صيانة دورية", "إصلاح أعطال", "تنظيف وتعقيم"],
      hourlyRate: 95,
      experience: 10,
      availability: ["اليوم", "غداً"],
      verified: true,
      description:
        "فني تكييف وتبريد محترف مع خبرة 10 سنوات. متخصص في تركيب وصيانة جميع أنواع المكيفات السبليت والمركزية.",
    },
  ],
};

// Generate mock providers for other categories
Object.keys(categories).forEach((categoryId) => {
  if (!mockServiceProviders[categoryId]) {
    mockServiceProviders[categoryId] = [
      {
        id: `${categoryId}1`,
        name: "فني محترف",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${categoryId}1`,
        rating: 4.5 + Math.random() * 0.4,
        reviewCount: 50 + Math.floor(Math.random() * 100),
        distance: 1 + Math.random() * 5,
        location: "الرياض، المملكة العربية السعودية",
        services: ["خدمة 1", "خدمة 2", "خدمة 3"],
        hourlyRate: 70 + Math.floor(Math.random() * 30),
        experience: 3 + Math.floor(Math.random() * 10),
        availability: ["اليوم", "غداً", "بعد غد"],
        verified: true,
        description: `فني محترف في مجال ${categories[categoryId].name} مع خبرة عملية. يقدم خدمات عالية الجودة بأسعار منافسة.`,
      },
      {
        id: `${categoryId}2`,
        name: "شركة الخدمات المتكاملة",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${categoryId}2`,
        rating: 4.5 + Math.random() * 0.4,
        reviewCount: 50 + Math.floor(Math.random() * 100),
        distance: 1 + Math.random() * 5,
        location: "الرياض، المملكة العربية السعودية",
        services: ["خدمة 1", "خدمة 2", "خدمة 3", "خدمة 4"],
        hourlyRate: 80 + Math.floor(Math.random() * 40),
        experience: 5 + Math.floor(Math.random() * 10),
        availability: ["غداً", "بعد غد"],
        verified: true,
        description: `شركة متخصصة في خدمات ${categories[categoryId].name} مع فريق من الفنيين المحترفين. نقدم خدمات شاملة للمنازل والشركات.`,
      },
    ];
  }
});

const ServiceProviderList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [searchTerm, setSearchTerm] = useState("");
  const [distanceRange, setDistanceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<
    Record<string, boolean>
  >({
    today: false,
    tomorrow: false,
    dayAfter: false,
  });
  const [minRating, setMinRating] = useState(0);

  // Get category info
  const category = categories[categoryId || "general"] || categories["general"];

  // Get service providers for this category
  const providers = mockServiceProviders[categoryId || "general"] || [];

  // Filter providers based on search term, distance, availability, and rating
  const filteredProviders = providers.filter((provider) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    // Filter by distance
    const matchesDistance =
      provider.distance >= distanceRange[0] &&
      provider.distance <= distanceRange[1];

    // Filter by availability
    const matchesAvailability =
      (!availabilityFilter.today &&
        !availabilityFilter.tomorrow &&
        !availabilityFilter.dayAfter) ||
      (availabilityFilter.today && provider.availability.includes("اليوم")) ||
      (availabilityFilter.tomorrow && provider.availability.includes("غداً")) ||
      (availabilityFilter.dayAfter && provider.availability.includes("بعد غد"));

    // Filter by rating
    const matchesRating = provider.rating >= minRating;

    return (
      matchesSearch && matchesDistance && matchesAvailability && matchesRating
    );
  });

  // Sort providers by distance
  const sortedProviders = [...filteredProviders].sort(
    (a, b) => a.distance - b.distance,
  );

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      {/* Category Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => (window.location.href = "/maintenance")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("back") || "رجوع"}
        </Button>
        <div className="p-3 rounded-full bg-primary/10 text-primary mr-3">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
            />
            <Input
              type="text"
              placeholder={t("searchProviders") || "ابحث عن فنيين أو خدمات..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={isRtl ? "pr-9" : "pl-9"}
            />
          </div>

          <div className="relative w-full md:w-[200px]">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
            />
            <Input
              type="text"
              placeholder={t("location") || "الموقع"}
              className={isRtl ? "pr-9" : "pl-9"}
            />
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {t("filter") || "تصفية"}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">
                  {t("distance") || "المسافة"}
                </h3>
                <div className="px-3">
                  <Slider
                    defaultValue={[0, 10]}
                    max={20}
                    step={0.5}
                    value={distanceRange}
                    onValueChange={setDistanceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      {distanceRange[0]} {t("km") || "كم"}
                    </span>
                    <span>
                      {distanceRange[1]} {t("km") || "كم"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t("availability") || "التوفر"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="today"
                      checked={availabilityFilter.today}
                      onCheckedChange={(checked) =>
                        setAvailabilityFilter((prev) => ({
                          ...prev,
                          today: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="today">{t("today") || "اليوم"}</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="tomorrow"
                      checked={availabilityFilter.tomorrow}
                      onCheckedChange={(checked) =>
                        setAvailabilityFilter((prev) => ({
                          ...prev,
                          tomorrow: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="tomorrow">{t("tomorrow") || "غداً"}</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="dayAfter"
                      checked={availabilityFilter.dayAfter}
                      onCheckedChange={(checked) =>
                        setAvailabilityFilter((prev) => ({
                          ...prev,
                          dayAfter: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="dayAfter">
                      {t("dayAfter") || "بعد غد"}
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t("minimumRating") || "الحد الأدنى للتقييم"}
                </h3>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={(checked) => {
                          if (checked) setMinRating(rating);
                          else if (minRating === rating) setMinRating(0);
                        }}
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center"
                      >
                        <span className="mr-1">{rating}+</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${i === Math.floor(rating) && rating % 1 > 0 ? "text-yellow-400 fill-yellow-400" : ""}`}
                            />
                          ))}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => {
                  setSearchTerm("");
                  setDistanceRange([0, 10]);
                  setAvailabilityFilter({
                    today: false,
                    tomorrow: false,
                    dayAfter: false,
                  });
                  setMinRating(0);
                }}
              >
                {t("resetFilters") || "إعادة ضبط"}
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90">
                {t("applyFilters") || "تطبيق"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Service Providers List */}
      <div className="space-y-6">
        {sortedProviders.length > 0 ? (
          sortedProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Provider Info */}
                  <div className="md:w-3/4 mb-4 md:mb-0 md:pr-6">
                    <div className="flex items-start">
                      <div className="relative mr-4">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-16 h-16 rounded-full"
                        />
                        {provider.verified && (
                          <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold">
                            {provider.name}
                          </h3>
                          {provider.verified && (
                            <Badge className="mr-2 bg-green-100 text-green-800 border-green-200">
                              {t("verified") || "موثق"}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="mr-1 font-medium">
                              {provider.rating.toFixed(1)}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              ({provider.reviewCount} {t("reviews") || "تقييم"})
                            </span>
                          </div>
                          <Separator
                            orientation="vertical"
                            className="mx-2 h-4"
                          />
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              {provider.distance.toFixed(1)} {t("km") || "كم"}
                            </span>
                          </div>
                          <Separator
                            orientation="vertical"
                            className="mx-2 h-4"
                          />
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              {provider.experience}{" "}
                              {t("yearsExperience") || "سنوات خبرة"}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          {provider.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {provider.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="md:w-1/4 border-t md:border-t-0 md:border-r pt-4 md:pt-0 md:pr-4">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        {t("hourlyRate") || "السعر بالساعة"}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {provider.hourlyRate} {t("sar") || "ر.س"}
                      </p>
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">
                          {t("availability") || "التوفر"}
                        </p>
                        <div className="flex justify-center gap-2">
                          {provider.availability.map((day, index) => (
                            <Badge
                              key={index}
                              variant={day === "اليوم" ? "default" : "outline"}
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Button
                          className="w-full"
                          onClick={() =>
                            (window.location.href = `/maintenance/book/${categoryId}/${provider.id}`)
                          }
                        >
                          {t("bookNow") || "احجز الآن"}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          {t("call") || "اتصال"}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {t("message") || "مراسلة"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-muted-foreground">
              {t("noProvidersFound") || "لم يتم العثور على فنيين مطابقين لبحثك"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setDistanceRange([0, 10]);
                setAvailabilityFilter({
                  today: false,
                  tomorrow: false,
                  dayAfter: false,
                });
                setMinRating(0);
              }}
            >
              {t("resetFilters") || "إعادة ضبط الفلاتر"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderList;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Filter,
  Star,
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
} from "lucide-react";

interface MaintenanceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  services: string[];
}

const maintenanceCategories: MaintenanceCategory[] = [
  {
    id: "plumbing",
    name: "السباكة",
    icon: <Droplet className="h-8 w-8" />,
    description:
      "إصلاح تسربات المياه، تركيب وصيانة الأنابيب والصنابير والأحواض",
    services: [
      "إصلاح تسربات",
      "تركيب صنابير",
      "تسليك مجاري",
      "تركيب سخانات",
      "صيانة خزانات المياه",
    ],
  },
  {
    id: "electrical",
    name: "الكهرباء",
    icon: <Zap className="h-8 w-8" />,
    description:
      "تركيب وإصلاح الأنظمة الكهربائية، الإضاءة، والأجهزة الكهربائية",
    services: [
      "تمديدات كهربائية",
      "إصلاح أعطال",
      "تركيب إضاءة",
      "صيانة مولدات",
      "تركيب أنظمة أمان",
    ],
  },
  {
    id: "carpentry",
    name: "النجارة",
    icon: <Hammer className="h-8 w-8" />,
    description: "تصنيع وإصلاح الأثاث الخشبي، تركيب الأبواب والنوافذ",
    services: [
      "صناعة أثاث",
      "إصلاح أبواب",
      "تركيب خزائن",
      "تجديد أثاث",
      "تركيب أرضيات خشبية",
    ],
  },
  {
    id: "painting",
    name: "الدهان",
    icon: <Paintbrush className="h-8 w-8" />,
    description: "طلاء المنازل والمباني، إصلاح الجدران، ديكورات داخلية",
    services: [
      "دهان داخلي",
      "دهان خارجي",
      "ديكورات جبس",
      "ورق جدران",
      "معالجة تشققات",
    ],
  },
  {
    id: "hvac",
    name: "التكييف والتبريد",
    icon: <Thermometer className="h-8 w-8" />,
    description: "تركيب وصيانة أنظمة التكييف والتدفئة والتهوية",
    services: [
      "تركيب مكيفات",
      "صيانة دورية",
      "إصلاح أعطال",
      "تنظيف وتعقيم",
      "تركيب أنظمة تدفئة",
    ],
  },
  {
    id: "appliances",
    name: "صيانة الأجهزة المنزلية",
    icon: <Plug className="h-8 w-8" />,
    description: "إصلاح وصيانة الأجهزة المنزلية مثل الثلاجات والغسالات",
    services: [
      "إصلاح غسالات",
      "صيانة ثلاجات",
      "إصلاح أفران",
      "صيانة مكيفات",
      "إصلاح أجهزة صغيرة",
    ],
  },
  {
    id: "cleaning",
    name: "خدمات التنظيف",
    icon: <Home className="h-8 w-8" />,
    description:
      "تنظيف المنازل والمكاتب، تنظيف السجاد والمفروشات، تنظيف النوافذ",
    services: [
      "تنظيف منازل",
      "تنظيف سجاد",
      "تنظيف واجهات",
      "تنظيف بعد البناء",
      "تعقيم وتطهير",
    ],
  },
  {
    id: "gardening",
    name: "تنسيق الحدائق",
    icon: <Scissors className="h-8 w-8" />,
    description: "تصميم وتنسيق الحدائق، قص الأشجار، تركيب أنظمة الري",
    services: [
      "تصميم حدائق",
      "قص أشجار",
      "تركيب عشب صناعي",
      "أنظمة ري",
      "صيانة دورية",
    ],
  },
  {
    id: "construction",
    name: "البناء والترميم",
    icon: <Construction className="h-8 w-8" />,
    description: "أعمال البناء، الترميم، تجديد المنازل، أعمال الهدم",
    services: [
      "بناء ملاحق",
      "ترميم منازل",
      "تجديد مطابخ وحمامات",
      "أعمال هدم",
      "تشطيبات",
    ],
  },
  {
    id: "moving",
    name: "خدمات النقل",
    icon: <Truck className="h-8 w-8" />,
    description: "نقل الأثاث والمعدات، فك وتركيب الأثاث، التخزين",
    services: [
      "نقل أثاث",
      "فك وتركيب",
      "تغليف وتخزين",
      "رفع أثاث",
      "نقل معدات ثقيلة",
    ],
  },
  {
    id: "general",
    name: "صيانة عامة",
    icon: <Wrench className="h-8 w-8" />,
    description: "خدمات الصيانة العامة للمنازل والمباني التجارية",
    services: [
      "صيانة دورية",
      "إصلاحات عامة",
      "تركيب أجهزة",
      "صيانة مسابح",
      "صيانة مصاعد",
    ],
  },
];

const MaintenanceList = () => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter categories based on search term
  const filteredCategories = maintenanceCategories.filter((category) => {
    if (searchTerm === "") return true;

    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    );
  });

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      <h1 className="text-3xl font-bold mb-6">
        {t("maintenanceServices") || "خدمات الصيانة والأعمال المنزلية"}
      </h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
            />
            <Input
              type="text"
              placeholder={
                t("searchMaintenanceServices") ||
                "ابحث عن خدمات الصيانة والأعمال المنزلية..."
              }
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
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() =>
                (window.location.href = `/maintenance/${category.id}`)
              }
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.services.slice(0, 3).map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-100"
                    >
                      {service}
                    </Badge>
                  ))}
                  {category.services.length > 3 && (
                    <Badge variant="outline" className="bg-gray-100">
                      +{category.services.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">
              {t("noServicesFound") || "لم يتم العثور على خدمات مطابقة لبحثك"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchTerm("")}
            >
              {t("clearSearch") || "مسح البحث"}
            </Button>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("howItWorks") || "كيف تعمل خدمات الصيانة"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("chooseService") || "اختر الخدمة"}
            </h3>
            <p className="text-muted-foreground">
              {t("chooseServiceDescription") ||
                "تصفح فئات الخدمات واختر ما يناسب احتياجاتك"}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("selectProvider") || "اختر مقدم الخدمة"}
            </h3>
            <p className="text-muted-foreground">
              {t("selectProviderDescription") ||
                "اختر من بين مقدمي الخدمة المعتمدين بناءً على التقييمات والأسعار"}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("bookService") || "احجز الخدمة"}
            </h3>
            <p className="text-muted-foreground">
              {t("bookServiceDescription") ||
                "حدد الوقت المناسب واحجز الخدمة بضغطة زر"}
            </p>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">
          {t("popularServices") || "الخدمات الأكثر طلباً"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2"
            onClick={() => (window.location.href = "/maintenance/electrical")}
          >
            <Zap className="h-6 w-6 text-primary" />
            <span>{t("electrical") || "الكهرباء"}</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2"
            onClick={() => (window.location.href = "/maintenance/plumbing")}
          >
            <Droplet className="h-6 w-6 text-primary" />
            <span>{t("plumbing") || "السباكة"}</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2"
            onClick={() => (window.location.href = "/maintenance/hvac")}
          >
            <Thermometer className="h-6 w-6 text-primary" />
            <span>{t("hvac") || "التكييف والتبريد"}</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2"
            onClick={() => (window.location.href = "/maintenance/painting")}
          >
            <Paintbrush className="h-6 w-6 text-primary" />
            <span>{t("painting") || "الدهان"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceList;

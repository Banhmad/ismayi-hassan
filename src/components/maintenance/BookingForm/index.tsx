import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  Star,
  Phone,
  MessageCircle,
  Camera,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  distance: number;
  location: string;
  services: string[];
  hourlyRate: number;
  experience: number;
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

// Mock data for the selected provider and category
const mockProvider: ServiceProvider = {
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
};

const mockCategory: CategoryInfo = {
  id: "plumbing",
  name: "السباكة",
  icon: <></>,
  description: "إصلاح تسربات المياه، تركيب وصيانة الأنابيب والصنابير والأحواض",
};

const BookingForm = () => {
  const { categoryId, providerId } = useParams<{
    categoryId: string;
    providerId: string;
  }>();
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  // State for form fields
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("morning");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [images, setImages] = useState<string[]>([]);

  // Mock function to handle image upload
  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    const newImageUrl = `https://picsum.photos/200/200?random=${Math.random()}`;
    setImages([...images, newImageUrl]);
  };

  // Mock function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to a server
    alert("تم إرسال طلب الحجز بنجاح!");
    // Redirect to confirmation page
    window.location.href = "/maintenance/booking-confirmation";
  };

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => (window.location.href = `/maintenance/${categoryId}`)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t("back") || "رجوع"}
        </Button>
        <h1 className="text-2xl font-bold">{t("bookService") || "حجز خدمة"}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("serviceDetails") || "تفاصيل الخدمة"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Date Selection */}
              <div className="mb-6">
                <Label className="block mb-2">
                  {t("selectDate") || "اختر التاريخ"}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-right"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: isRtl ? ar : undefined })
                      ) : (
                        <span>{t("selectDate") || "اختر التاريخ"}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              <div className="mb-6">
                <Label className="block mb-2">
                  {t("selectTimeSlot") || "اختر الوقت"}
                </Label>
                <RadioGroup
                  value={timeSlot}
                  onValueChange={setTimeSlot}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="morning"
                      id="morning"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="morning"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Clock className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">
                        {t("morning") || "صباحاً"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        8:00 - 12:00
                      </span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="afternoon"
                      id="afternoon"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="afternoon"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Clock className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">
                        {t("afternoon") || "ظهراً"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        12:00 - 16:00
                      </span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="evening"
                      id="evening"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="evening"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Clock className="mb-2 h-6 w-6" />
                      <span className="text-sm font-medium">
                        {t("evening") || "مساءً"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        16:00 - 20:00
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Address */}
              <div className="mb-6">
                <Label htmlFor="address" className="block mb-2">
                  {t("serviceAddress") || "عنوان الخدمة"}
                </Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder={t("enterAddress") || "أدخل العنوان بالتفصيل"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              {/* Service Description */}
              <div className="mb-6">
                <Label htmlFor="description" className="block mb-2">
                  {t("serviceDescription") || "وصف الخدمة المطلوبة"}
                </Label>
                <Textarea
                  id="description"
                  placeholder={
                    t("describeIssue") ||
                    "صف المشكلة أو الخدمة المطلوبة بالتفصيل..."
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <Label className="block mb-2">
                  {t("uploadImages") || "إرفاق صور (اختياري)"}
                </Label>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-24 rounded-md overflow-hidden"
                    >
                      <img
                        src={image}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div
                    className="h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {t("addPhoto") || "إضافة صورة"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <Label className="block mb-2">
                  {t("paymentMethod") || "طريقة الدفع"}
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="cash"
                      id="cash"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="cash"
                      className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>
                          {t("cashOnService") || "الدفع عند تقديم الخدمة"}
                        </span>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="online"
                      id="online"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="online"
                      className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>{t("onlinePayment") || "الدفع الإلكتروني"}</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                {t("confirmBooking") || "تأكيد الحجز"}
              </Button>
            </form>
          </div>
        </div>

        {/* Provider Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">
              {t("serviceProvider") || "مقدم الخدمة"}
            </h2>
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <img
                  src={mockProvider.avatar}
                  alt={mockProvider.name}
                  className="w-12 h-12 rounded-full"
                />
                {mockProvider.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{mockProvider.name}</h3>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm mr-1">{mockProvider.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({mockProvider.reviewCount})
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("serviceType") || "نوع الخدمة"}
                </p>
                <p className="font-medium">{mockCategory.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("hourlyRate") || "السعر بالساعة"}
                </p>
                <p className="font-medium">
                  {mockProvider.hourlyRate} {t("sar") || "ر.س"}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("estimatedTotal") || "التكلفة التقديرية"}
                </p>
                <p className="text-xl font-bold text-primary">
                  {mockProvider.hourlyRate * 2} {t("sar") || "ر.س"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("basedOnTwoHours") || "بناءً على ساعتين من العمل"}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
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
  );
};

export default BookingForm;

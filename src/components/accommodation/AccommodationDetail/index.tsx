import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  Waves,
  Utensils,
  AirVent,
  Tv,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";

// Mock data for a single accommodation
const mockAccommodations = {
  "1": {
    id: "1",
    title: "فندق القصر الملكي",
    price: 750,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    location: "الرياض، المملكة العربية السعودية",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7379945460236!2d46.6752534!3d24.713552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0336d295d65f%3A0xf7b52e1e8f897f63!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus",
    description:
      "فندق فاخر مع إطلالات رائعة وخدمات متميزة، يوفر تجربة إقامة لا تُنسى مع مسبح خارجي وسبا. يقع الفندق في موقع استراتيجي قريب من المعالم السياحية الرئيسية والمراكز التجارية. تم تصميم الغرف بأناقة لتوفير أقصى درجات الراحة والرفاهية لضيوفنا.",
    amenities: [
      { name: "واي فاي مجاني", icon: <Wifi className="h-5 w-5" /> },
      { name: "إفطار مجاني", icon: <Coffee className="h-5 w-5" /> },
      { name: "موقف سيارات", icon: <Car className="h-5 w-5" /> },
      { name: "مسبح", icon: <Waves className="h-5 w-5" /> },
      { name: "مطعم", icon: <Utensils className="h-5 w-5" /> },
      { name: "تكييف", icon: <AirVent className="h-5 w-5" /> },
      { name: "تلفزيون", icon: <Tv className="h-5 w-5" /> },
    ],
    rooms: [
      {
        id: "room1",
        name: "غرفة ديلوكس",
        price: 750,
        capacity: 2,
        description: "غرفة فاخرة مع سرير كبير وإطلالة على المدينة",
        amenities: ["واي فاي مجاني", "تلفزيون", "ميني بار", "خدمة الغرف"],
      },
      {
        id: "room2",
        name: "جناح تنفيذي",
        price: 1200,
        capacity: 2,
        description: "جناح واسع مع غرفة معيشة منفصلة وإطلالة بانورامية",
        amenities: [
          "واي فاي مجاني",
          "تلفزيون",
          "ميني بار",
          "خدمة الغرف",
          "جاكوزي",
        ],
      },
      {
        id: "room3",
        name: "غرفة عائلية",
        price: 950,
        capacity: 4,
        description: "غرفة واسعة مناسبة للعائلات مع سريرين كبيرين",
        amenities: ["واي فاي مجاني", "تلفزيون", "ميني بار", "خدمة الغرف"],
      },
    ],
    reviews: [
      {
        id: "review1",
        user: "أحمد محمد",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
        rating: 5,
        date: "15 مارس 2023",
        comment:
          "تجربة رائعة، الخدمة ممتازة والغرف نظيفة ومريحة. سأعود بالتأكيد!",
      },
      {
        id: "review2",
        user: "سارة علي",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
        rating: 4,
        date: "2 أبريل 2023",
        comment: "فندق جميل وموقع ممتاز، لكن الإفطار كان متوسط الجودة.",
      },
      {
        id: "review3",
        user: "خالد عبدالله",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
        rating: 5,
        date: "20 مايو 2023",
        comment:
          "من أفضل الفنادق التي أقمت بها، الخدمة استثنائية والموظفون ودودون للغاية.",
      },
    ],
    unavailableDates: [
      new Date(2023, 5, 10),
      new Date(2023, 5, 11),
      new Date(2023, 5, 12),
      new Date(2023, 5, 20),
      new Date(2023, 5, 21),
      new Date(2023, 6, 5),
      new Date(2023, 6, 6),
      new Date(2023, 6, 7),
    ],
  },
  "2": {
    id: "2",
    title: "منتجع الواحة",
    price: 550,
    rating: 4.5,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    ],
    location: "جدة، المملكة العربية السعودية",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.0308353056897!2d39.1728945!3d21.543333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus",
    description:
      "منتجع ساحلي هادئ مع شاطئ خاص وأنشطة مائية متنوعة، مثالي للعائلات والأزواج. يتميز المنتجع بموقعه الفريد على شاطئ البحر الأحمر، ويوفر مجموعة متنوعة من المرافق الترفيهية والرياضية.",
    amenities: [
      { name: "واي فاي مجاني", icon: <Wifi className="h-5 w-5" /> },
      { name: "إفطار مجاني", icon: <Coffee className="h-5 w-5" /> },
      { name: "موقف سيارات", icon: <Car className="h-5 w-5" /> },
      { name: "مسبح", icon: <Waves className="h-5 w-5" /> },
      { name: "مطعم", icon: <Utensils className="h-5 w-5" /> },
      { name: "تكييف", icon: <AirVent className="h-5 w-5" /> },
      { name: "تلفزيون", icon: <Tv className="h-5 w-5" /> },
    ],
    rooms: [
      {
        id: "room1",
        name: "غرفة ديلوكس مع إطلالة على البحر",
        price: 550,
        capacity: 2,
        description: "غرفة أنيقة مع إطلالة رائعة على البحر الأحمر",
        amenities: ["واي فاي مجاني", "تلفزيون", "ميني بار", "شرفة خاصة"],
      },
      {
        id: "room2",
        name: "فيلا شاطئية",
        price: 1500,
        capacity: 4,
        description: "فيلا فاخرة على الشاطئ مباشرة مع مسبح خاص",
        amenities: [
          "واي فاي مجاني",
          "تلفزيون",
          "مطبخ صغير",
          "مسبح خاص",
          "شرفة",
        ],
      },
      {
        id: "room3",
        name: "جناح عائلي",
        price: 850,
        capacity: 6,
        description: "جناح واسع مع غرفتي نوم وصالة، مثالي للعائلات",
        amenities: ["واي فاي مجاني", "تلفزيون", "ميني بار", "خدمة الغرف"],
      },
    ],
    reviews: [
      {
        id: "review1",
        user: "محمد العلي",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
        rating: 5,
        date: "10 فبراير 2023",
        comment:
          "منتجع رائع، قضينا إجازة عائلية ممتعة. الشاطئ نظيف والخدمة ممتازة.",
      },
      {
        id: "review2",
        user: "نورة الأحمد",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
        rating: 4,
        date: "5 مارس 2023",
        comment: "المنتجع جميل والموقع رائع، لكن الأسعار مرتفعة قليلاً.",
      },
    ],
    unavailableDates: [
      new Date(2023, 5, 15),
      new Date(2023, 5, 16),
      new Date(2023, 5, 17),
      new Date(2023, 5, 25),
      new Date(2023, 5, 26),
      new Date(2023, 6, 10),
      new Date(2023, 6, 11),
    ],
  },
};

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const accommodation = mockAccommodations[id || "1"];

  const [selectedRoom, setSelectedRoom] = useState(accommodation.rooms[0]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState(1);
  const [mainImage, setMainImage] = useState(accommodation.images[0]);

  // Function to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return accommodation.unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.getDate() === date.getDate() &&
        unavailableDate.getMonth() === date.getMonth() &&
        unavailableDate.getFullYear() === date.getFullYear(),
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (selectedDates.length === 2) {
      const start = new Date(selectedDates[0]);
      const end = new Date(selectedDates[1]);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return selectedRoom.price * diffDays;
    }
    return selectedRoom.price;
  };

  return (
    <div className="container mx-auto py-8 px-4 rtl">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Accommodation Title and Rating */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {accommodation.title}
              </h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 ml-1 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {accommodation.location}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-primary text-lg ml-1">
                {accommodation.rating}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(accommodation.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground mr-2">
                ({accommodation.reviewCount} تقييم)
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <img
                src={mainImage}
                alt={accommodation.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {accommodation.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${accommodation.title} ${index + 1}`}
                  className={`w-full h-[95px] object-cover rounded-lg cursor-pointer ${mainImage === image ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for Details, Rooms, Location, Reviews */}
        <div className="p-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="rooms">الغرف</TabsTrigger>
              <TabsTrigger value="location">الموقع</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">وصف الإقامة</h3>
                  <p className="text-muted-foreground">
                    {accommodation.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">المرافق</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {accommodation.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="ml-2 text-primary">{amenity.icon}</div>
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="mt-6">
              <div className="space-y-6">
                {accommodation.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border rounded-lg p-4 ${selectedRoom.id === room.id ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{room.name}</h3>
                        <div className="flex items-center mt-1 text-muted-foreground">
                          <Users className="h-4 w-4 ml-1" />
                          <span>يتسع لـ {room.capacity} أشخاص</span>
                        </div>
                        <p className="mt-2">{room.description}</p>

                        <div className="mt-3">
                          <h4 className="font-medium mb-1">المرافق:</h4>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="text-sm bg-gray-100 px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-xl font-bold text-primary">
                          {room.price} ر.س{" "}
                          <span className="text-sm font-normal">/ ليلة</span>
                        </div>
                        <Button
                          className={`mt-2 ${selectedRoom.id === room.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          {selectedRoom.id === room.id
                            ? "تم الاختيار"
                            : "اختر هذه الغرفة"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">الموقع</h3>
                <p className="text-muted-foreground">
                  {accommodation.location}
                </p>
                <div className="h-[400px] w-full rounded-lg overflow-hidden">
                  <iframe
                    src={accommodation.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    التقييمات ({accommodation.reviewCount})
                  </h3>
                  <div className="flex items-center">
                    <span className="font-bold text-primary text-lg ml-1">
                      {accommodation.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(accommodation.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {accommodation.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full ml-3"
                          />
                          <div>
                            <h4 className="font-medium">{review.user}</h4>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Section */}
        <div className="p-6 bg-gray-50 border-t">
          <h3 className="text-xl font-semibold mb-4">احجز إقامتك</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-3">اختر تواريخ الإقامة</h4>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Calendar
                      mode="range"
                      selected={selectedDates}
                      onSelect={setSelectedDates as any}
                      disabled={isDateUnavailable}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="check-in" className="block mb-2">
                        تاريخ الوصول - تاريخ المغادرة
                      </Label>
                      <div className="relative">
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="check-in"
                          placeholder="اختر التواريخ"
                          value={
                            selectedDates.length === 2
                              ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
                              : ""
                          }
                          readOnly
                          className="pr-9"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="guests" className="block mb-2">
                        عدد الضيوف
                      </Label>
                      <div className="relative">
                        <Users className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max={selectedRoom.capacity}
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="pr-9"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        الحد الأقصى: {selectedRoom.capacity} ضيوف
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium mb-3">ملخص الحجز</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>الغرفة:</span>
                    <span>{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>السعر لليلة الواحدة:</span>
                    <span>{selectedRoom.price} ر.س</span>
                  </div>

                  {selectedDates.length === 2 && (
                    <div className="flex justify-between">
                      <span>عدد الليالي:</span>
                      <span>
                        {Math.ceil(
                          Math.abs(
                            new Date(selectedDates[1]).getTime() -
                              new Date(selectedDates[0]).getTime(),
                          ) /
                            (1000 * 60 * 60 * 24),
                        )}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>المجموع:</span>
                    <span>{calculateTotalPrice()} ر.س</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-primary text-white hover:bg-primary/90"
                  onClick={() =>
                    (window.location.href = `/booking-confirmation/${accommodation.id}/${selectedRoom.id}`)
                  }
                >
                  تأكيد الحجز
                </Button>

                <p className="text-sm text-muted-foreground mt-3 text-center">
                  لن يتم خصم أي مبلغ الآن. ستدفع خلال عملية الحجز النهائية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetail;

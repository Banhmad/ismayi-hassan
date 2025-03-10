import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock data for a single accommodation
const mockAccommodations = {
  "1": {
    id: "1",
    title: "فندق القصر الملكي",
    price: 750,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    location: "الرياض، المملكة العربية السعودية",
  },
  "2": {
    id: "2",
    title: "منتجع الواحة",
    price: 550,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    location: "جدة، المملكة العربية السعودية",
  },
};

const BookingConfirmation = () => {
  const { id, roomId } = useParams<{ id: string; roomId: string }>();
  const navigate = useNavigate();
  const accommodation = mockAccommodations[id || "1"];

  const [activeTab, setActiveTab] = useState("personal-info");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string; isFiltered?: boolean }[]
  >([
    {
      sender: "system",
      text: "مرحباً بك في نظام الدردشة الآمن. يمكنك التواصل مع مقدم الخدمة هنا. يرجى عدم مشاركة معلومات الاتصال الشخصية قبل تأكيد الحجز.",
      time: "10:00",
    },
    {
      sender: "provider",
      text: "مرحباً! أنا محمد من فريق خدمة العملاء. كيف يمكنني مساعدتك بخصوص حجزك؟",
      time: "10:01",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeToTerms: false,
  });

  // Payment state
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  // Booking details
  const bookingDetails = {
    accommodation: accommodation.title,
    location: accommodation.location,
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    guests: 2,
    nights: 5,
    roomType: "غرفة ديلوكس",
    pricePerNight: accommodation.price,
    totalPrice: accommodation.price * 5,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked,
    });
  };

  const handleNextStep = () => {
    if (activeTab === "personal-info") {
      setActiveTab("payment");
    } else if (activeTab === "payment") {
      setActiveTab("confirmation");
    } else if (activeTab === "confirmation") {
      setBookingComplete(true);
    }
  };

  const handlePreviousStep = () => {
    if (activeTab === "payment") {
      setActiveTab("personal-info");
    } else if (activeTab === "confirmation") {
      setActiveTab("payment");
    }
  };

  // AI-powered chat filtering function
  const filterMessage = (message: string) => {
    // Check for phone numbers (including hidden formats)
    const phoneRegex =
      /\d{3}[\s.-]?\d{3}[\s.-]?\d{4}|\b(?:zero|one|two|three|four|five|six|seven|eight|nine|[0-9])\s+(?:zero|one|two|three|four|five|six|seven|eight|nine|[0-9])\b|\+\d{1,3}\s?\d+/gi;

    // Check for emails and websites
    const emailRegex =
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b(?:w{3}|www|http|https)\s*\.?\s*[a-zA-Z0-9.-]+\s*\.\s*[a-zA-Z]{2,}\b/gi;

    if (phoneRegex.test(message) || emailRegex.test(message)) {
      return {
        isFiltered: true,
        filteredMessage:
          "⚠️ تم حجب هذه الرسالة لأنها قد تحتوي على معلومات اتصال شخصية. يرجى عدم مشاركة أرقام الهاتف أو البريد الإلكتروني قبل تأكيد الحجز.",
      };
    }

    return {
      isFiltered: false,
      filteredMessage: message,
    };
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const { isFiltered, filteredMessage } = filterMessage(newMessage);

    setChatMessages([
      ...chatMessages,
      {
        sender: "user",
        text: isFiltered ? filteredMessage : newMessage,
        time: timeString,
        isFiltered,
      },
    ]);

    setNewMessage("");

    // Simulate provider response after a short delay
    if (!isFiltered) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "provider",
            text: "شكراً لتواصلك! سنقوم بمراجعة طلبك والرد عليك في أقرب وقت. يمكنك إكمال عملية الحجز الآن.",
            time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
          },
        ]);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {!bookingComplete ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rtl">
              {/* Booking Steps */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                      تأكيد الحجز
                    </CardTitle>
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "personal-info" || activeTab === "payment" || activeTab === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}
                        >
                          <User className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">المعلومات الشخصية</span>
                      </div>
                      <div className="flex-1 h-1 mx-2 bg-gray-200">
                        <div
                          className={`h-full ${activeTab === "payment" || activeTab === "confirmation" ? "bg-primary" : "bg-gray-200"}`}
                          style={{
                            width:
                              activeTab === "personal-info" ? "0%" : "100%",
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "payment" || activeTab === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}
                        >
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">الدفع</span>
                      </div>
                      <div className="flex-1 h-1 mx-2 bg-gray-200">
                        <div
                          className={`h-full ${activeTab === "confirmation" ? "bg-primary" : "bg-gray-200"}`}
                          style={{
                            width:
                              activeTab === "payment" ||
                              activeTab === "personal-info"
                                ? "0%"
                                : "100%",
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "confirmation" ? "bg-primary text-white" : "bg-gray-200"}`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">التأكيد</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsContent value="personal-info" className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          المعلومات الشخصية
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">الاسم الأول</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="أدخل الاسم الأول"
                              required
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">الاسم الأخير</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="أدخل الاسم الأخير"
                              required
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="example@example.com"
                              required
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="05xxxxxxxx"
                              required
                              className="text-right"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialRequests">
                            طلبات خاصة (اختياري)
                          </Label>
                          <Textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            placeholder="أي طلبات أو ملاحظات خاصة..."
                            className="min-h-[100px] text-right"
                          />
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse mt-4">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={handleCheckboxChange}
                          />
                          <Label htmlFor="terms" className="text-sm">
                            أوافق على{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              الشروط والأحكام
                            </a>{" "}
                            و{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              سياسة الخصوصية
                            </a>
                          </Label>
                        </div>
                      </TabsContent>

                      <TabsContent value="payment" className="space-y-4">
                        <h3 className="text-lg font-semibold">معلومات الدفع</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">رقم البطاقة</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={handlePaymentInputChange}
                              placeholder="xxxx xxxx xxxx xxxx"
                              required
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardHolder">اسم حامل البطاقة</Label>
                            <Input
                              id="cardHolder"
                              name="cardHolder"
                              value={paymentData.cardHolder}
                              onChange={handlePaymentInputChange}
                              placeholder="الاسم كما يظهر على البطاقة"
                              required
                              className="text-right"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                              <Input
                                id="expiryDate"
                                name="expiryDate"
                                value={paymentData.expiryDate}
                                onChange={handlePaymentInputChange}
                                placeholder="MM/YY"
                                required
                                className="text-right"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handlePaymentInputChange}
                                placeholder="xxx"
                                required
                                className="text-right"
                              />
                            </div>
                          </div>
                        </div>
                        <Alert className="mt-4 bg-blue-50 border-blue-200">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <AlertDescription className="text-blue-700 text-sm">
                            جميع معلومات الدفع مشفرة وآمنة. لن يتم خصم أي مبلغ
                            حتى تأكيد الحجز النهائي.
                          </AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="confirmation" className="space-y-4">
                        <h3 className="text-lg font-semibold">تأكيد الحجز</h3>
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-700">
                            يرجى مراجعة تفاصيل الحجز قبل التأكيد النهائي.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-4 mt-4">
                          <h4 className="font-medium">معلومات الشخصية</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">الاسم:</div>
                            <div>
                              {formData.firstName} {formData.lastName}
                            </div>
                            <div className="text-muted-foreground">
                              البريد الإلكتروني:
                            </div>
                            <div>{formData.email}</div>
                            <div className="text-muted-foreground">
                              رقم الهاتف:
                            </div>
                            <div>{formData.phone}</div>
                          </div>

                          <Separator className="my-4" />

                          <h4 className="font-medium">تفاصيل الحجز</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">
                              الإقامة:
                            </div>
                            <div>{bookingDetails.accommodation}</div>
                            <div className="text-muted-foreground">الموقع:</div>
                            <div>{bookingDetails.location}</div>
                            <div className="text-muted-foreground">
                              تاريخ الوصول:
                            </div>
                            <div>{bookingDetails.checkIn}</div>
                            <div className="text-muted-foreground">
                              تاريخ المغادرة:
                            </div>
                            <div>{bookingDetails.checkOut}</div>
                            <div className="text-muted-foreground">
                              عدد الليالي:
                            </div>
                            <div>{bookingDetails.nights}</div>
                            <div className="text-muted-foreground">
                              عدد الضيوف:
                            </div>
                            <div>{bookingDetails.guests}</div>
                            <div className="text-muted-foreground">
                              نوع الغرفة:
                            </div>
                            <div>{bookingDetails.roomType}</div>
                          </div>

                          <Separator className="my-4" />

                          <h4 className="font-medium">ملخص التكلفة</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">
                              سعر الليلة:
                            </div>
                            <div>{bookingDetails.pricePerNight} ر.س</div>
                            <div className="text-muted-foreground">
                              عدد الليالي:
                            </div>
                            <div>{bookingDetails.nights}</div>
                            <div className="text-muted-foreground font-medium">
                              المجموع:
                            </div>
                            <div className="font-bold">
                              {bookingDetails.totalPrice} ر.س
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-between mt-8">
                      {activeTab !== "personal-info" && (
                        <Button variant="outline" onClick={handlePreviousStep}>
                          السابق
                        </Button>
                      )}
                      <div className="flex-1"></div>
                      <Button
                        onClick={handleNextStep}
                        disabled={
                          activeTab === "personal-info" &&
                          (!formData.firstName ||
                            !formData.lastName ||
                            !formData.email ||
                            !formData.phone ||
                            !formData.agreeToTerms)
                        }
                      >
                        {activeTab === "confirmation"
                          ? "تأكيد الحجز"
                          : "التالي"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary and Chat */}
              <div className="space-y-6">
                {/* Booking Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      ملخص الحجز
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                      <img
                        src={accommodation.image}
                        alt={accommodation.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{accommodation.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {accommodation.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تاريخ الوصول:
                        </span>
                        <span>{bookingDetails.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تاريخ المغادرة:
                        </span>
                        <span>{bookingDetails.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          عدد الضيوف:
                        </span>
                        <span>{bookingDetails.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          نوع الغرفة:
                        </span>
                        <span>{bookingDetails.roomType}</span>
                      </div>

                      <Separator className="my-2" />

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          سعر الليلة:
                        </span>
                        <span>{bookingDetails.pricePerNight} ر.س</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          عدد الليالي:
                        </span>
                        <span>{bookingDetails.nights}</span>
                      </div>

                      <Separator className="my-2" />

                      <div className="flex justify-between font-bold">
                        <span>المجموع:</span>
                        <span>{bookingDetails.totalPrice} ر.س</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chat with Provider */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <MessageSquare className="h-5 w-5 ml-2" />
                      تواصل مع مقدم الخدمة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-md p-3 mb-4 border border-blue-100">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-blue-500 ml-2" />
                        <span className="text-sm font-medium text-blue-700">
                          نظام دردشة آمن
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        يتم فلترة الرسائل تلقائياً لمنع مشاركة بيانات الاتصال
                        قبل تأكيد الحجز.
                      </p>
                    </div>

                    <div className="h-[300px] overflow-y-auto border rounded-md p-3 mb-3">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-3 ${message.sender === "user" ? "text-left" : "text-right"}`}
                        >
                          <div className="flex items-center mb-1">
                            {message.sender === "user" ? (
                              <>
                                <span className="text-xs text-muted-foreground">
                                  {message.time}
                                </span>
                                <Badge variant="outline" className="mr-2">
                                  أنت
                                </Badge>
                              </>
                            ) : message.sender === "provider" ? (
                              <>
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-primary/10"
                                >
                                  مقدم الخدمة
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {message.time}
                                </span>
                              </>
                            ) : (
                              <>
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-700"
                                >
                                  النظام
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {message.time}
                                </span>
                              </>
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg max-w-[80%] inline-block ${
                              message.sender === "user"
                                ? message.isFiltered
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : "bg-primary text-white"
                                : message.sender === "provider"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {message.text}
                            {message.isFiltered && (
                              <div className="flex items-center mt-1 text-xs">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                تم حجب بواسطة نظام الحماية
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex">
                      <Input
                        placeholder="اكتب رسالتك هنا..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="ml-2"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        إرسال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Booking Complete Screen
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-10 pb-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  تم تأكيد الحجز بنجاح!
                </h2>
                <p className="text-muted-foreground mb-6">
                  تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني {formData.email}
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-right">
                  <h3 className="font-semibold mb-4">تفاصيل الحجز</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-muted-foreground">رقم الحجز:</div>
                    <div>
                      BK-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </div>
                    <div className="text-muted-foreground">الإقامة:</div>
                    <div>{bookingDetails.accommodation}</div>
                    <div className="text-muted-foreground">تاريخ الوصول:</div>
                    <div>{bookingDetails.checkIn}</div>
                    <div className="text-muted-foreground">تاريخ المغادرة:</div>
                    <div>{bookingDetails.checkOut}</div>
                    <div className="text-muted-foreground">المجموع:</div>
                    <div className="font-bold">
                      {bookingDetails.totalPrice} ر.س
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/")} variant="outline">
                    العودة للرئيسية
                  </Button>
                  <Button onClick={() => navigate("/bookings")}>
                    عرض الحجوزات
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;

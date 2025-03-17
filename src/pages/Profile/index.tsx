import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DigitalCurrency from "./DigitalCurrency";
import {
  User,
  Settings,
  CreditCard,
  Calendar,
  LogOut,
  Edit,
  Wallet,
  Award,
  ShoppingBag,
  LayoutDashboard,
  Coins,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";
  const { tab } = useParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(tab || "profile");
  const navigate = useNavigate();

  // قائمة الإشعارات
  const notifications = [
    {
      id: "n1",
      title: "تم تأكيد حجزك",
      description: "تم تأكيد حجزك في فندق القصر الملكي",
      date: "منذ ساعتين",
      read: false,
    },
    {
      id: "n2",
      title: "تم إضافة 10 عملات رقمية",
      description: "تم إضافة 10 عملات رقمية إلى حسابك كمكافأة",
      date: "منذ يوم",
      read: true,
    },
    {
      id: "n3",
      title: "تقييم جديد",
      description: "قام أحد مقدمي الخدمة بالرد على تقييمك",
      date: "منذ 3 أيام",
      read: true,
    },
  ];

  // قائمة الحجوزات
  const bookings = [
    {
      id: "BK1234",
      service: "فندق القصر الملكي",
      date: "2023-07-15 - 2023-07-20",
      status: "confirmed",
      price: 3750,
    },
    {
      id: "BK5678",
      service: "منتجع الواحة",
      date: "2023-08-10 - 2023-08-15",
      status: "pending",
      price: 2750,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">
            الرجاء تسجيل الدخول لعرض ملفك الشخصي
          </h1>
          <Button onClick={() => (window.location.href = "/")}>
            العودة للصفحة الرئيسية
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* رأس الصفحة مع خلفية أرجوانية */}
      <div className="bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/" className="text-xl font-bold">
              الرئيسية
            </a>
          </div>
          <div className="flex items-center">
            <img src="/logo.png" alt="ServiceHub" className="h-12" />
            <span className="text-xl font-bold mr-2">الخدمات</span>
          </div>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <div className="container mx-auto py-8 px-4">
        {/* قائمة المستخدم المنسدلة */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mr-3">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-5 w-5 ml-1" />
                خروج
              </Button>
            </div>
          </div>
        </div>

        {/* القائمة الجانبية والمحتوى الرئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* القائمة الجانبية */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-primary text-white">
                <h3 className="font-bold">قائمة المستخدم</h3>
              </div>
              <div className="p-2">
                <div className="space-y-1">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="ml-2 h-5 w-5" />
                    {t("profile") || "الملف الشخصي"}
                  </Button>
                  <Button
                    variant={activeTab === "bookings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="ml-2 h-5 w-5" />
                    {t("myBookings") || "حجوزاتي"}
                  </Button>
                  <Button
                    variant={
                      activeTab === "digital-currency" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveTab("digital-currency")}
                  >
                    <Coins className="ml-2 h-5 w-5" />
                    {t("digitalCurrency") || "العملة الرقمية"}
                  </Button>
                  <Button
                    variant={
                      activeTab === "notifications" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="ml-2 h-5 w-5" />
                    الإشعارات
                    <Badge className="mr-auto" variant="destructive">
                      2
                    </Badge>
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="ml-2 h-5 w-5" />
                    {t("settings") || "الإعدادات"}
                  </Button>
                </div>

                {user.type === "provider" && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-1">
                      <Button
                        variant={activeTab === "services" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("services")}
                      >
                        <ShoppingBag className="ml-2 h-5 w-5" />
                        {t("myServices") || "خدماتي"}
                      </Button>
                      <Button
                        variant={
                          activeTab === "dashboard" ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setActiveTab("dashboard")}
                      >
                        <LayoutDashboard className="ml-2 h-5 w-5" />
                        {t("dashboard") || "لوحة التحكم"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* بطاقة الرصيد */}
            <div className="bg-white rounded-lg shadow-md mt-4 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">رصيد العملات</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Coins className="h-5 w-5" />
                </Button>
              </div>
              <div className="bg-gradient-to-r from-primary to-purple-700 text-white p-4 rounded-lg">
                <p className="text-sm opacity-80">الرصيد الحالي</p>
                <h3 className="text-2xl font-bold mt-1">
                  {user.digitalCurrency || 0} SVC
                </h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs opacity-80">ServiceCoin</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveTab("digital-currency")}
                  >
                    تفاصيل
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* علامة التبويب: الملف الشخصي */}
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">
                      {t("profile") || "الملف الشخصي"}
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="ml-2 h-4 w-4" /> تعديل
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 flex flex-col items-center">
                          <Avatar className="h-32 w-32 mb-4">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            تغيير الصورة
                          </Button>
                          <div className="mt-4 w-full">
                            <div className="bg-primary/10 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">
                                اكتمال الملف الشخصي
                              </h4>
                              <Progress value={75} className="h-2 mb-2" />
                              <p className="text-sm text-muted-foreground">
                                75% مكتمل
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                أكمل ملفك الشخصي للحصول على مكافأة 50 عملة رقمية
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-2/3">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  الاسم الكامل
                                </Label>
                                <p className="font-medium">{user.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  البريد الإلكتروني
                                </Label>
                                <p className="font-medium">{user.email}</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  نوع الحساب
                                </Label>
                                <p className="font-medium">
                                  {user.type === "provider"
                                    ? "مقدم خدمة"
                                    : "عميل"}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  تاريخ الانضمام
                                </Label>
                                <p className="font-medium">يونيو 2023</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  رقم الهاتف
                                </Label>
                                <p className="font-medium">+966 50 123 4567</p>
                              </div>
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  العنوان
                                </Label>
                                <p className="font-medium">
                                  الرياض، المملكة العربية السعودية
                                </p>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="text-lg font-medium mb-2">
                                التفضيلات
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    اللغة المفضلة
                                  </Label>
                                  <p className="font-medium">العربية</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    العملة المفضلة
                                  </Label>
                                  <p className="font-medium">
                                    ريال سعودي (SAR)
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    الإشعارات
                                  </Label>
                                  <p className="font-medium">مفعلة</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-muted-foreground">
                                    النشرة البريدية
                                  </Label>
                                  <p className="font-medium">مشترك</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* علامة التبويب: الحجوزات */}
              <TabsContent value="bookings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {t("myBookings") || "حجوزاتي"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {bookings.length > 0 ? (
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="border rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">
                                    {booking.service}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {booking.date}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    booking.status === "confirmed"
                                      ? "success"
                                      : "outline"
                                  }
                                >
                                  {booking.status === "confirmed"
                                    ? "مؤكد"
                                    : "قيد الانتظار"}
                                </Badge>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <p className="font-medium">
                                  {booking.price} ر.س
                                </p>
                                <Button variant="outline" size="sm">
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            ليس لديك أي حجوزات حتى الآن.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* علامة التبويب: العملة الرقمية */}
              <TabsContent value="digital-currency" className="mt-0">
                <DigitalCurrency />
              </TabsContent>

              {/* علامة التبويب: الإشعارات */}
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">الإشعارات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`border rounded-lg p-4 ${!notification.read ? "bg-primary/5 border-primary/20" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium flex items-center">
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-primary rounded-full inline-block ml-2"></span>
                                )}
                                {notification.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* علامة التبويب: الإعدادات */}
              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {t("settings") || "الإعدادات"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          إعدادات الحساب
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">الاسم الكامل</Label>
                              <Input id="name" defaultValue={user.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">البريد الإلكتروني</Label>
                              <Input id="email" defaultValue={user.email} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">تغيير كلمة المرور</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="كلمة المرور الجديدة"
                            />
                          </div>
                          <Button>حفظ التغييرات</Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          تفضيلات الإشعارات
                        </h3>
                        <div className="space-y-4">
                          {/* إعدادات الإشعارات هنا */}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          تفضيلات اللغة
                        </h3>
                        <div className="space-y-4">
                          {/* إعدادات اللغة هنا */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

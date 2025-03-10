import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
} from "lucide-react";

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { t } = useLanguage();
  const { tab } = useParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(tab || "profile");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h1>
          <Button onClick={() => (window.location.href = "/")}>
            Return to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock data for bookings
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

  // Mock data for digital currency transactions
  const transactions = [
    {
      id: "TX1234",
      type: "reward",
      amount: 50,
      description: "Welcome bonus",
      date: "2023-06-01",
    },
    {
      id: "TX5678",
      type: "earned",
      amount: 25,
      description: "Booking completion",
      date: "2023-07-21",
    },
    {
      id: "TX9012",
      type: "spent",
      amount: -15,
      description: "Discount applied",
      date: "2023-08-05",
    },
  ];

  // Mock data for provider services (only shown for providers)
  const services = [
    {
      id: "SV1234",
      name: "Luxury Suite",
      category: "Accommodation",
      price: 750,
      bookings: 12,
      rating: 4.8,
    },
    {
      id: "SV5678",
      name: "Standard Room",
      category: "Accommodation",
      price: 450,
      bookings: 28,
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge
                    className="mt-2"
                    variant={user.type === "provider" ? "default" : "outline"}
                  >
                    {user.type === "provider" ? "Service Provider" : "Customer"}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t("profile")}
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings")}
                  </Button>
                  <Button
                    variant={activeTab === "bookings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("myBookings")}
                  </Button>
                  <Button
                    variant={
                      activeTab === "digital-currency" ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveTab("digital-currency")}
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    {t("digitalCurrency")}
                  </Button>

                  {user.type === "provider" && (
                    <>
                      <Button
                        variant={activeTab === "services" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("services")}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        {t("myServices")}
                      </Button>
                      <Button
                        variant={
                          activeTab === "dashboard" ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setActiveTab("dashboard")}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        {t("dashboard")}
                      </Button>
                    </>
                  )}

                  <Separator className="my-4" />

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logout")}
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("profile")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">
                          Personal Information
                        </h3>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Full Name
                          </Label>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Email
                          </Label>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Account Type
                          </Label>
                          <p className="font-medium">
                            {user.type === "provider"
                              ? "Service Provider"
                              : "Customer"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">
                            Member Since
                          </Label>
                          <p className="font-medium">June 2023</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Digital Currency Balance
                        </h3>
                        <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Current Balance
                            </p>
                            <p className="text-2xl font-bold flex items-center">
                              <Coins className="mr-2 h-5 w-5 text-primary" />
                              {user.digitalCurrency} coins
                            </p>
                          </div>
                          <Button>View Details</Button>
                        </div>
                      </div>

                      {user.type === "provider" && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="text-lg font-medium mb-4">
                              Verification Status
                            </h3>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <p className="font-medium flex items-center">
                                  <Badge variant="success" className="mr-2">
                                    Verified
                                  </Badge>
                                  Your account is fully verified
                                </p>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("settings")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Account Settings
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" defaultValue={user.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" defaultValue={user.email} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="New password"
                            />
                          </div>
                          <Button>Save Changes</Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Notification Preferences
                        </h3>
                        <div className="space-y-4">
                          {/* Notification settings would go here */}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Language Preferences
                        </h3>
                        <div className="space-y-4">
                          {/* Language settings would go here */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {t("myBookings")}
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
                                    ? "Confirmed"
                                    : "Pending"}
                                </Badge>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <p className="font-medium">
                                  {booking.price} SAR
                                </p>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            You don't have any bookings yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Digital Currency Tab */}
              <TabsContent value="digital-currency" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {t("digitalCurrency")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center">
                              <Wallet className="h-8 w-8 text-primary mb-2" />
                              <h3 className="text-lg font-medium">
                                {t("wallet")}
                              </h3>
                              <p className="text-3xl font-bold mt-2">
                                {user.digitalCurrency}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Current Balance
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center">
                              <Award className="h-8 w-8 text-primary mb-2" />
                              <h3 className="text-lg font-medium">
                                {t("rewards")}
                              </h3>
                              <p className="text-3xl font-bold mt-2">75</p>
                              <p className="text-sm text-muted-foreground">
                                Earned This Month
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center">
                              <CreditCard className="h-8 w-8 text-primary mb-2" />
                              <h3 className="text-lg font-medium">Spent</h3>
                              <p className="text-3xl font-bold mt-2">15</p>
                              <p className="text-sm text-muted-foreground">
                                Used This Month
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Transaction History
                        </h3>
                        <div className="space-y-4">
                          {transactions.map((transaction) => (
                            <div
                              key={transaction.id}
                              className="border rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">
                                    {transaction.description}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {transaction.date}
                                  </p>
                                </div>
                                <p
                                  className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {transaction.amount > 0 ? "+" : ""}
                                  {transaction.amount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          How to Earn More
                        </h3>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <ul className="list-disc list-inside space-y-2">
                            <li>Complete bookings to earn coins</li>
                            <li>Refer friends to our platform</li>
                            <li>Write reviews for services you've used</li>
                            <li>Participate in special promotions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Provider-specific tabs */}
              {user.type === "provider" && (
                <>
                  <TabsContent value="services" className="mt-0">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl">
                          {t("myServices")}
                        </CardTitle>
                        <Button>Add New Service</Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className="border rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">
                                    {service.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {service.category}
                                  </p>
                                </div>
                                <Badge>{service.price} SAR</Badge>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex space-x-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Bookings
                                    </p>
                                    <p className="font-medium">
                                      {service.bookings}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Rating
                                    </p>
                                    <p className="font-medium">
                                      {service.rating}/5
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="dashboard" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          {t("dashboard")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                  <h3 className="text-lg font-medium">
                                    Total Bookings
                                  </h3>
                                  <p className="text-3xl font-bold mt-2">42</p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                  <h3 className="text-lg font-medium">
                                    Revenue
                                  </h3>
                                  <p className="text-3xl font-bold mt-2">
                                    12,450 SAR
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex flex-col items-center">
                                  <h3 className="text-lg font-medium">
                                    Average Rating
                                  </h3>
                                  <p className="text-3xl font-bold mt-2">
                                    4.7/5
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* More dashboard content would go here */}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

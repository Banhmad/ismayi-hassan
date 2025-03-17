import React, { useState } from "react";
import Header from "../layout/Header";
import AuthenticationPanel from "../auth/AuthenticationPanel";
import CategoryGrid from "./CategoryGrid";
import ServiceCarousel from "./ServiceCarousel";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userType, setUserType] = useState<"customer" | "provider" | null>(
    null,
  );

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAuthenticated = (type: "customer" | "provider") => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserName(type === "customer" ? "John Doe" : "Business Name");
    setIsAuthOpen(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log(`Selected category: ${categoryId}`);
    // In a real app, this would navigate to the category page or filter results
  };

  const handleSearch = (
    searchTerm: string,
    category: string,
    location: string,
  ) => {
    console.log(
      `Search: ${searchTerm}, Category: ${category}, Location: ${location}`,
    );
    // In a real app, this would perform a search and display results
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with purple background */}
      <div className="bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="#" onClick={handleOpenAuth} className="text-xl font-bold">
              حسابي
            </a>
          </div>
          <div className="flex items-center">
            <img src="/logo.png" alt="ServiceHub" className="h-12" />
            <span className="text-xl font-bold mr-2">الخدمات</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="ابحث عن خدمة..."
            className="pr-10 w-full"
          />
          <Button className="absolute left-0 top-0 h-full bg-green-600 hover:bg-green-700">
            <Search className="h-5 w-5" />
          </Button>
          <div className="mt-2 text-center">
            <a href="#" className="text-sm text-gray-600">
              خدمات دقيقة
            </a>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-2xl font-bold">
          كافة الخدمات الاحترافية لتطوير أعمالك
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="py-8">
        <CategoryGrid onCategorySelect={handleCategorySelect} />
      </div>

      {/* Service Carousel - Top Rated Services */}
      <div className="py-6 bg-white">
        <ServiceCarousel />
      </div>

      {/* How It Works */}
      <div className="py-12">
        <HowItWorks />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      <CtaSection onOpenAuth={handleOpenAuth} />
      <Footer />

      {/* Authentication Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <AuthenticationPanel onAuthenticated={handleAuthenticated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;

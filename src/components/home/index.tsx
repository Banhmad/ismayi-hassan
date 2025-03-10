import React, { useState } from "react";
import Header from "../layout/Header";
import AuthenticationPanel from "../auth/AuthenticationPanel";
import CategoryGrid from "./CategoryGrid";
import HeroSection from "./HeroSection";
import FeaturedServices from "./FeaturedServices";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={
          isLoggedIn
            ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
            : ""
        }
      />

      {/* Authentication Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <AuthenticationPanel onAuthenticated={handleAuthenticated} />
        </DialogContent>
      </Dialog>

      {/* Hero Section with Search */}
      <HeroSection onSearch={handleSearch} />

      {/* Categories Section */}
      <section className="py-16 px-4">
        <CategoryGrid onCategorySelect={handleCategorySelect} />
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-4 bg-gray-100">
        <FeaturedServices />
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CtaSection onOpenAuth={handleOpenAuth} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

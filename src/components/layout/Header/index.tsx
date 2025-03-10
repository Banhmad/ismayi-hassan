import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import Navigation from "../Navigation";
import LanguageSelector from "../LanguageSelector";
import UserMenu from "../UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onOpenAuth?: () => void;
}

const Header = ({ onOpenAuth = () => {} }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();

  return (
    <header
      className={`w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50 ${currentLanguage.direction === "rtl" ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            ServiceHub
          </a>
        </div>

        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex" />

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Search Button */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {/* Authentication */}
          <UserMenu onOpenAuth={onOpenAuth} />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Navigation className="flex flex-col space-y-3" />

            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
              {/* Language Selector */}
              <LanguageSelector isMobile={true} />

              {/* Authentication */}
              <UserMenu onOpenAuth={onOpenAuth} isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from "react";
import SearchBar from "../SearchBar";

interface HeroSectionProps {
  onSearch?: (searchTerm: string, category: string, location: string) => void;
}

const HeroSection = ({ onSearch = () => {} }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the Perfect Service
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with verified service providers across multiple categories for
          all your needs
        </p>
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
};

export default HeroSection;

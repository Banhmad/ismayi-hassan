import React from "react";
import AccommodationList from "@/components/accommodation/AccommodationList";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Accommodation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <AccommodationList />
      </div>
      <Footer />
    </div>
  );
};

export default Accommodation;

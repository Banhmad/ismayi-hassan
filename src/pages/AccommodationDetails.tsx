import React from "react";
import AccommodationDetail from "@/components/accommodation/AccommodationDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const AccommodationDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <AccommodationDetail />
      </div>
      <Footer />
    </div>
  );
};

export default AccommodationDetails;

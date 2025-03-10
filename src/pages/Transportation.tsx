import React from "react";
import TransportationService from "@/components/transportation/TransportationService";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Transportation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <TransportationService serviceType="all" />
      </div>
      <Footer />
    </div>
  );
};

export default Transportation;

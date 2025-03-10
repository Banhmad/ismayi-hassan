import React from "react";
import RetailDetail from "@/components/retail/RetailDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const RetailDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <RetailDetail />
      </div>
      <Footer />
    </div>
  );
};

export default RetailDetails;

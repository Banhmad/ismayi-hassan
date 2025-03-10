import React from "react";
import RetailList from "@/components/retail/RetailList";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Retail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <RetailList />
      </div>
      <Footer />
    </div>
  );
};

export default Retail;

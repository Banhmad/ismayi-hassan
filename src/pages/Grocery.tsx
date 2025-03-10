import React from "react";
import GroceryStore from "@/components/retail/GroceryStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Grocery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <GroceryStore />
      </div>
      <Footer />
    </div>
  );
};

export default Grocery;

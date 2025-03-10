import React from "react";
import ServiceProviderList from "@/components/maintenance/ServiceProviderList";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const MaintenanceCategory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <ServiceProviderList />
      </div>
      <Footer />
    </div>
  );
};

export default MaintenanceCategory;

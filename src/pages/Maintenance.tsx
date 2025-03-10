import React from "react";
import MaintenanceList from "@/components/maintenance/MaintenanceList";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <MaintenanceList />
      </div>
      <Footer />
    </div>
  );
};

export default Maintenance;

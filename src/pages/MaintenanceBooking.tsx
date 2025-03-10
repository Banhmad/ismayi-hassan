import React from "react";
import BookingForm from "@/components/maintenance/BookingForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const MaintenanceBooking = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
};

export default MaintenanceBooking;

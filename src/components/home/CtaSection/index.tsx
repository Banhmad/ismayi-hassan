import React from "react";

interface CtaSectionProps {
  onOpenAuth?: () => void;
}

const CtaSection = ({ onOpenAuth = () => {} }: CtaSectionProps) => {
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to offer your services?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join our growing community of service providers and reach thousands of
          potential customers
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Become a Provider
        </button>
      </div>
    </section>
  );
};

export default CtaSection;

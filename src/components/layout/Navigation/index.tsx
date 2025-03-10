import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = "" }: NavigationProps) => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  return (
    <nav
      className={`${className} items-center ${isRtl ? "space-x-reverse space-x-8" : "space-x-8"}`}
    >
      <a
        href="/"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t("home")}
      </a>
      <a
        href="/services"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t("services")}
      </a>
      <a
        href="/providers"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t("providers")}
      </a>
      <a
        href="/about"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t("about")}
      </a>
    </nav>
  );
};

export default Navigation;

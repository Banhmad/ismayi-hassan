import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialLoginProps {
  onSuccess?: () => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onSuccess }) => {
  const { t } = useLanguage();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleGoogleLogin = () => {
    // بدلاً من إعادة التوجيه إلى خادم OAuth، سنقوم بمحاكاة نجاح تسجيل الدخول
    console.log("محاولة تسجيل الدخول باستخدام Google");
    if (onSuccess) onSuccess();
  };

  const handleFacebookLogin = () => {
    // بدلاً من إعادة التوجيه إلى خادم OAuth، سنقوم بمحاكاة نجاح تسجيل الدخول
    console.log("محاولة تسجيل الدخول باستخدام Facebook");
    if (onSuccess) onSuccess();
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            {t("orContinueWith") || "Or continue with"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-google"
          >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            <path d="M12 16V8" />
            <path d="M8 12h8" />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;

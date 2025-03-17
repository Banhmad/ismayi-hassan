import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import SocialLogin from "./SocialLogin";

interface AuthenticationPanelProps {
  onAuthenticated?: (type: "customer" | "provider") => void;
}

const AuthenticationPanel: React.FC<AuthenticationPanelProps> = ({
  onAuthenticated = () => {},
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"customer" | "provider">("customer");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLocalMode, setIsLocalMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Sign in with:", {
        email,
        password,
        rememberMe,
        mode: isLocalMode ? "local" : "server",
      });

      if (isLocalMode) {
        // محاكاة تأخير بسيط للتسجيل المحلي
        await new Promise((resolve) => setTimeout(resolve, 500));
        onAuthenticated(userType);
      } else {
        // محاولة الاتصال بالخادم (سيفشل في الوضع المحلي)
        try {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              // محاكاة فشل الاتصال بالخادم
              reject(new Error("فشل الاتصال بالخادم"));
            }, 1000);
          });
        } catch (serverError) {
          throw new Error(
            "تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت أو تجربة الوضع المحلي.",
          );
        }
      }
    } catch (error: any) {
      console.error("خطأ في تسجيل الدخول:", error);
      setError(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Sign up with:", {
        email,
        password,
        name,
        userType,
        businessName,
        businessType,
        agreeToTerms,
        mode: isLocalMode ? "local" : "server",
      });

      if (isLocalMode) {
        // محاكاة تأخير بسيط للتسجيل المحلي
        await new Promise((resolve) => setTimeout(resolve, 500));
        onAuthenticated(userType);
      } else {
        // محاولة الاتصال بالخادم (سيفشل في الوضع المحلي)
        try {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              // محاكاة فشل الاتصال بالخادم
              reject(new Error("فشل الاتصال بالخادم"));
            }, 1000);
          });
        } catch (serverError) {
          throw new Error(
            "تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت أو تجربة الوضع المحلي.",
          );
        }
      }
    } catch (error: any) {
      console.error("خطأ في إنشاء الحساب:", error);
      setError(error.message || "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-center">
        <div className="bg-gray-200 p-1 rounded-full">
          <Button
            variant={isLocalMode ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => {
              setIsLocalMode(true);
              setError(null);
            }}
          >
            وضع محلي
          </Button>
          <Button
            variant={!isLocalMode ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => {
              setIsLocalMode(false);
              setError(null);
            }}
          >
            وضع متصل
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      <Tabs
        defaultValue="signin"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">
            {t("welcomeBack") || "Welcome Back"}
          </TabsTrigger>
          <TabsTrigger value="signup">
            {t("createAccount") || "Create Account"}
          </TabsTrigger>
        </TabsList>

        {/* Sign In Tab */}
        <TabsContent value="signin" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground text-center">
            {t("signInAccess") || "Sign in to access your account"}
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email") || "Email"}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("password") || "Password"}</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  {t("forgotPassword") || "Forgot password?"}
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label htmlFor="remember" className="text-sm">
                {t("rememberMe") || "Remember me for 30 days"}
              </Label>
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : t("signIn") || "Sign In"}
              </Button>

              <SocialLogin />
            </div>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {t("newToPlatform") || "New to our platform?"}{" "}
            </span>
            <button
              className="text-primary hover:underline"
              onClick={() => setActiveTab("signup")}
            >
              {t("createAccount") || "Create an account"}
            </button>
          </div>
        </TabsContent>

        {/* Sign Up Tab */}
        <TabsContent value="signup" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground text-center">
            {t("joinPlatform") || "Join our marketplace platform"}
          </p>

          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="customer-type"
                name="user-type"
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
                className="h-4 w-4 text-primary"
              />
              <Label htmlFor="customer-type">
                {t("customer") || "Customer"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="provider-type"
                name="user-type"
                checked={userType === "provider"}
                onChange={() => setUserType("provider")}
                className="h-4 w-4 text-primary"
              />
              <Label htmlFor="provider-type">
                {t("serviceProvider") || "Service Provider"}
              </Label>
            </div>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">
                {t("firstName") || "First Name"}
              </Label>
              <Input
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">{t("email") || "Email"}</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">
                {t("password") || "Password"}
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                {t("confirmPassword") || "Confirm Password"}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {userType === "provider" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="business-name">
                    {t("businessName") || "Business Name"}
                  </Label>
                  <Input
                    id="business-name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-type">
                    {t("businessType") || "Business Type"}
                  </Label>
                  <Input
                    id="business-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                required
              />
              <Label htmlFor="terms" className="text-sm">
                {t("agreeToTerms") || "I agree to the"}{" "}
                <a href="#" className="text-primary hover:underline">
                  {t("termsOfService") || "Terms of Service"}
                </a>{" "}
                {t("and") || "and"}{" "}
                <a href="#" className="text-primary hover:underline">
                  {t("privacyPolicy") || "Privacy Policy"}
                </a>
              </Label>
            </div>

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "جاري إنشاء الحساب..."
                  : t("createAccount") || "Create Account"}
              </Button>

              <SocialLogin />
            </div>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {t("alreadyHaveAccount") || "Already have an account?"}{" "}
            </span>
            <button
              className="text-primary hover:underline"
              onClick={() => setActiveTab("signin")}
            >
              {t("signIn") || "Sign in"}
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPanel;

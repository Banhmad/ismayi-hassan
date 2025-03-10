import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, UserCog, Lock, Mail, KeyRound } from "lucide-react";
import IdentityVerification from "./IdentityVerification";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthenticationPanelProps {
  onAuthenticated?: (userType: "customer" | "provider") => void;
  defaultTab?: "login" | "signup";
}

const AuthenticationPanel = ({
  onAuthenticated = () => {},
  defaultTab = "login",
}: AuthenticationPanelProps) => {
  const { login, signup } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [userType, setUserType] = useState<"customer" | "provider">("customer");
  const [showVerification, setShowVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "",
    confirmPassword: "",
    agreeToTerms: false,
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password, userType);
      onAuthenticated(userType);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new user account
    setShowVerification(true);
  };

  const handleVerificationComplete = async () => {
    try {
      const userData = {
        name:
          userType === "customer"
            ? `${formData.firstName} ${formData.lastName}`
            : formData.businessName,
        email: formData.email,
        type: userType,
      };
      await signup(userData, formData.password);
      onAuthenticated(userType);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const isRtl = currentLanguage.direction === "rtl";

  if (showVerification) {
    return (
      <IdentityVerification
        userType={userType}
        onComplete={handleVerificationComplete}
      />
    );
  }

  return (
    <Card
      className="w-full max-w-[500px] bg-white"
      dir={currentLanguage.direction}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {activeTab === "login"
            ? t("welcomeBack") || "Welcome Back"
            : t("createAccount") || "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? t("signInAccess") || "Sign in to access your account"
            : t("joinPlatform") || "Join our marketplace platform"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue={userType}
          onValueChange={(value) =>
            setUserType(value as "customer" | "provider")
          }
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{t("customer") || "Customer"}</span>
            </TabsTrigger>
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span>{t("serviceProvider") || "Service Provider"}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email") || "Email"}</Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      type="email"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {t("password") || "Password"}
                    </Label>
                    <Button variant="link" className="px-0 h-auto text-xs">
                      {t("forgotPassword") || "Forgot password?"}
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                >
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        rememberMe: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-normal">
                    {t("rememberMe") || "Remember me for 30 days"}
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  {t("signIn") || "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {t("firstName") || "First Name"}
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {t("lastName") || "Last Name"}
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email") || "Email"}</Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      type="email"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t("password") || "Password"}
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("confirmPassword") || "Confirm Password"}
                  </Label>
                  <div className="relative">
                    <KeyRound
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                >
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: checked as boolean,
                      })
                    }
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                    {t("agreeToTerms") || "I agree to the"}{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {t("termsOfService") || "Terms of Service"}
                    </Button>{" "}
                    {t("and") || "and"}{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {t("privacyPolicy") || "Privacy Policy"}
                    </Button>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  {t("createAccount") || "Create Account"}
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="provider">
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("businessEmail") || "Business Email"}
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="email"
                      name="email"
                      placeholder="business@example.com"
                      type="email"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {t("password") || "Password"}
                    </Label>
                    <Button variant="link" className="px-0 h-auto text-xs">
                      {t("forgotPassword") || "Forgot password?"}
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                >
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        rememberMe: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-normal">
                    {t("rememberMe") || "Remember me for 30 days"}
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  {t("signIn") || "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    {t("businessName") || "Business Name"}
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Your Business Name"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">
                    {t("businessType") || "Business Type"}
                  </Label>
                  <Input
                    id="businessType"
                    name="businessType"
                    placeholder="e.g. Restaurant, Accommodation"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("businessEmail") || "Business Email"}
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="email"
                      name="email"
                      placeholder="business@example.com"
                      type="email"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t("password") || "Password"}
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("confirmPassword") || "Confirm Password"}
                  </Label>
                  <div className="relative">
                    <KeyRound
                      className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`}
                    />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={isRtl ? "pr-10" : "pl-10"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                >
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        agreeToTerms: checked as boolean,
                      })
                    }
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                    {t("agreeToTerms") || "I agree to the"}{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {t("termsOfService") || "Terms of Service"}
                    </Button>{" "}
                    {t("and") || "and"}{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {t("privacyPolicy") || "Privacy Policy"}
                    </Button>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  {t("createAccount") || "Create Account"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              {activeTab === "login"
                ? t("newToPlatform") || "New to our platform?"
                : t("alreadyHaveAccount") || "Already have an account?"}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            setActiveTab(activeTab === "login" ? "signup" : "login")
          }
        >
          {activeTab === "login"
            ? t("createAccount") || "Create an account"
            : t("signIn") || "Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthenticationPanel;

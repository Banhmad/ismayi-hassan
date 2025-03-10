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
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Upload,
  CheckCircle,
  User,
  CreditCard,
  FileText,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface IdentityVerificationProps {
  userType?: "customer" | "provider";
  onComplete?: () => void;
}

const IdentityVerification = ({
  userType = "customer",
  onComplete = () => {},
}: IdentityVerificationProps) => {
  const { t, currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState("id");
  const totalSteps = userType === "customer" ? 3 : 4;
  const isRtl = currentLanguage.direction === "rtl";

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card
      className="w-full max-w-[460px] bg-white"
      dir={currentLanguage.direction}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {t("identityVerification") || "Identity Verification"}
        </CardTitle>
        <CardDescription className="text-center">
          {userType === "customer"
            ? t("verifyIdentity") ||
              "Verify your identity to access our services"
            : t("completeVerification") ||
              "Complete verification to become a service provider"}
        </CardDescription>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("personalInfo") || "Personal Information"}
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <Input id="dob" type="date" />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  Address
                </label>
                <Input id="address" placeholder="Enter your address" />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number
                </label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("documentVerification") || "Document Verification"}
            </h3>
            <Tabs defaultValue="id" onValueChange={setDocumentType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="id">ID Card</TabsTrigger>
                <TabsTrigger value="passport">Passport</TabsTrigger>
                <TabsTrigger value="license">Driver's License</TabsTrigger>
              </TabsList>
              <TabsContent value="id" className="space-y-4 mt-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload front of ID Card</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select File
                  </Button>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload back of ID Card</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select File
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="passport" className="space-y-4 mt-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Passport</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select File
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="license" className="space-y-4 mt-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    Upload front of Driver's License
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select File
                  </Button>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    Upload back of Driver's License
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or PDF, file size no more than 10MB
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Select File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("selfieVerification") || "Selfie Verification"}
            </h3>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Take a selfie</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Make sure your face is clearly visible and well-lit
              </p>
              <Button className="w-full">Take Photo</Button>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your selfie will be compared with your ID document to verify
                  your identity. This helps us maintain a secure platform for
                  all users.
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && userType === "provider" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("businessVerification") || "Business Verification"}
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium mb-1"
                >
                  Business Name
                </label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <label
                  htmlFor="businessType"
                  className="block text-sm font-medium mb-1"
                >
                  Business Type
                </label>
                <Input
                  id="businessType"
                  placeholder="e.g. Restaurant, Accommodation, etc."
                />
              </div>
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Registration Number
                </label>
                <Input
                  id="registrationNumber"
                  placeholder="Enter business registration number"
                />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center mt-4">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Upload Business License</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Select File
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t("back") || "Back"}
        </Button>
        <Button onClick={handleNext}>
          {currentStep === totalSteps
            ? t("complete") || "Complete"
            : t("next") || "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IdentityVerification;

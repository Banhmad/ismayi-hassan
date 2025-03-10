import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Car,
  Truck,
  Bike,
  Package,
  MapPin,
  Clock,
  CreditCard,
  Calendar,
  Users,
  ChevronRight,
  Star,
  Info,
} from "lucide-react";

interface TransportationServiceProps {
  serviceType?: "delivery" | "ride" | "all";
}

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  time: string;
  rating: number;
  available: boolean;
}

const deliveryOptions: ServiceOption[] = [
  {
    id: "express",
    name: "Express Delivery",
    description: "Fast delivery within 1-2 hours",
    icon: <Bike className="h-8 w-8" />,
    price: 15.99,
    time: "1-2 hours",
    rating: 4.8,
    available: true,
  },
  {
    id: "same-day",
    name: "Same Day Delivery",
    description: "Delivery by end of day",
    icon: <Car className="h-8 w-8" />,
    price: 9.99,
    time: "3-6 hours",
    rating: 4.6,
    available: true,
  },
  {
    id: "scheduled",
    name: "Scheduled Delivery",
    description: "Choose your delivery time",
    icon: <Calendar className="h-8 w-8" />,
    price: 7.99,
    time: "You choose",
    rating: 4.7,
    available: true,
  },
  {
    id: "large-items",
    name: "Large Item Delivery",
    description: "For furniture and bulky items",
    icon: <Truck className="h-8 w-8" />,
    price: 24.99,
    time: "1-2 days",
    rating: 4.5,
    available: true,
  },
];

const rideOptions: ServiceOption[] = [
  {
    id: "economy",
    name: "Economy Ride",
    description: "Affordable everyday rides",
    icon: <Car className="h-8 w-8" />,
    price: 12.99,
    time: "10-15 min",
    rating: 4.5,
    available: true,
  },
  {
    id: "premium",
    name: "Premium Ride",
    description: "Luxury vehicles for comfort",
    icon: <Car className="h-8 w-8" />,
    price: 24.99,
    time: "8-12 min",
    rating: 4.8,
    available: true,
  },
  {
    id: "shared",
    name: "Shared Ride",
    description: "Share your ride and save",
    icon: <Users className="h-8 w-8" />,
    price: 7.99,
    time: "15-25 min",
    rating: 4.3,
    available: false,
  },
  {
    id: "xl",
    name: "XL Ride",
    description: "Spacious vehicles for groups",
    icon: <Truck className="h-8 w-8" />,
    price: 29.99,
    time: "12-18 min",
    rating: 4.6,
    available: true,
  },
];

const TransportationService = ({
  serviceType = "all",
}: TransportationServiceProps) => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [activeTab, setActiveTab] = useState<"delivery" | "ride">(
    serviceType !== "ride" ? "delivery" : "ride",
  );
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Show only relevant tabs based on serviceType prop
  const showDeliveryTab = serviceType === "all" || serviceType === "delivery";
  const showRideTab = serviceType === "all" || serviceType === "ride";

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">
          {t("transportationServices") || "Transportation Services"}
        </h1>

        {/* Service Type Tabs */}
        {serviceType === "all" && (
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "delivery" | "ride")
            }
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="delivery" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>{t("delivery") || "Delivery"}</span>
              </TabsTrigger>
              <TabsTrigger value="ride" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>{t("ride") || "Ride"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="delivery">
              <DeliveryContent
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                dropoffLocation={dropoffLocation}
                setDropoffLocation={setDropoffLocation}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isRtl={isRtl}
              />
            </TabsContent>

            <TabsContent value="ride">
              <RideContent
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                dropoffLocation={dropoffLocation}
                setDropoffLocation={setDropoffLocation}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isRtl={isRtl}
              />
            </TabsContent>
          </Tabs>
        )}

        {/* Only Delivery Content */}
        {serviceType === "delivery" && (
          <DeliveryContent
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            dropoffLocation={dropoffLocation}
            setDropoffLocation={setDropoffLocation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isRtl={isRtl}
          />
        )}

        {/* Only Ride Content */}
        {serviceType === "ride" && (
          <RideContent
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            dropoffLocation={dropoffLocation}
            setDropoffLocation={setDropoffLocation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isRtl={isRtl}
          />
        )}

        {/* Integration with Retail/Grocery */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">
                {t("retailIntegration") || "Integration with Retail & Grocery"}
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                {t("retailIntegrationDescription") ||
                  "Our delivery services are fully integrated with retail and grocery stores. When you make a purchase, you can select one of our delivery options directly at checkout."}
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="bg-white">
                  {t("learnMore") || "Learn More"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContentProps {
  pickupLocation: string;
  setPickupLocation: (value: string) => void;
  dropoffLocation: string;
  setDropoffLocation: (value: string) => void;
  selectedOption: string | null;
  setSelectedOption: (value: string | null) => void;
  isRtl: boolean;
}

const DeliveryContent = ({
  pickupLocation,
  setPickupLocation,
  dropoffLocation,
  setDropoffLocation,
  selectedOption,
  setSelectedOption,
  isRtl,
}: ContentProps) => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("pickupLocation") || "Pickup Location"}
          </label>
          <div className="relative">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`}
            />
            <Input
              placeholder={t("enterPickupAddress") || "Enter pickup address"}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className={isRtl ? "pr-10" : "pl-10"}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("dropoffLocation") || "Dropoff Location"}
          </label>
          <div className="relative">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`}
            />
            <Input
              placeholder={t("enterDropoffAddress") || "Enter dropoff address"}
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className={isRtl ? "pr-10" : "pl-10"}
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">
        {t("deliveryOptions") || "Delivery Options"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all ${selectedOption === option.id ? "ring-2 ring-primary" : "hover:border-primary"} ${!option.available ? "opacity-60" : ""}`}
            onClick={() => option.available && setSelectedOption(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {!option.available && (
                      <Badge variant="outline" className="bg-gray-100">
                        {t("unavailable") || "Unavailable"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{option.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm">{option.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-primary">
                      ${option.price.toFixed(2)}
                    </span>
                    {selectedOption === option.id && (
                      <Badge className="bg-primary">
                        {t("selected") || "Selected"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {t("estimatedTotal") || "Estimated Total"}
          </p>
          <p className="text-xl font-bold">
            $
            {selectedOption
              ? deliveryOptions
                  .find((o) => o.id === selectedOption)
                  ?.price.toFixed(2) || "0.00"
              : "0.00"}
          </p>
        </div>
        <Button
          disabled={!selectedOption || !pickupLocation || !dropoffLocation}
        >
          {t("continueToPayment") || "Continue to Payment"}
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {t("paymentMethods") || "Payment Methods"}
        </h3>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {t("securePayment") || "Secure Payment"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Button variant="outline" className="justify-start">
          <CreditCard className="h-4 w-4 mr-2" />
          {t("creditCard") || "Credit Card"}
        </Button>
        <Button variant="outline" className="justify-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png"
            alt="PayPal"
            className="h-4 mr-2"
          />
          PayPal
        </Button>
        <Button variant="outline" className="justify-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png"
            alt="Apple Pay"
            className="h-4 mr-2"
          />
          Apple Pay
        </Button>
        <Button variant="outline" className="justify-start">
          <Package className="h-4 w-4 mr-2" />
          {t("cashOnDelivery") || "Cash on Delivery"}
        </Button>
      </div>
    </div>
  );
};

const RideContent = ({
  pickupLocation,
  setPickupLocation,
  dropoffLocation,
  setDropoffLocation,
  selectedOption,
  setSelectedOption,
  isRtl,
}: ContentProps) => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("pickupLocation") || "Pickup Location"}
          </label>
          <div className="relative">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`}
            />
            <Input
              placeholder={t("enterPickupAddress") || "Enter pickup address"}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className={isRtl ? "pr-10" : "pl-10"}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("destination") || "Destination"}
          </label>
          <div className="relative">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-5 w-5 text-muted-foreground`}
            />
            <Input
              placeholder={t("enterDestination") || "Enter destination"}
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className={isRtl ? "pr-10" : "pl-10"}
            />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">
        {t("rideOptions") || "Ride Options"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rideOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all ${selectedOption === option.id ? "ring-2 ring-primary" : "hover:border-primary"} ${!option.available ? "opacity-60" : ""}`}
            onClick={() => option.available && setSelectedOption(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {!option.available && (
                      <Badge variant="outline" className="bg-gray-100">
                        {t("unavailable") || "Unavailable"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{option.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm">{option.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-primary">
                      ${option.price.toFixed(2)}
                    </span>
                    {selectedOption === option.id && (
                      <Badge className="bg-primary">
                        {t("selected") || "Selected"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {t("estimatedTotal") || "Estimated Total"}
          </p>
          <p className="text-xl font-bold">
            $
            {selectedOption
              ? rideOptions
                  .find((o) => o.id === selectedOption)
                  ?.price.toFixed(2) || "0.00"
              : "0.00"}
          </p>
        </div>
        <Button
          disabled={!selectedOption || !pickupLocation || !dropoffLocation}
        >
          {t("bookRide") || "Book Ride"}
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {t("paymentMethods") || "Payment Methods"}
        </h3>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {t("securePayment") || "Secure Payment"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Button variant="outline" className="justify-start">
          <CreditCard className="h-4 w-4 mr-2" />
          {t("creditCard") || "Credit Card"}
        </Button>
        <Button variant="outline" className="justify-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png"
            alt="PayPal"
            className="h-4 mr-2"
          />
          PayPal
        </Button>
        <Button variant="outline" className="justify-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png"
            alt="Apple Pay"
            className="h-4 mr-2"
          />
          Apple Pay
        </Button>
        <Button variant="outline" className="justify-start">
          <Package className="h-4 w-4 mr-2" />
          {t("cash") || "Cash"}
        </Button>
      </div>
    </div>
  );
};

export default TransportationService;

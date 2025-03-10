import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RetailStore {
  id: string;
  name: string;
  type: string;
  rating: number;
  image: string;
  location: string;
  distance: number; // in km
  description: string;
  isOnline: boolean;
}

const mockStores: RetailStore[] = [
  {
    id: "1",
    name: "City Mall",
    type: "Shopping Mall",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80",
    location: "Downtown, Riyadh",
    distance: 1.2,
    description:
      "A premium shopping destination with over 200 stores including fashion, electronics, and home goods.",
    isOnline: false,
  },
  {
    id: "2",
    name: "Tech Haven",
    type: "Electronics",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80",
    location: "Al Olaya, Riyadh",
    distance: 2.5,
    description:
      "Specialized electronics store offering the latest gadgets, computers, and smart home devices.",
    isOnline: false,
  },
  {
    id: "grocery1",
    name: "Fresh Market",
    type: "Grocery",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    location: "Al Muruj, Riyadh",
    distance: 0.8,
    description:
      "Fresh produce, meats, dairy and household essentials with same-day delivery options.",
    isOnline: false,
  },
  {
    id: "grocery2",
    name: "Organic Basket",
    type: "Grocery",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&q=80",
    location: "Al Olaya, Riyadh",
    distance: 3.2,
    description:
      "Organic and locally sourced groceries with a focus on healthy and sustainable products.",
    isOnline: false,
  },
  {
    id: "3",
    name: "Fashion Forward",
    type: "Clothing",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    location: "Al Nakheel, Riyadh",
    distance: 3.8,
    description:
      "Trendy fashion boutique featuring local and international designer collections.",
    isOnline: false,
  },
  {
    id: "4",
    name: "Home Essentials",
    type: "Home Goods",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    location: "Al Malqa, Riyadh",
    distance: 5.1,
    description:
      "Everything you need for your home from furniture to kitchen appliances and decor.",
    isOnline: false,
  },
  {
    id: "5",
    name: "Global Marketplace",
    type: "Online Store",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    location: "Online",
    distance: 0,
    description:
      "International online marketplace with millions of products and fast shipping worldwide.",
    isOnline: true,
  },
  {
    id: "6",
    name: "Local Artisan Market",
    type: "Specialty",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    location: "Al Diriyah, Riyadh",
    distance: 7.3,
    description:
      "Showcase of local artisans featuring handmade crafts, jewelry, and unique gifts.",
    isOnline: false,
  },
  {
    id: "7",
    name: "Quick Shop",
    type: "Convenience",
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?w=800&q=80",
    location: "Al Muruj, Riyadh",
    distance: 0.5,
    description:
      "Neighborhood convenience store for everyday essentials and quick shopping needs.",
    isOnline: false,
  },
  {
    id: "8",
    name: "Digital Emporium",
    type: "Online Store",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    location: "Online",
    distance: 0,
    description:
      "Digital marketplace specializing in software, games, and digital content.",
    isOnline: true,
  },
];

const RetailList = () => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [searchTerm, setSearchTerm] = useState("");
  const [distanceRange, setDistanceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [storeTypes, setStoreTypes] = useState<Record<string, boolean>>({
    "Shopping Mall": true,
    Electronics: true,
    Clothing: true,
    "Home Goods": true,
    "Online Store": true,
    Specialty: true,
    Convenience: true,
    Grocery: true,
  });

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showLocalOnly, setShowLocalOnly] = useState(false);

  // Filter stores based on search term, distance range, and store types
  const filteredStores = mockStores.filter((store) => {
    // Filter by search term
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by distance
    const matchesDistance =
      store.isOnline ||
      (store.distance >= distanceRange[0] &&
        store.distance <= distanceRange[1]);

    // Filter by store type
    const matchesType = storeTypes[store.type];

    // Filter by online/local preference
    const matchesOnlinePreference =
      (showOnlineOnly ? store.isOnline : true) &&
      (showLocalOnly ? !store.isOnline : true);

    return (
      matchesSearch && matchesDistance && matchesType && matchesOnlinePreference
    );
  });

  // Toggle store type filter
  const toggleStoreType = (type: string) => {
    setStoreTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      <h1 className="text-3xl font-bold mb-6">
        {t("retailStores") || "Retail Stores"}
      </h1>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
            />
            <Input
              type="text"
              placeholder={
                t("searchStores") ||
                "Search for stores, products, or categories..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={isRtl ? "pr-9" : "pl-9"}
            />
          </div>

          <div className="relative w-full md:w-[200px]">
            <MapPin
              className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
            />
            <Input
              type="text"
              placeholder={t("location") || "Location"}
              className={isRtl ? "pr-9" : "pl-9"}
            />
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {t("filter") || "Filter"}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t pt-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">
                  {t("distance") || "Distance"}
                </h3>
                <div className="px-3">
                  <Slider
                    defaultValue={[0, 10]}
                    max={20}
                    step={0.5}
                    value={distanceRange}
                    onValueChange={setDistanceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{distanceRange[0]} km</span>
                    <span>{distanceRange[1]} km</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t("storeType") || "Store Type"}
                </h3>
                <div className="space-y-2">
                  {Object.keys(storeTypes).map((type) => (
                    <div
                      key={type}
                      className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                    >
                      <Checkbox
                        id={`type-${type}`}
                        checked={storeTypes[type]}
                        onCheckedChange={() => toggleStoreType(type)}
                      />
                      <Label htmlFor={`type-${type}`}>
                        {t(type.toLowerCase().replace(" ", "")) || type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">
                  {t("preferences") || "Preferences"}
                </h3>
                <div className="space-y-2">
                  <div
                    className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                  >
                    <Checkbox
                      id="online-only"
                      checked={showOnlineOnly}
                      onCheckedChange={(checked) => {
                        setShowOnlineOnly(!!checked);
                        if (checked) setShowLocalOnly(false);
                      }}
                    />
                    <Label htmlFor="online-only">
                      {t("onlineStoresOnly") || "Online stores only"}
                    </Label>
                  </div>
                  <div
                    className={`flex items-center ${isRtl ? "space-x-reverse" : ""} space-x-2`}
                  >
                    <Checkbox
                      id="local-only"
                      checked={showLocalOnly}
                      onCheckedChange={(checked) => {
                        setShowLocalOnly(!!checked);
                        if (checked) setShowOnlineOnly(false);
                      }}
                    />
                    <Label htmlFor="local-only">
                      {t("localStoresOnly") || "Local stores only"}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button className="bg-primary text-white hover:bg-primary/90">
                {t("applyFilters") || "Apply Filters"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Store List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
                {store.isOnline && (
                  <Badge className="absolute top-2 right-2 bg-blue-500">
                    {t("online") || "Online"}
                  </Badge>
                )}
                {!store.isOnline && (
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    {store.distance.toFixed(1)} km
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {store.type}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{store.rating}</span>
                  </div>
                </div>
                <p className="text-sm mt-2">{store.description}</p>
                <div className="flex items-center mt-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{store.location}</span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => (window.location.href = `/retail/${store.id}`)}
                >
                  {t("viewStore") || "View Store"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">
              {t("noStoresFound") || "No stores found matching your criteria"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setDistanceRange([0, 10]);
                setShowOnlineOnly(false);
                setShowLocalOnly(false);
                setStoreTypes({
                  "Shopping Mall": true,
                  Electronics: true,
                  Clothing: true,
                  "Home Goods": true,
                  "Online Store": true,
                  Specialty: true,
                  Convenience: true,
                  Grocery: true,
                });
              }}
            >
              {t("resetFilters") || "Reset Filters"}
            </Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredStores.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-1">
            {t("previous") || "Previous"}
          </Button>
          <Button variant="outline" className="mx-1 bg-primary text-white">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            {t("next") || "Next"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RetailList;

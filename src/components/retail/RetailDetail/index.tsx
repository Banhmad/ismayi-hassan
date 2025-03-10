import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Mail,
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Truck,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

interface RetailStore {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  images: string[];
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: Record<string, string>;
  description: string;
  isOnline: boolean;
  products: Product[];
  features: string[];
}

// Mock data for a single retail store
const mockStores: Record<string, RetailStore> = {
  grocery1: {
    id: "grocery1",
    name: "Fresh Market",
    type: "Grocery",
    rating: 4.6,
    reviewCount: 112,
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&q=80",
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80",
    ],
    location: "Al Muruj, Riyadh",
    address: "123 Market Street, Al Muruj, Riyadh, Saudi Arabia",
    phone: "+966 12 345 6789",
    email: "info@freshmarket.com",
    website: "www.freshmarket.com",
    hours: {
      Monday: "7:00 AM - 11:00 PM",
      Tuesday: "7:00 AM - 11:00 PM",
      Wednesday: "7:00 AM - 11:00 PM",
      Thursday: "7:00 AM - 12:00 AM",
      Friday: "2:00 PM - 12:00 AM",
      Saturday: "7:00 AM - 11:00 PM",
      Sunday: "7:00 AM - 11:00 PM",
    },
    description:
      "Fresh Market offers a wide selection of fresh produce, meats, dairy products, and household essentials. We pride ourselves on quality, freshness, and excellent customer service with convenient delivery options.",
    isOnline: false,
    products: [
      {
        id: "p1",
        name: "Organic Vegetables Basket",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&q=80",
        category: "Fresh Produce",
        rating: 4.8,
        inStock: true,
      },
      {
        id: "p2",
        name: "Premium Beef Cuts",
        price: 45.99,
        image:
          "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
        category: "Meat",
        rating: 4.7,
        inStock: true,
      },
      {
        id: "p3",
        name: "Fresh Dairy Selection",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80",
        category: "Dairy",
        rating: 4.5,
        inStock: true,
      },
      {
        id: "p4",
        name: "Artisan Bread",
        price: 4.99,
        image:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=800&q=80",
        category: "Bakery",
        rating: 4.6,
        inStock: true,
      },
      {
        id: "p5",
        name: "Imported Cheese Selection",
        price: 32.99,
        image:
          "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80",
        category: "Dairy",
        rating: 4.9,
        inStock: false,
      },
      {
        id: "p6",
        name: "Household Essentials Pack",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
        category: "Household",
        rating: 4.4,
        inStock: true,
      },
    ],
    features: [
      "Same-Day Delivery",
      "Online Ordering",
      "Fresh Produce Guarantee",
      "Organic Section",
      "Local Products",
      "Loyalty Program",
      "Cash on Delivery",
      "Contactless Pickup",
    ],
  },
  grocery2: {
    id: "grocery2",
    name: "Organic Basket",
    type: "Grocery",
    rating: 4.4,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&q=80",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80",
      "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&q=80",
    ],
    location: "Al Olaya, Riyadh",
    address: "456 Green Street, Al Olaya, Riyadh, Saudi Arabia",
    phone: "+966 12 345 7890",
    email: "info@organicbasket.com",
    website: "www.organicbasket.com",
    hours: {
      Monday: "8:00 AM - 10:00 PM",
      Tuesday: "8:00 AM - 10:00 PM",
      Wednesday: "8:00 AM - 10:00 PM",
      Thursday: "8:00 AM - 10:00 PM",
      Friday: "2:00 PM - 10:00 PM",
      Saturday: "8:00 AM - 10:00 PM",
      Sunday: "8:00 AM - 10:00 PM",
    },
    description:
      "Organic Basket specializes in organic and locally sourced groceries with a focus on healthy and sustainable products. We work directly with local farmers to bring you the freshest organic produce and natural products.",
    isOnline: false,
    products: [
      {
        id: "p1",
        name: "Organic Fruit Box",
        price: 35.99,
        image:
          "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
        category: "Organic Produce",
        rating: 4.7,
        inStock: true,
      },
      {
        id: "p2",
        name: "Local Honey",
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80",
        category: "Local Products",
        rating: 4.9,
        inStock: true,
      },
      {
        id: "p3",
        name: "Organic Grains Pack",
        price: 18.99,
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?w=800&q=80",
        category: "Grains",
        rating: 4.5,
        inStock: true,
      },
      {
        id: "p4",
        name: "Natural Cleaning Kit",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80",
        category: "Household",
        rating: 4.3,
        inStock: false,
      },
      {
        id: "p5",
        name: "Organic Tea Selection",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
        category: "Beverages",
        rating: 4.6,
        inStock: true,
      },
      {
        id: "p6",
        name: "Sustainable Kitchen Tools",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80",
        category: "Kitchen",
        rating: 4.4,
        inStock: true,
      },
    ],
    features: [
      "100% Organic Products",
      "Local Farmer Partnerships",
      "Eco-friendly Packaging",
      "Sustainable Practices",
      "Home Delivery",
      "Subscription Boxes",
      "Zero-waste Options",
      "Educational Workshops",
    ],
  },
  "1": {
    id: "1",
    name: "City Mall",
    type: "Shopping Mall",
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    ],
    location: "Downtown, Riyadh",
    address: "123 Main Street, Downtown, Riyadh, Saudi Arabia",
    phone: "+966 12 345 6789",
    email: "info@citymall.com",
    website: "www.citymall.com",
    hours: {
      Monday: "10:00 AM - 10:00 PM",
      Tuesday: "10:00 AM - 10:00 PM",
      Wednesday: "10:00 AM - 10:00 PM",
      Thursday: "10:00 AM - 11:00 PM",
      Friday: "2:00 PM - 11:00 PM",
      Saturday: "10:00 AM - 11:00 PM",
      Sunday: "10:00 AM - 10:00 PM",
    },
    description:
      "A premium shopping destination with over 200 stores including fashion, electronics, and home goods. City Mall offers a complete shopping experience with restaurants, entertainment options, and services all under one roof.",
    isOnline: false,
    products: [
      {
        id: "p1",
        name: "Premium Leather Jacket",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        category: "Fashion",
        rating: 4.7,
        inStock: true,
      },
      {
        id: "p2",
        name: "Wireless Headphones",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        category: "Electronics",
        rating: 4.5,
        inStock: true,
      },
      {
        id: "p3",
        name: "Designer Sunglasses",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
        category: "Accessories",
        rating: 4.3,
        inStock: true,
      },
      {
        id: "p4",
        name: "Smart Watch",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        category: "Electronics",
        rating: 4.6,
        inStock: false,
      },
      {
        id: "p5",
        name: "Premium Perfume",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
        category: "Beauty",
        rating: 4.4,
        inStock: true,
      },
      {
        id: "p6",
        name: "Luxury Watch",
        price: 499.99,
        image:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
        category: "Accessories",
        rating: 4.8,
        inStock: true,
      },
    ],
    features: [
      "Free Parking",
      "Restaurants & Cafes",
      "Cinema",
      "Children's Play Area",
      "Prayer Rooms",
      "Wi-Fi",
      "ATM Machines",
      "Wheelchair Accessible",
    ],
  },
  "2": {
    id: "2",
    name: "Tech Haven",
    type: "Electronics",
    rating: 4.7,
    reviewCount: 95,
    images: [
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    ],
    location: "Al Olaya, Riyadh",
    address: "456 Tech Street, Al Olaya, Riyadh, Saudi Arabia",
    phone: "+966 12 345 7890",
    email: "support@techhaven.com",
    website: "www.techhaven.com",
    hours: {
      Monday: "9:00 AM - 9:00 PM",
      Tuesday: "9:00 AM - 9:00 PM",
      Wednesday: "9:00 AM - 9:00 PM",
      Thursday: "9:00 AM - 10:00 PM",
      Friday: "2:00 PM - 10:00 PM",
      Saturday: "9:00 AM - 10:00 PM",
      Sunday: "9:00 AM - 9:00 PM",
    },
    description:
      "Specialized electronics store offering the latest gadgets, computers, and smart home devices. Our expert staff provides personalized recommendations and technical support for all your technology needs.",
    isOnline: false,
    products: [
      {
        id: "p1",
        name: "Ultra HD Smart TV",
        price: 899.99,
        image:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
        category: "TVs",
        rating: 4.8,
        inStock: true,
      },
      {
        id: "p2",
        name: "Professional Camera",
        price: 1299.99,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
        category: "Cameras",
        rating: 4.7,
        inStock: true,
      },
      {
        id: "p3",
        name: "Gaming Laptop",
        price: 1499.99,
        image:
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        category: "Computers",
        rating: 4.6,
        inStock: true,
      },
      {
        id: "p4",
        name: "Wireless Earbuds",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
        category: "Audio",
        rating: 4.5,
        inStock: true,
      },
      {
        id: "p5",
        name: "Smart Home Hub",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?w=800&q=80",
        category: "Smart Home",
        rating: 4.4,
        inStock: false,
      },
      {
        id: "p6",
        name: "Portable SSD",
        price: 159.99,
        image:
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80",
        category: "Storage",
        rating: 4.6,
        inStock: true,
      },
    ],
    features: [
      "Technical Support",
      "Product Demonstrations",
      "Extended Warranty Options",
      "Trade-in Program",
      "Repair Services",
      "Free Delivery",
      "Installation Services",
      "Customer Loyalty Program",
    ],
  },
};

const RetailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const store = mockStores[id || "1"] || mockStores["1"];
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = store.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Navigate through store images
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === store.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? store.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Store Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary">{store.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{store.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-primary text-lg mr-1">
                {store.rating}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(store.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                ({store.reviewCount} {t("reviews") || "reviews"})
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div className="h-[400px] overflow-hidden">
            <img
              src={store.images[currentImageIndex]}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {store.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-4 border-b">
          <Button variant="outline" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {t("saveToFavorites") || "Save to Favorites"}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            {t("share") || "Share"}
          </Button>
          <Button className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            {t("shopNow") || "Shop Now"}
          </Button>
        </div>

        {/* Delivery Options Banner */}
        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="font-medium text-blue-800">
                {t("deliveryAvailable") || "Delivery Available"}
              </p>
              <p className="text-sm text-blue-700">
                {t("deliveryOptionsAvailable") ||
                  "Multiple delivery options available for this store."}
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600"
                  onClick={() => (window.location.href = "/transportation")}
                >
                  {t("viewDeliveryOptions") || "View delivery options"}
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Options Banner */}
        <div className="p-4 bg-green-50 border-b">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="font-medium text-green-800">
                {t("paymentOptions") || "Payment Options"}
              </p>
              <p className="text-sm text-green-700">
                {t("paymentOptionsDescription") ||
                  "Pay online or cash on delivery."}
                {store.type === "Grocery" && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-green-600"
                    onClick={() => (window.location.href = "/grocery")}
                  >
                    {t("viewGroceryStore") || "View grocery store"}
                  </Button>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for Details, Products, Location, Reviews */}
        <div className="p-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">
                {t("details") || "Details"}
              </TabsTrigger>
              <TabsTrigger value="products">
                {t("products") || "Products"}
              </TabsTrigger>
              <TabsTrigger value="location">
                {t("location") || "Location"}
              </TabsTrigger>
              <TabsTrigger value="reviews">
                {t("reviews") || "Reviews"}
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t("aboutStore") || "About the Store"}
                  </h3>
                  <p className="text-muted-foreground">{store.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {t("storeInformation") || "Store Information"}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-2" />
                        <span>{store.address}</span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-2" />
                        <span>{store.phone}</span>
                      </li>
                      <li className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <span>{store.email}</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="h-5 w-5 text-primary mr-2" />
                        <span>{store.website}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      {t("openingHours") || "Opening Hours"}
                    </h3>
                    <ul className="space-y-2">
                      {Object.entries(store.hours).map(([day, hours]) => (
                        <li key={day} className="flex justify-between">
                          <span className="font-medium">{day}</span>
                          <span>{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t("features") || "Features & Amenities"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {store.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-6">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder={t("searchProducts") || "Search products..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="relative h-48">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {!product.inStock && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {t("outOfStock") || "Out of Stock"}
                          </Badge>
                        )}
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{product.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </div>
                        <Button
                          className="w-full mt-3"
                          disabled={!product.inStock}
                        >
                          {product.inStock
                            ? t("addToCart") || "Add to Cart"
                            : t("notifyMe") || "Notify Me"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {t("noProductsFound") ||
                      "No products found matching your search"}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    {t("clearSearch") || "Clear Search"}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {t("storeLocation") || "Store Location"}
                </h3>
                <p className="text-muted-foreground">{store.address}</p>
                <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                  {/* This would be a real map in a production app */}
                  <p className="text-muted-foreground">
                    {t("mapPlaceholder") || "Map would be displayed here"}
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    {t("directions") || "Directions"}
                  </h4>
                  <p className="text-muted-foreground">
                    {t("directionsPlaceholder") ||
                      "Directions and transportation options would be shown here."}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {t("customerReviews") || "Customer Reviews"} (
                    {store.reviewCount})
                  </h3>
                  <div className="flex items-center">
                    <span className="font-bold text-primary text-lg mr-1">
                      {store.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(store.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  {t("writeReview") || "Write a Review"}
                </Button>

                <Separator />

                {/* Sample reviews would go here */}
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    {t("reviewsPlaceholder") ||
                      "Customer reviews would be displayed here."}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RetailDetail;

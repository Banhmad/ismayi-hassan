import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Clock,
  Truck,
  CreditCard,
  Banknote,
  Star,
  Filter,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  unit: string;
  inStock: boolean;
  description?: string;
}

interface GroceryStoreProps {
  storeId?: string;
}

const categories = [
  "all",
  "fruits",
  "vegetables",
  "dairy",
  "meat",
  "bakery",
  "beverages",
  "snacks",
  "household",
];

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Fresh Apples",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80",
    category: "fruits",
    unit: "kg",
    inStock: true,
    description: "Fresh and juicy red apples, perfect for snacking or baking.",
  },
  {
    id: "p2",
    name: "Organic Bananas",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80",
    category: "fruits",
    unit: "bunch",
    inStock: true,
    description: "Organic bananas, rich in potassium and naturally sweet.",
  },
  {
    id: "p3",
    name: "Fresh Milk",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80",
    category: "dairy",
    unit: "liter",
    inStock: true,
    description: "Fresh pasteurized milk, rich in calcium and protein.",
  },
  {
    id: "p4",
    name: "Whole Wheat Bread",
    price: 3.25,
    image:
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80",
    category: "bakery",
    discount: 10,
    unit: "loaf",
    inStock: true,
    description:
      "Freshly baked whole wheat bread, perfect for sandwiches and toast.",
  },
  {
    id: "p5",
    name: "Fresh Tomatoes",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
    category: "vegetables",
    unit: "kg",
    inStock: true,
    description: "Ripe and juicy tomatoes, perfect for salads and cooking.",
  },
  {
    id: "p6",
    name: "Chicken Breast",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
    category: "meat",
    unit: "kg",
    inStock: true,
    description:
      "Fresh boneless chicken breast, high in protein and versatile for many recipes.",
  },
  {
    id: "p7",
    name: "Sparkling Water",
    price: 1.99,
    image:
      "https://images.unsplash.com/photo-1606168094336-48f8b0c41288?w=800&q=80",
    category: "beverages",
    unit: "bottle",
    inStock: true,
    description:
      "Refreshing sparkling water, perfect for hydration without calories.",
  },
  {
    id: "p8",
    name: "Potato Chips",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&q=80",
    category: "snacks",
    unit: "pack",
    inStock: true,
    description: "Crispy potato chips, perfect for snacking.",
  },
  {
    id: "p9",
    name: "Laundry Detergent",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1585441695325-21557ef6ad06?w=800&q=80",
    category: "household",
    unit: "bottle",
    inStock: true,
    description: "Effective laundry detergent for clean and fresh clothes.",
  },
  {
    id: "p10",
    name: "Organic Eggs",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80",
    category: "dairy",
    unit: "dozen",
    inStock: false,
    description: "Farm-fresh organic eggs from free-range chickens.",
  },
  {
    id: "p11",
    name: "Fresh Carrots",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    category: "vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh and crunchy carrots, rich in vitamins and minerals.",
  },
  {
    id: "p12",
    name: "Orange Juice",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
    category: "beverages",
    discount: 15,
    unit: "bottle",
    inStock: true,
    description: "100% pure orange juice, no added sugar or preservatives.",
  },
];

const GroceryStore = ({ storeId = "grocery1" }: GroceryStoreProps) => {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage.direction === "rtl";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate cart total
  const cartTotal = Object.keys(cart).reduce((total, productId) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return total + price * cart[productId];
    }
    return total;
  }, 0);

  // Add product to cart
  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  // Get quantity of product in cart
  const getCartQuantity = (productId: string) => {
    return cart[productId] || 0;
  };

  return (
    <div className={`container mx-auto py-8 px-4 ${isRtl ? "rtl" : "ltr"}`}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {t("groceryStore") || "Grocery Store"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
              />
              <Input
                type="text"
                placeholder={t("searchProducts") || "Search products..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-[200px] md:w-[300px] ${isRtl ? "pr-9" : "pl-9"}`}
              />
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
            >
              <Truck className="h-4 w-4" />
              {t("deliveryInfo") || "Delivery Info"}
            </Button>

            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>{t("cart") || "Cart"}</span>
                {Object.keys(cart).length > 0 && (
                  <Badge className="ml-1 bg-primary text-white">
                    {Object.values(cart).reduce((a, b) => a + b, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        {showDeliveryInfo && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-blue-800 mb-2">
              {t("deliveryOptions") || "Delivery Options"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {t("deliveryTime") || "Delivery Time"}
                  </p>
                  <p className="text-sm text-blue-700">
                    {t("deliveryTimeDescription") ||
                      "Same day delivery for orders before 2 PM, next day for later orders."}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {t("deliveryFee") || "Delivery Fee"}
                  </p>
                  <p className="text-sm text-blue-700">
                    {t("deliveryFeeDescription") ||
                      "Free delivery for orders over $30, otherwise $5 delivery fee."}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {t("paymentOptions") || "Payment Options"}
                  </p>
                  <p className="text-sm text-blue-700">
                    {t("paymentOptionsDescription") ||
                      "Pay online or cash on delivery."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="mb-6">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <TabsList className="w-full flex overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex-1">
                  {t(category) ||
                    category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {product.discount}% {t("off") || "OFF"}
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 bg-red-500 rounded">
                        {t("outOfStock") || "Out of Stock"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      {product.discount ? (
                        <div className="flex items-center">
                          <span className="font-bold text-primary">
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 block">
                        {t("per") || "per"} {product.unit}
                      </span>
                    </div>

                    {product.inStock && (
                      <div className="flex items-center">
                        {getCartQuantity(product.id) > 0 ? (
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {getCartQuantity(product.id)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0"
                              onClick={() => addToCart(product.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {t("add") || "Add"}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {t("noProductsFound") || "No products found matching your search"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              {t("clearFilters") || "Clear Filters"}
            </Button>
          </div>
        )}

        {/* Cart Summary (Fixed at bottom) */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}{" "}
                  {t("items") || "items"}
                </span>
                <p className="font-bold text-lg">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  {t("viewCart") || "View Cart"}
                </Button>
                <Button>{t("checkout") || "Checkout"}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryStore;

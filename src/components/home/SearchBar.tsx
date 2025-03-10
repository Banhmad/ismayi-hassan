import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch?: (searchTerm: string, category: string, location: string) => void;
  categories?: Array<{ id: string; name: string }>;
}

const SearchBar = ({
  onSearch = () => {},
  categories = [
    { id: "accommodation", name: "Accommodation" },
    { id: "retail", name: "Retail" },
    { id: "restaurants", name: "Restaurants" },
    { id: "maintenance", name: "Maintenance" },
    { id: "transportation", name: "Transportation" },
    { id: "investments", name: "Investments" },
  ],
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleSearch = () => {
    onSearch(searchTerm, category, location);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg shadow-md p-2 flex flex-col md:flex-row gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="What service are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-full"
        />
      </div>

      <div className="w-full md:w-[180px]">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-[200px] relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-9 w-full"
        />
      </div>

      <Button onClick={handleSearch} className="w-full md:w-auto">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;

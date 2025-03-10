import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  LogIn,
  ChevronDown,
  Settings,
  Calendar,
  Coins,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  onOpenAuth?: () => void;
  isMobile?: boolean;
}

const UserMenu = ({
  onOpenAuth = () => {},
  isMobile = false,
}: UserMenuProps) => {
  const { user, isLoggedIn, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isMobile) {
    return isLoggedIn && user ? (
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user.name}</span>
      </div>
    ) : (
      <Button
        onClick={onOpenAuth}
        className="w-full flex items-center justify-center"
      >
        <LogIn className="h-4 w-4 mr-2" />
        {t("signIn")}
      </Button>
    );
  }

  return isLoggedIn && user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleNavigate("/profile")}>
          <User className="h-4 w-4 mr-2" />
          {t("profile")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/profile?tab=bookings")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {t("myBookings")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/profile?tab=settings")}
        >
          <Settings className="h-4 w-4 mr-2" />
          {t("settings")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/profile?tab=digital-currency")}
        >
          <Coins className="h-4 w-4 mr-2" />
          {t("digitalCurrency")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={onOpenAuth} className="flex items-center">
      <LogIn className="h-4 w-4 mr-2" />
      {t("signIn")}
    </Button>
  );
};

export default UserMenu;

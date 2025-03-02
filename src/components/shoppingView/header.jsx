import {
  HousePlug,
  House,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import UserCartWrapper from "./cartWrapper";
import { fetchAllCartItems } from "@/store/shop/cartSlice";
const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  console.log("user => ", user);
  console.log("cartItems => ", cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(fetchAllCartItems(user?.id));
  }, [dispatch, user, openCartSheet]);

  const menuItems = () => {
    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
        {shoppingViewHeaderMenuItems.map((items) => {
          return (
            <Link
              key={items.id}
              to={items.path}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {items.label}
            </Link>
          );
        })}
      </nav>
    );
  };

  function HeaderRightContent() {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setOpenCartSheet(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">User Cart</span>
          </Button>
          <UserCartWrapper
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
            setOpenCartSheet={setOpenCartSheet}
          />
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" side="right">
            <DropdownMenuLabel className="font-normal">
              Logged in as {user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 w-4 h-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden sm:block"
              variant={"outline"}
              size={"icon"}
            >
              <Menu className="h-6 w-6 d-flex justify-center items-center" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            {menuItems()}
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">{menuItems()}</div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>{" "}
      </div>
    </header>
  );
};

export default ShoppingHeader;

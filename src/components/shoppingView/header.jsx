import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const menuItems = () => {
    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
        {shoppingViewHeaderMenuItems.map((items) => {
          return (
            <Link
              key={items.id}
              to={items.path}
              className="text-sm font-medium"
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
        <Button variant={"outline"} size={"icon"}>
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>

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

            <DropdownMenuItem>
              <UserCog className="mr-2 w-4 h-4" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="mr-2 w-4 h-4" />
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
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            {menuItems()}
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">{menuItems()}</div>

        {isAuthenticated ? <div>{HeaderRightContent()}</div> : null}
      </div>
    </header>
  );
};

export default ShoppingHeader;

"use client";

import React from "react";
import Link from "../Link/Link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { faChartSimple, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
  { href: "/Dashboard", label: "Dashboard", icon: faChartSimple },
  { href: "/Doc", label: "Doc", icon: faBook },
];

const NavbarMain: React.FC = () => {
  const pathname = usePathname();
 const isActive = (path: string) =>
  pathname === path
    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-500 font-semibold rounded-lg shadow-sm"
    : "hover:bg-accent hover:text-foreground/90 rounded-lg transition-all duration-300";

  return (
    <nav className="w-full p-1 fixed z-50 border-b border-accent top-0 bg-card text-foreground">
      <div className="py-1 px-2 mx-auto bg-card flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400  to-emerald-500 bg-clip-text text-transparent">
          SkyMap
          </h1>
        </div>

        {/* Desktop Links + Mode */}
        <div className="flex gap-2 items-center">

          <ul className="hidden md:flex space-x-4 h-[50px] self-center items-center">
            {links.map((link) => (
              <li key={link.href} className="h-[50px] flex items-center">
                <Link
                  href={link.href}
                  className={`hover:bg-accent p-2 rounded-[10px] transition ${isActive(
                    link.href
                  )}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark/Light Toggle */}
          <ModeToggle />

          {/* Mobile Toggle with shadcn */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-xl"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-4 pt-15 bg-card">
              <nav className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 hover:bg-accent p-2 rounded-lg transition-all duration-300 ${isActive(
                      link.href
                    )}`}
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-sm" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        
      </div>
    </nav>
  );
};

export default NavbarMain;

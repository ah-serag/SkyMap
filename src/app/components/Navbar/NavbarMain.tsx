
import React from "react";
import { ModeToggle } from "../ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { faChartSimple, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const links = [
  { href: "/Doc", label: "Doc", icon: faBook },
  { href: "/Dashboard", label: "Dashboard", icon: faChartSimple },
  
];

const NavbarMain: React.FC = () => {


  return (
    <nav className="w-full p-1 fixed z-50 border-b border-accent top-0 bg-card text-foreground">
      <div className="py-1 px-5 mx-auto bg-card flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400  to-emerald-500 bg-clip-text text-transparent">
          SkyMap
          </h1>
        </div>

        {/* Desktop Links + Mode */}
        <div className="flex gap-2 items-center">

          <ul className="hidden  pr-[30px] md:flex space-x-4 h-[50px] self-center items-center">
            {links.map((link) => (
              <li key={link.href} className="h-[50px] flex items-center">
                <Link
                  prefetch={true}
                  href={link.href}
                  className={`hover:bg-accent p-2 rounded-[10px] transition `}
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
                    prefetch={true}

                    className={`flex items-center gap-2 hover:bg-accent p-2 rounded-lg transition-all duration-300`}
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-[15px]" />
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

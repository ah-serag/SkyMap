"use client";

import React, { useState } from "react";
import Link from "../Link/Link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartSimple,
  faBook,
  faCircleInfo,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const links = [
  { href: "/Dashboard", label: "Dashboard", icon: faChartSimple },
  { href: "/Doc", label: "Doc", icon: faBook },
  { href: "/settings", label: "Settings", icon: faGear },
];

const NavbarMain: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) =>  pathname === path ? "border-b-accent border-b-1" : "";
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const { resolvedTheme } = useTheme();

const hiddenPaths = ['/login', '/signUp'];

if (hiddenPaths.includes(pathname)) return null;

  return (
    <nav className="w-full fixed h-[59px] z-50 border-b-1 border-accent top-0 bg-card text-foreground">
      <div className="py-1 px-2 mx-auto bg-card flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          {resolvedTheme === "dark" ? (
            <Image
              src="/photo/AgroMateLogDark.svg"
              alt="Logo (Dark)"
              width={170}
              height={50}
              priority
            />
          ) : (
            <Image
              src="/photo/AgroMateLog.svg"
              alt="Logo (Light)"
              width={170}
              height={50}
              priority

            />
          )}
        </div>

        {/* Desktop Links + Mode */}
        <div className="flex gap-2 items-center">
          <ul className="hidden md:flex space-x-4 h-[50px] items-center">
            {links.map((link) => (
              <li key={link.href} className="h-[50px] flex items-center">
                <Link
                  href={link.href}
                  className={`hover:bg-accent p-2  rounded-[10px] transition ${isActive(
                    link.href
                  )}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/">
                <Button variant="secondary">log out</Button>
              </Link>
            </li>
          </ul>

          <ModeToggle />

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleMobile}
            className={`md:hidden bg-card shadow-sm transition-all duration-300 ease-in-out ${
              isMobileOpen ? "rotate-90" : ""
            } px-2 py-1 text-xl`}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden absolute z-50 w-full bg-card shadow-2xl p-4 border-t-1 border-t-accent">
          <ul className="flex flex-col gap-1 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 hover:bg-accent p-2 transition-all duration-300 ${isActive(
                    link.href
                  )}`}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-sm" />
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex justify-end w-full">
              <Link href="/">
                <Button variant="outline">log out</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarMain;

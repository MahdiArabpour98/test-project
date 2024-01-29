"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { navbarItems } from "./navbar-items";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="mt-3 flex w-full items-center justify-center rounded-lg py-3">
      <div className="flex gap-3">
        {navbarItems.map((item, index) => (
          <Button key={index} asChild>
            <Link
              className={cn(
                "flex gap-1 border border-gold bg-transparent !text-gold hover:!bg-gold hover:!text-white",
                item.href === pathName && "!bg-gold !text-white",
              )}
              href={String(item.href)}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
        <Button
          className={
            "flex gap-1 border border-gold bg-transparent !text-gold hover:!bg-gold hover:!text-white"
          }
          onClick={() => signOut()}
        >
          <span>
            <LogOut size={16} />
          </span>
          <span>خروج</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;

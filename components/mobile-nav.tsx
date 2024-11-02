"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Menu className="h-7 w-7 text-white cursor-pointer lg:hidden" />
        </SheetTrigger>
        <SheetContent
          className="bg-slate-950 text-white border-none pt-16 px-4"
          side={"left"}
        >
          {SidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <SheetClose asChild key={link.route}>
                <Link
                  href={link.route}
                  key={link.label}
                  className={cn(
                    "flex items-center gap-4 px-3 py-4 rounded-lg text-white",
                    isActive && "bg-blue-600"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <p className="font-semibold text-lg lg:text-xl w-40">
                    {link.label}
                  </p>
                </Link>
              </SheetClose>
            );
          })}
        </SheetContent>
      </Sheet>
    </section>
  );
};

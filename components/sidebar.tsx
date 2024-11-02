"use client";

import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathame = usePathname();
  return (
    <section className="bg-slate-900 h-screen sticky left-0 top-0 pt-28 w-fit p-6 hidden lg:block">
      {SidebarLinks.map((link) => {
        const isActive = pathame === link.route;
        return (
          <Link
            href={link.route}
            key={link.label}
            className={cn(
              "flex items-center gap-4 px-4 py-5 rounded-lg text-white ",
              isActive && "bg-blue-600"
            )}
          >
            <link.icon className="h-5 w-5" />
            <p className="font-semibold text-xl w-40">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

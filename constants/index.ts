"use client";

import {
  FolderOutput,
  FolderSymlink,
  HomeIcon,
  Plus,
  Video,
} from "lucide-react";

export const SidebarLinks = [
  {
    label: "Home",
    icon: HomeIcon,
    route: "/",
  },
  {
    label: "Upcoming",
    icon: FolderSymlink,
    route: "/upcoming",
  },
  {
    label: "Previous",
    icon: FolderOutput,
    route: "/previous",
  },
  {
    label: "Recordings",
    icon: Video,
    route: "/recordings",
  },
  {
    label: "Personal Room",
    icon: Plus,
    route: "/personal-room",
  },
];

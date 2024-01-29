import { routes } from "@/routes/routes";
import { LayoutDashboard, ListChecks, PenLine, Users } from "lucide-react";

export const navbarItems = [
  {
    title: "داشبورد",
    href: routes.dashboard,
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: "افزودن کاربر",
    href: routes.addUser,
    icon: <Users size={16} />,
  },
  {
    title: "افزودن پست",
    href: routes.createPost,
    icon: <PenLine size={16} />,
  },
  {
    title: "مدیریت پستها",
    href: routes.managementPosts,
    icon: <ListChecks size={16} />,
  },
];

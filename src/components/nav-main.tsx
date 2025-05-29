"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import AddUserDialogClient from "@/app/dashboard/manage-users/components/AddUserDialogClient";

export function NavMain({
  items,
  isAdmin = false,
  onAddUserClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
  isAdmin?: boolean;
  onAddUserClick?: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer flex items-center gap-2">
            {isAdmin ? (
              <AddUserDialogClient />
            ) : null}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link className="text-white/800" href={item.url}>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

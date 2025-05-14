"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer flex items-center gap-2">
            <Link
              href="/dashboard/bookings/create"
              className="flex flex-row gap-[0.8rem] justify-between items-center"
            >
              <SidebarMenuButton
                title="Create a Booking"
                className="border border-gray-200/80 dark:border-green-900/80 bg-white/30 backdrop-blur-md text-green-600 hover:bg-white/40 hover:text-green-700 active:bg-white/50 active:text-green-800 dark:bg-green-900/20 dark:hover:bg-green-800/20 dark:active:bg-green-700/20 duration-200 ease-linear min-w-8 shadow-lg"
              >
                <IconCirclePlusFilled className="text-green-600 dark:text-green-400" />
                <span>Create a Booking</span>
              </SidebarMenuButton>
            </Link>
            <Button
              size="icon"
              className="cursor-pointer size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link href={item.url}>
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

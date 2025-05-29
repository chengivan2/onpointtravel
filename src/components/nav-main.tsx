"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
  onAddUserClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
  onAddUserClick?: () => void;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function checkRole() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();
      setIsAdmin(profile?.role === "admin");
    }
    checkRole();
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer flex items-center gap-2">
            {/* Only show AddUserDialogClient for admins, check role on the server and pass as prop if needed */}
            {isAdmin && <AddUserDialogClient />}
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

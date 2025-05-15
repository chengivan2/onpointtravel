"use client";

import * as React from "react";
import {
  IconCar4wd,
  IconChartBar,
  IconClock12,
  IconDashboard,
  IconFolder,
  IconHeart,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import HeaderThemeToggler from "@/app/rootcomponents/header/ThemeToggler";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = createClient();
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [userProfile, setUserProfile] = React.useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role, first_name, last_name, email, logo_url")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserRole(profile.role);
          setUserProfile({
            name: `${profile.first_name} ${profile.last_name}`,
            email: profile.email,
            avatar: profile.logo_url || "/default-avatar.png",
          });
        }
      }
    };

    fetchUserData();
  }, [supabase]);

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    ...(userRole === "admin"
      ? [
          {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: IconChartBar,
          },
          {
            title: "Manage Users",
            url: "/dashboard/users",
            icon: IconUsers,
          },
          {
            title: "Favorites",
            url: "/dashboard/favorites",
            icon: IconHeart,
          },
          {
            title: "Bookings",
            url: "/dashboard/bookings",
            icon: IconFolder,
          },
          {
            title: "Ongoing Trips",
            url: "/dashboard/ongoingtrips",
            icon: IconClock12,
          },
          {
            title: "My Bookings",
            url: "/dashboard/mybookings",
            icon: IconCar4wd,
          },
        ]
      : [
          {
            title: "Favorites",
            url: "/dashboard/favorites",
            icon: IconHeart,
          },
          {
            title: "My Ongoing Trips",
            url: "/dashboard/myongoingtrips",
            icon: IconClock12,
          },
          {
            title: "My Bookings",
            url: "/dashboard/mybookings",
            icon: IconCar4wd,
          },
        ]),
  ];

  const data = {
    documents: [],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Support",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex items-center justify-between w-full">
                <Link href="/">
                  <div className="flex justify-between items-center">
                    <Image
                      width={50}
                      height={30}
                      alt="OnPoint header logo"
                      src="/logos/onpointhflightmodelogo.png"
                      className="flex duration-300 dark:hidden"
                    />

                    <Image
                      width={50}
                      height={30}
                      alt="OnPoint header logo"
                      src="/logos/onpointhfdarkmodelogo.png"
                      className="hidden duration-300 dark:flex"
                    />
                  </div>

                  <span className="text-base font-semibold">onPoint</span>
                </Link>
                <HeaderThemeToggler />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {userProfile && <NavUser user={userProfile} />}
      </SidebarFooter>
    </Sidebar>
  );
}

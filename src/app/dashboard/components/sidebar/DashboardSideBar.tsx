"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconClock12,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHeart,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
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
          .select("role, first_name, last_name, email")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUserRole(profile.role);
          setUserProfile({
            name: `${profile.first_name} ${profile.last_name}`,
            email: profile.email,
            avatar:
              user.user_metadata?.avatar_url ||
              "https://res.cloudinary.com/doqbnfais/image/upload/v1743234420/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/booking%20steps%20faces/booking-steps-face-image-2_x5heop.jpg",
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
        ]
      : [
          {
            title: "Favorites",
            url: "/dashboard/favorites",
            icon: IconHeart,
          },
          {
            title: "My Trips",
            url: "/dashboard/trips",
            icon: IconFolder,
          },
        ]),
  ];

  const data = {
    documents: [
      
    ],
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
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {userProfile && <NavUser user={userProfile} />}
      </SidebarFooter>
    </Sidebar>
  );
}

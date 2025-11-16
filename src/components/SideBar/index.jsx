import React from "react";
import {
  FileText,
  House,
  LayoutDashboard,
  Users,
  Settings,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ openSideBar, setOpenSideBar }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        openSideBar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div class="flex flex-col h-full">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-primary">RentMgr</h1>
            <p class="text-xs text-muted-foreground mt-1">Rental Management</p>
          </div>
          <button
            onClick={() => setOpenSideBar(false)}
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 lg:hidden"
          >
            <X />
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            class={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/dashboard"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }  `}
            to="/dashboard"
          >
            <LayoutDashboard className="!w-[20px] !h-[20px]" />
            <span class="font-medium text-sm">Dashboard</span>
          </Link>
          <Link
            class={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/rooms"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }  `}
            to="/rooms"
          >
            <House className="!w-[20px] !h-[20px]" />
            <span class="font-medium text-sm">Rooms</span>
          </Link>
          <Link
            class={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/tenants"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }  `}
            to="/tenants"
          >
            <Users className="!w-[20px] !h-[20px]" />
            <span class="font-medium text-sm">Tenants</span>
          </Link>
          <Link
            class={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/bills"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }  `}
            to="/bills"
          >
            <FileText className="!w-[20px] !h-[20px]" />
            <span class="font-medium text-sm">Bills</span>
          </Link>
          <Link
            class={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === "/settings"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }  `}
            to="/settings"
          >
            <Settings className="!w-[20px] !h-[20px]" />
            <span class="font-medium text-sm">Settings</span>
          </Link>
        </nav>
        <div class="p-4 border-t border-border">
          <div class="text-xs text-muted-foreground">
            <p class="font-semibold">Property Manager</p>
            <p class="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

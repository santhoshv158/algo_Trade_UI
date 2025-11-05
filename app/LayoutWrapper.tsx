"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./common/components/SideBar";
import Navbar from "./common/components/NavBar";
import { useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide sidebar and navbar on login route and home page
  const isAuthPage = pathname === "/" || pathname.startsWith("/login");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          brokerConnectionStatus={{
            isConnected: true,
            brokerName: "Zerodha",
            connectionTime: new Date().toISOString(),
          }}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
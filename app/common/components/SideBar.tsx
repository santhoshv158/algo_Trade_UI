"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  ShoppingCart,
  Wallet,
  Play,
  Users,
  Code,
  LineChart,
  X,
  Menu,
  Zap,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

interface MenuItem {
  name: string;
  path: string;
  roles: string[];
  icon: React.ElementType;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

  const allMenuItems: MenuItem[] = [
    { name: "Dashboard", path: "/portal/dashboard", roles: ["user", "admin", "super_admin"], icon: Home },
    { name: "Market Data", path: "/portal/market-data", roles: ["user", "admin", "super_admin"], icon: BarChart2 },
    { name: "Orders", path: "/orders", roles: ["user", "admin", "super_admin"], icon: ShoppingCart },
    { name: "Portfolio", path: "/portfolio", roles: ["user", "admin", "super_admin"], icon: Wallet },
    { name: "Backtesting", path: "/backtesting", roles: ["admin", "super_admin"], icon: Play },
    { name: "Signal", path: "/signal", roles: ["admin", "super_admin"], icon: Zap },
    { name: "Users", path: "/users", roles: ["user", "admin", "super_admin"], icon: Users },
    { name: "Algo", path: "/algopage", roles: ["admin", "super_admin"], icon: Code },
    { name: "ChartPage", path: "/chartpage", roles: ["user", "admin", "super_admin"], icon: LineChart },
  ];

  useEffect(() => {
    const userRole = (localStorage.getItem("userRole") || "user").toLowerCase();
    const filtered = allMenuItems.filter((item) => item.roles.includes(userRole));
    setFilteredMenuItems(filtered);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const navLinkClasses = `
    group flex items-center px-4 py-2.5
    text-white dark:text-gray-300
    rounded-lg transition-all duration-200 transform
    hover:text-white hover:bg-blue-600 no-underline
  `;

  const activeLinkClasses = `
    bg-blue-600
    text-white font-bold shadow-md
  `;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex flex-col h-screen transform transition-transform duration-300 ease-in-out
          bg-gray-900 text-white
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
          lg:relative lg:translate-x-0
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center p-4 h-16 border-b border-gray-800 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
            {!isCollapsed && (
              <span className="text-white font-bold text-lg ml-2">
                MAK Trading
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={handleLinkClick}
                title={isCollapsed ? item.name : undefined}
                aria-label={item.name}
                className={`
                  ${navLinkClasses}
                  ${isActive ? activeLinkClasses : ""}
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <div className="w-8 flex items-center justify-center">
                  <item.icon size={20} className="flex-shrink-0" />
                </div>
                <span
                  className={`ml-2 whitespace-nowrap ${
                    isCollapsed ? "lg:hidden" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

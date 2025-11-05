"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, Bell, User, LogOutIcon } from "lucide-react";

interface NavbarProps {
  brokerConnectionStatus?: {
    isConnected: boolean;
    brokerName?: string;
    connectionTime?: string;
  };
  setSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  brokerConnectionStatus,
  setSidebarOpen,
}) => {
  const router = useRouter();
  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("userRole") ?? "Guest"
      : "Guest";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleProfileClick = () => {
    router.push("/profile");
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    localStorage.removeItem("userRole");
    router.push("/");
    setIsLoggingOut(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Sidebar Button (Mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          {/* <Image
            src="/images/mak2.png"
            alt="MAK Trading Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          /> */}
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-orange-500">MAK</span>{" "}
            <span className="text-gray-700 dark:text-gray-200">Trading</span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {brokerConnectionStatus && (
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                brokerConnectionStatus.isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>
              {brokerConnectionStatus.isConnected
                ? `${brokerConnectionStatus.brokerName || "Broker"} Connected`
                : "Not Connected"}
            </span>
          </div>
        )}

        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
          Role: <span className="font-semibold text-orange-500">{userRole}</span>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={20} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={handleProfileClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <User size={16} className="mr-3" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
              >
                <LogOutIcon size={16} className="mr-3" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

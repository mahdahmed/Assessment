// src/components/layout/Header.tsx

import { Menu, Bell, Search } from "lucide-react";
import UserDropdown from "./UserDropdown";



const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-4 py-2 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">

            {/* Hamburger - Mobile only */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Toggle sidebar"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Search - Desktop only */}
            <div className="hidden lg:flex flex-1 max-w-md mx-2">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Explore datasets..."
                        className="w-full bg-gray-100 border border-transparent focus:border-violet-300 focus:bg-white rounded-lg py-2 pl-10 pr-4 text-sm outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-x-5">

                {/* Bell */}
                <button
                    className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        3
                    </span>
                </button>

                {/* User Avatar + Dropdown */}

                <UserDropdown
                />

            </div>
        </header>
    );
};

export default Header;
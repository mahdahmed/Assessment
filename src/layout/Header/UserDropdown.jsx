// src/components/layout/UserDropdown.tsx

import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);


    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative"
        ref={dropdownRef}
         > 

            <button
                onClick={toggleDropdown}
                className="flex items-center gap-x-3 focus:outline-none"
                aria-label="User menu"
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900 leading-none">
                        Julian Casablancas
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Chief Curator</p>
                </div>

                <div className="relative">
                    <img
                        src="https://i.pravatar.cc/128?img=12"
                        alt="Julian Casablancas"
                        className="w-9 h-9 rounded-2xl object-cover ring-2 ring-white shadow-sm cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-white"></div>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-gray-100 py-2 z-50"
                >
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/128?img=12"
                                alt="Julian Casablancas"
                                className="w-10 h-10 rounded-2xl"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">Julian Casablancas</p>
                                <p className="text-xs text-gray-500">julian@ahya.com</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Profile</span>
                    </button>

                    <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                        <Settings className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Settings</span>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            alert("Logged out! (demo)");
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
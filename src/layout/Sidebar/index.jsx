import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Form,
    KeyboardMusic,
    Users,
    Settings,
    Plus,
    ArrowLeftFromLine
} from "lucide-react";

const NavItem = ({ to, icon: Icon, label, onClick }) => {
    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                            ? "bg-violet-100 text-violet-800 border-l-4 border-violet-800"
                            : "text-gray-500 hover:bg-violet-100"
                    }`
                }
            >
                <Icon className="w-5 h-5" />
                {label}
            </NavLink>
        </li>
    );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const handleLinkClick = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const navItems = [
        { to: "/", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/form", icon: Form, label: "Form" },
        { to: "/products", icon: KeyboardMusic, label: "Products" },
        { to: "/users", icon: Users, label: "Users" },
        { to: "/settings", icon: Settings, label: "Settings" },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    flex flex-col w-72 lg:w-64
                    bg-violet-50 border-r border-gray-200 shadow-xl lg:shadow-none
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* Logo - UNCHANGED from your original code */}
                <div className="flex items-center gap-3 px-6 py-5 border-gray-200">
                    <div className="w-8 h-8 bg-violet-800 rounded-xl flex items-center justify-center shrink-0">
                        <LayoutDashboard className="w-4 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-medium tracking-tight text-violet-800">
                            Sample Logo
                        </span>
                    </div>
                    <button className="absolute right-4 top-5 bg-violet-800 rounded-md p-1 lg:hidden" onClick={()=>setSidebarOpen(false)}>
                    <ArrowLeftFromLine className="w-6  text-white" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 overflow-y-auto">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                                onClick={handleLinkClick}
                            />
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200 mt-auto">
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-violet-800 hover:bg-violet-700 text-white font-medium py-3.5 px-4 rounded-md transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Insight
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
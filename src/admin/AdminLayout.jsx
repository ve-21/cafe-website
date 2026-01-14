import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Coffee, BellRing, Settings, LogOut, Tag, Star, BarChart2, Calendar, Mail } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/admin/dashboard" },
        { icon: <BellRing size={20} />, label: "Live Orders", path: "/admin/dashboard/orders" },
        { icon: <Calendar size={20} />, label: "Private Bookings", path: "/admin/dashboard/bookings" },
        { icon: <Mail size={20} />, label: "Correspondence", path: "/admin/dashboard/messages" },
        { icon: <Coffee size={20} />, label: "Menu Manager", path: "/admin/dashboard/menu" },
        { icon: <Star size={20} />, label: "Popular Items", path: "/admin/dashboard/popular" },
        { icon: <Tag size={20} />, label: "Offers", path: "/admin/dashboard/offers" },
        { icon: <BarChart2 size={20} />, label: "Sales Analytics", path: "/admin/dashboard/sales" },
        { icon: <Settings size={20} />, label: "Estate Master", path: "/admin/dashboard/settings" },
    ];

    return (
        <div className="flex h-screen bg-[#0a120e] text-parchment font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col">
                <div className="p-8 border-b border-white/5">
                    <h2 className="font-serif text-xl tracking-widest text-copper">A.E. Admin</h2>
                </div>

                <nav className="flex-1 py-8 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-copper/10 text-copper' : 'text-gray-400 hover:bg-white/5 hover:text-parchment'}`}
                            >
                                {item.icon}
                                <span className="text-sm tracking-wide uppercase">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm tracking-wide uppercase">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <Outlet />
            </main>
        </div>
    );
}

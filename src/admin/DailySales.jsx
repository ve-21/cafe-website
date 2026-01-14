import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { RefreshCcw, TrendingUp, ShoppingBag, CreditCard, X, Phone, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailySales() {
    const [orders, setOrders] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default Today
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchSales();
    }, [date]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/orders/history?date=${date}`);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch sales:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Stats
    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const totalOrders = orders.length;

    // Most Popular Item Calculation
    const itemCounts = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    const mostPopularItem = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0];

    // Chart Data Preparation (Sales by Hour)
    const chartData = orders.reduce((acc, order) => {
        const hour = new Date(order.timestamp).getHours();
        const existing = acc.find(d => d.hour === hour);
        if (existing) {
            existing.sales += order.total;
        } else {
            acc.push({ hour, sales: order.total, label: `${hour}:00` });
        }
        return acc;
    }, []).sort((a, b) => a.hour - b.hour);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-serif text-starlight mb-2">Sales Analytics</h2>
                    <p className="text-starlight/40">Track your daily performance and revenue.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white/5 border border-white/10 p-3 rounded-xl text-starlight focus:border-gold-dust outline-none font-sans"
                    />
                    <button onClick={fetchSales} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-gold-dust/10 text-gold-dust transition-colors">
                        <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] flex items-center gap-6 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center border border-green-500/20">
                        <CreditCard size={28} />
                    </div>
                    <div>
                        <p className="text-starlight/30 text-xs uppercase tracking-[0.2em] font-bold">Total Revenue</p>
                        <h3 className="text-4xl font-serif text-starlight mt-1">${totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] flex items-center gap-6 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                        <ShoppingBag size={28} />
                    </div>
                    <div>
                        <p className="text-starlight/30 text-xs uppercase tracking-[0.2em] font-bold">Total Orders</p>
                        <h3 className="text-4xl font-serif text-starlight mt-1">{totalOrders}</h3>
                    </div>
                </div>

                <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] flex items-center gap-6 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-gold-dust/10 text-gold-dust flex items-center justify-center border border-gold-dust/20">
                        <TrendingUp size={28} />
                    </div>
                    <div>
                        <p className="text-starlight/30 text-xs uppercase tracking-[0.2em] font-bold">Most Popular</p>
                        <h3 className="text-xl font-serif text-starlight mt-1 truncate max-w-[150px]" title={mostPopularItem?.[0]}>
                            {mostPopularItem ? mostPopularItem[0] : "N/A"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] shadow-2xl">
                <h3 className="text-2xl font-serif text-starlight mb-8">Resonance Trends (Hourly)</h3>
                <div className="h-[350px] w-full">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                                <XAxis dataKey="label" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0A0A0B', borderColor: '#D4AF37', borderRadius: '16px', border: '1px solid rgba(212,175,55,0.2)', color: '#EAEADB' }}
                                    itemStyle={{ color: '#D4AF37' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-starlight/20 italic font-serif text-xl font-light">
                            Silence in the Estate logs...
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Orders Table */}
            <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5">
                    <h3 className="text-2xl font-serif text-starlight">Delivered Orders</h3>
                    <p className="text-starlight/20 text-xs uppercase tracking-widest mt-2">Click order record for expanded analysis</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] text-starlight/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                            <tr>
                                <th className="p-8">Time</th>
                                <th className="p-8 text-center text-gold-dust">Status</th>
                                <th className="p-8">Customer</th>
                                <th className="p-8">Items</th>
                                <th className="p-8 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {orders.map(order => (
                                <tr
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="hover:bg-gold-dust/5 transition-all duration-500 cursor-pointer group"
                                >
                                    <td className="p-8 text-starlight/60 font-sans tracking-wide">
                                        {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="p-8 text-center">
                                        <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-green-500/20">Delivered</span>
                                    </td>
                                    <td className="p-8 font-serif text-starlight text-lg group-hover:text-gold-dust transition-colors">{order.customer?.name}</td>
                                    <td className="p-8 text-starlight/40 font-sans italic">
                                        {order.items.length} artifacts ({order.items[0]?.name}...)
                                    </td>
                                    <td className="p-8 text-right font-bold text-starlight font-sans tracking-widest">${order.total?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="absolute inset-0 bg-vdark/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-2xl bg-nebula border border-white/5 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-[48px] text-starlight overflow-y-auto max-h-[90vh]"
                        >
                            <button onClick={() => setSelectedOrder(null)} className="absolute top-8 right-8 text-starlight/20 hover:text-gold-dust transition-all duration-500 hover:rotate-90">
                                <X size={32} />
                            </button>

                            <div className="space-y-10">
                                <div className="text-center border-b border-white/5 pb-10">
                                    <span className="text-gold-dust font-sans text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">Historical Archive</span>
                                    <h2 className="text-4xl font-serif italic text-parchment leading-tight">Order Record #{selectedOrder.id}</h2>
                                    <p className="text-starlight/30 font-sans text-xs uppercase tracking-widest mt-4">
                                        Finalized: {new Date(selectedOrder.timestamp).toLocaleString()}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold block ml-1">Liaison Profile</label>
                                            <div className="bg-white/5 p-6 rounded-[24px] border border-white/5 space-y-4">
                                                <h4 className="text-2xl font-serif italic">{selectedOrder.customer?.name}</h4>
                                                <div className="flex items-center gap-3 text-starlight/60 text-sm font-sans tracking-wide">
                                                    <Phone size={16} className="text-gold-dust" />
                                                    {selectedOrder.customer?.phone}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold block ml-1">Procurement Total</label>
                                            <div className="bg-gold-dust text-vdark p-6 rounded-[24px] flex justify-between items-center shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                                                <span className="font-sans font-black uppercase text-[10px] tracking-widest">Revenue Realized</span>
                                                <span className="text-3xl font-serif italic">${selectedOrder.total?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold block ml-1">Manifest</label>
                                            <div className="bg-white/5 p-6 rounded-[24px] border border-white/5 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                                {selectedOrder.items.map((item, idX) => (
                                                    <div key={idX} className="flex justify-between items-center border-b border-white/5 pb-3">
                                                        <span className="text-sm font-light text-starlight tracking-wide">{item.quantity}x {item.name}</span>
                                                        <span className="text-xs text-starlight/30 font-sans">
                                                            ${(parseFloat(String(item.price).replace('$', '')) * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold block ml-1">Delivery Destination</label>
                                    <div className="bg-white/5 p-8 rounded-[24px] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 group">
                                        <div className="flex items-start gap-4 flex-1">
                                            <MapPin size={24} className="text-gold-dust mt-1 shrink-0" />
                                            <p className="text-starlight/70 font-sans leading-relaxed text-sm">
                                                {selectedOrder.customer?.address}
                                            </p>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedOrder.customer?.address || "")}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-6 py-3 bg-white/5 hover:bg-gold-dust hover:text-vdark transition-all duration-500 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shrink-0"
                                        >
                                            <ExternalLink size={14} /> Open Navigator
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}


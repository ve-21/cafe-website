import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { Clock, CheckCircle, Bell, Phone, MapPin, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeElapsed = ({ timestamp }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const sent = new Date(timestamp);
            const diffInSeconds = Math.floor((now - sent) / 1000);

            if (diffInSeconds < 60) {
                setTimeAgo('Just now');
            } else {
                const mins = Math.floor(diffInSeconds / 60);
                setTimeAgo(`${mins} min${mins > 1 ? 's' : ''} ago`);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [timestamp]);

    return <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> Received {timeAgo}</span>;
};

export default function OrderFeed() {
    const [orders, setOrders] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    // Use native audio for the bell sound
    const playChime = () => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
    };

    useEffect(() => {
        // 1. Fetch existing live orders first
        fetch('/api/orders/live')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Failed to load initial orders", err));

        // 2. Setup Real-time Sockets
        console.log("Attempting to connect to socket server...");
        const socket = io(); // Connect via proxy

        socket.on("connect", () => {
            console.log("Connected to socket:", socket.id);
            setIsConnected(true);
        });

        socket.on("disconnect", () => setIsConnected(false));

        socket.on("new-order", (order) => {
            console.log("New Order Received via Socket:", order);
            setOrders(prev => [order, ...prev]);
            playChime();

            if (Notification.permission === "granted") {
                new Notification("New Order Received!", { body: `Order #${order.id}` });
            }
        });

        socket.on("order-status-updated", (data) => {
            console.log("Order Status Updated via Socket:", data);
            if (data.status === 'Delivered') {
                setOrders(prev => prev.filter(o => o.id !== data.id));
            } else {
                setOrders(prev => prev.map(o => o.id === data.id ? { ...o, status: data.status } : o));
            }
        });

        return () => socket.disconnect();
    }, []);

    const handleAccept = async (orderId) => {
        try {
            await fetch(`/api/orders/${orderId}/accept`, { method: 'POST' });
            // Local update for speed, but socket will also confirm
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Accepted' } : o));
        } catch (error) {
            console.error("Failed to accept order:", error);
        }
    };

    const handleDeliver = async (orderId) => {
        try {
            await fetch(`/api/orders/${orderId}/deliver`, { method: 'PUT' });
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (error) {
            console.error("Failed to deliver order:", error);
        }
    };

    const handleReject = (orderId) => {
        // For now, just remove it locally or we could add a reject endpoint
        if (confirm("Are you sure you want to reject this order?")) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <h2 className="text-4xl font-serif text-parchment flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-4">
                    Live Order Feed
                    <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${isConnected ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    {isConnected ? 'Resonance Active' : 'Resonance Lost'}
                </div>
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {orders.length === 0 && <p className="text-gray-500 italic col-span-full text-center mt-10">Waiting for new orders...</p>}

                <AnimatePresence>
                    {orders.map(order => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`bg-[#1a201d] border ${order.status === 'Accepted' ? 'border-green-500/30' : 'border-white/10'} rounded-xl overflow-hidden shadow-2xl relative`}
                        >
                            {/* Status Line */}
                            {order.status === 'Accepted' && <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>}

                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-serif text-parchment">{order.customer?.name || "Guest User"}</h3>
                                        <TimeElapsed timestamp={order.timestamp || Date.now()} />
                                    </div>
                                    {order.status !== 'Accepted' && (
                                        <span className="bg-copper/20 text-copper border border-copper/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(184,115,51,0.3)] animate-pulse">
                                            New Order
                                        </span>
                                    )}
                                    {order.status === 'Accepted' && (
                                        <span className="bg-green-900/40 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                                            <CheckCircle size={14} /> Accepted
                                        </span>
                                    )}
                                </div>

                                {/* Contact Section */}
                                <div className="space-y-2 text-sm text-gray-400 bg-white/5 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Phone size={16} className="text-copper" />
                                        <span>{order.customer?.phone || "No Phone"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 hover:text-parchment transition-colors">
                                        <MapPin size={16} className="text-copper" />
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.customer?.address || "")}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="border-b border-transparent hover:border-copper"
                                        >
                                            {order.customer?.address || "Dine-in / No Address"}
                                        </a>
                                    </div>
                                </div>

                                {/* Order Table */}
                                <div className="overflow-hidden rounded-lg border border-white/5">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white/5 text-gray-500 uppercase tracking-wider text-xs">
                                            <tr>
                                                <th className="p-3 pl-4">Qty</th>
                                                <th className="p-3">Item</th>
                                                <th className="p-3 pr-4 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-gray-300">
                                            {order.items?.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="p-3 pl-4 text-copper font-mono">{item.quantity}x</td>
                                                    <td className="p-3">{item.name}</td>
                                                    <td className="p-3 pr-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer / Actions */}
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">Total</p>
                                        <p className="text-2xl font-serif text-parchment">${order.total?.toFixed(2)}</p>
                                    </div>

                                    <div className="flex gap-3">
                                        {order.status !== 'Accepted' ? (
                                            <>
                                                <button
                                                    onClick={() => handleReject(order.id)}
                                                    className="px-4 py-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors uppercase text-xs font-bold tracking-wider"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleAccept(order.id)}
                                                    className="px-6 py-2 bg-copper text-forest-dark rounded font-bold uppercase text-xs tracking-wider hover:bg-white hover:text-forest-dark transition-all shadow-[0_0_20px_rgba(184,115,51,0.2)]"
                                                >
                                                    Accept Order
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleDeliver(order.id)}
                                                className="px-6 py-2 bg-forest text-parchment rounded font-bold uppercase text-xs tracking-wider border border-white/10 hover:bg-green-900 transition-colors flex items-center gap-2"
                                            >
                                                Complete & Deliver
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

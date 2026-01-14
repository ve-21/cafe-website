import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Trash2 } from 'lucide-react';

export default function BookingManager() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(setBookings);
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Remove this reservation?")) return;
        const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        if (res.ok) setBookings(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-3xl font-serif text-starlight">Private Bookings</h2>
                    <p className="text-starlight/40 text-xs mt-2 uppercase tracking-widest">Managing the Estate Table Access</p>
                </div>
                <span className="bg-gold-dust/10 text-gold-dust px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold-dust/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    {bookings.length} Timed Access Requests
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {bookings.map((booking) => (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] relative group hover:border-gold-dust/20 transition-all duration-500 shadow-2xl"
                        >
                            <button onClick={() => handleDelete(booking.id)} className="absolute top-8 right-8 text-starlight/20 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <span className="text-gold-dust font-sans text-[9px] font-bold uppercase tracking-[0.3em] block mb-1">Ritual Request</span>
                                    <h3 className="text-2xl font-serif text-starlight">{booking.name}</h3>
                                    <p className="text-starlight/40 text-[10px] uppercase tracking-widest font-bold font-sans italic">{booking.service}</p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-4 text-sm text-starlight/70 bg-white/5 p-3 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-gold-dust/10 flex items-center justify-center text-gold-dust">
                                            <Calendar size={16} />
                                        </div>
                                        <span className="font-sans font-light tracking-wide">{booking.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-starlight/70 bg-white/5 p-3 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-gold-dust/10 flex items-center justify-center text-gold-dust">
                                            <Clock size={16} />
                                        </div>
                                        <span className="font-sans font-light tracking-wide">{booking.time}</span>
                                    </div>
                                    {booking.phone && (
                                        <div className="flex items-center gap-4 text-sm text-starlight/70 bg-white/5 p-3 rounded-xl">
                                            <div className="w-8 h-8 rounded-lg bg-gold-dust/10 flex items-center justify-center text-gold-dust">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                            </div>
                                            <span className="font-sans font-bold tracking-widest text-[11px] uppercase">{booking.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 text-sm text-starlight/70 bg-white/5 p-3 rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-gold-dust/10 flex items-center justify-center text-gold-dust">
                                            <Users size={16} />
                                        </div>
                                        <span className="font-sans font-light tracking-wide uppercase tracking-[0.2em] text-[10px] font-bold">{booking.guests} GUESTS</span>
                                    </div>
                                </div>

                                {booking.requests && (
                                    <div className="bg-gold-dust/5 border border-gold-dust/10 p-5 rounded-2xl">
                                        <span className="text-[8px] uppercase tracking-widest text-gold-dust/50 block mb-2 font-bold">Preferences</span>
                                        <p className="text-xs text-starlight/60 leading-relaxed font-sans italic italic">"{booking.requests}"</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {bookings.length === 0 && (
                <div className="py-32 text-center space-y-4 opacity-20">
                    <Calendar size={48} className="mx-auto" />
                    <p className="font-serif italic text-xl">The Estate Journal is empty</p>
                </div>
            )}
        </div>
    );
}

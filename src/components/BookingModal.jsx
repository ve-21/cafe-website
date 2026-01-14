import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-vdark/90 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-lg bg-nebula border border-white/5 p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh] rounded-[40px] text-starlight"
                    >
                        <button onClick={onClose} className="absolute top-8 right-8 text-starlight/40 hover:text-gold-dust transition-all duration-500 hover:rotate-90">
                            <X size={32} />
                        </button>

                        <div className="text-center mb-12 space-y-4">
                            <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.5em] uppercase block">Timed Access</span>
                            <h2 className="text-4xl font-serif italic uppercase leading-none">The Estate Reservation</h2>
                        </div>

                        <form className="space-y-10" onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const data = {
                                name: e.target.name.value,
                                phone: e.target.phone.value,
                                date: e.target.date.value,
                                time: e.target.time.value,
                                guests: e.target.guests.value,
                                service: e.target.service.value,
                                requests: e.target.requests.value
                            };

                            try {
                                const res = await fetch('/api/bookings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });
                                if (res.ok) {
                                    alert("Your request for timed access has been transmitted.");
                                    onClose();
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Identity</label>
                                    <input name="name" type="text" placeholder="Your Full Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Contact Chronicle</label>
                                    <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Lunar Date</label>
                                    <input name="date" type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight/60 invert-calendar-icon" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Solar Time</label>
                                    <input name="time" type="time" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight/60" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Party Size</label>
                                    <select name="guests" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight/60 appearance-none cursor-pointer [&>option]:bg-nebula">
                                        {[1, 2, 3, 4, 5, 6, 8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Service Type</label>
                                    <select name="service" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight/60 appearance-none cursor-pointer [&>option]:bg-nebula">
                                        <option>The Standard Ritual</option>
                                        <option>High Tea (The Estate Edition)</option>
                                        <option>Deconstructed Cupping</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Special Preferences</label>
                                <textarea name="requests" placeholder="Dietary adjustments or special requests..." rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full py-6 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-starlight transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                                Authorize Private Booking
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

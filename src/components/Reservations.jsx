import ScrollReveal from './ScrollReveal';
import interiorImg from '../assets/cafe_interior_luxury_1768209672461.png';
import { motion } from 'framer-motion';

export default function Reservations({ onOpenModal }) {
    return (
        <section id="reservations" className="min-h-[80vh] flex items-center relative overflow-hidden bg-vdark">
            {/* Large Parallax Background */}
            <div className="absolute inset-0 z-0">
                <img src={interiorImg} alt="Luxury Interior" className="w-full h-full object-cover grayscale opacity-40 scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-vdark via-transparent to-vdark"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-starlight text-center">
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto space-y-12 py-20 px-8 md:px-16 rounded-3xl border border-white/5 bg-vdark/40 backdrop-blur-xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                        <div className="space-y-4">
                            <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.5em] uppercase block">
                                Private Bookings
                            </span>
                            <h2 className="text-5xl md:text-7xl font-serif leading-tight">Secure Your Presence</h2>
                        </div>

                        <p className="font-sans text-starlight/60 leading-relaxed text-lg font-light max-w-xl mx-auto italic">
                            The Estate maintains a strictly limited occupancy to preserve the sanctity of the aroma and the silence of the experience.
                        </p>

                        <div className="pt-8">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onOpenModal}
                                className="px-16 py-5 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500 rounded-full"
                            >
                                Request a Reservation
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-center gap-8 pt-8 opacity-40">
                            <span className="w-12 h-[1px] bg-gold-dust"></span>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Limited Availability</span>
                            <span className="w-12 h-[1px] bg-gold-dust"></span>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

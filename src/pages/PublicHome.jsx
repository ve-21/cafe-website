import Hero from '../components/Hero';
import Story from '../components/Story';
import InteractiveMenu from '../components/InteractiveMenu';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Events from '../components/Events';
import Reservations from '../components/Reservations';
import ContactForm from '../components/ContactForm';
import InstagramFeed from '../components/InstagramFeed';
import BookingModal from '../components/BookingModal';
import OrderOnline from '../components/OrderOnline';
import OfferPanel from '../components/OfferPanel';
import DailyOffers from '../components/DailyOffers';
import PopularMenu from '../components/PopularMenu';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PublicHome() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="bg-vdark min-h-screen selection:bg-gold-dust selection:text-vdark">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gold-dust origin-left z-[100]"
                style={{ scaleX }}
            />

            <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
                <div className="bg-ethereal backdrop-blur-xl border border-white/10 px-10 py-5 rounded-full flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="font-serif text-2xl font-bold tracking-[0.3em] text-gold-dust italic">
                        ESTATE
                    </div>

                    <div className="hidden md:flex items-center space-x-12 font-sans text-[10px] uppercase tracking-[0.4em] font-light text-starlight">
                        <a href="#story" className="hover:text-gold-dust transition-all duration-300 opacity-60 hover:opacity-100">About Us</a>
                        <a href="#menu" className="hover:text-gold-dust transition-all duration-300 opacity-60 hover:opacity-100">Menu</a>
                        <a href="#reservations" className="hover:text-gold-dust transition-all duration-300 opacity-60 hover:opacity-100">Reserve</a>
                        <Link
                            to="/order-menu"
                            className="bg-gold-dust text-vdark px-10 py-3 rounded-full font-bold hover:bg-starlight transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)] tracking-[0.2em]"
                        >
                            ONLINE ORDER
                        </Link>
                    </div>

                    <button className="md:hidden text-starlight text-2xl">☰</button>
                </div>
            </nav>

            <main>
                <Hero />
                <DailyOffers />
                <Story />
                <PopularMenu />
                <InteractiveMenu />
                <OrderOnline />
                <Process />
                <Testimonials />
                <Events />
                <Reservations onOpenModal={() => setIsBookingOpen(true)} />
                <ContactForm />
                <InstagramFeed />
            </main>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <OfferPanel />

            <footer className="bg-[#050505] text-starlight pt-32 pb-16 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-4 gap-20 mb-24">
                        {/* Branding & Newsletter */}
                        <div className="col-span-1 lg:col-span-2 space-y-12">
                            <div className="space-y-4">
                                <h4 className="font-serif text-4xl italic text-gold-dust">The Estate Journal</h4>
                                <p className="font-sans text-starlight/40 text-sm max-w-sm leading-relaxed">
                                    Subscribe to our quarterly chronicle of micro-lots, sensory shifts, and private gatherings.
                                </p>
                            </div>

                            <form className="flex max-w-md group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent border-b border-white/10 w-full py-4 font-sans text-sm focus:border-gold-dust transition-all outline-none"
                                />
                                <button className="border-b border-white/10 px-6 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-gold-dust transition-colors">
                                    Join
                                </button>
                            </form>
                        </div>

                        {/* Directory */}
                        <div className="space-y-10">
                            <h4 className="font-serif text-xl tracking-widest text-gold-dust opacity-50 uppercase text-[10px] font-bold">Archives</h4>
                            <ul className="space-y-6 font-sans text-xs tracking-[0.3em] text-starlight/60 uppercase">
                                <li><a href="#" className="hover:text-gold-dust transition-colors">The Menu</a></li>
                                <li><a href="#" className="hover:text-gold-dust transition-colors">Reservations</a></li>
                                <li><a href="#" className="hover:text-gold-dust transition-colors">Estates</a></li>
                                <li><a href="#" className="hover:text-gold-dust transition-colors">Press</a></li>
                            </ul>
                        </div>

                        {/* Socials */}
                        <div className="space-y-10">
                            <h4 className="font-serif text-xl tracking-widest text-gold-dust opacity-50 uppercase text-[10px] font-bold">Resonance</h4>
                            <div className="flex flex-col gap-6 font-sans text-[10px] tracking-[0.3em] text-starlight/60 uppercase">
                                <a href="#" className="hover:text-gold-dust transition-colors">Instagram</a>
                                <a href="#" className="hover:text-gold-dust transition-colors">X / Twitter</a>
                                <a href="#" className="hover:text-gold-dust transition-colors">Substack</a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Map Placeholder */}
                    <div id="location" className="w-full h-96 grayscale invert opacity-20 hover:opacity-40 transition-opacity duration-1000 border border-white/5 rounded-3xl overflow-hidden mb-24 cursor-pointer flex items-center justify-center bg-vdark group">
                        <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold-dust scale-110 group-hover:scale-100 transition-transform duration-1000">Locating Estate...</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 gap-8">
                        <div className="font-serif text-sm italic opacity-30">EST. 1924 &mdash; REBORN 2026</div>
                        <div className="font-sans text-[9px] tracking-[0.3em] uppercase opacity-30">
                            &copy; 2026 The Antigravity Estate. Deconstructed Luxury.
                        </div>
                        <div className="flex gap-8 font-sans text-[9px] tracking-[0.3em] uppercase opacity-30">
                            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

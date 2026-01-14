import ScrollReveal from './ScrollReveal';
import eventImg from '../assets/coffee_tasting_event_1768209705756.png';
import { motion } from 'framer-motion';

export default function Events() {
    const events = [
        { date: "Every Sunday", title: "Cupping & Sensory" },
        { date: "Oct 24", title: "The Jazz Evening" },
        { date: "Nov 01", title: "Estate Origins Workshop" }
    ];

    return (
        <section className="py-32 bg-vdark relative overflow-hidden text-starlight">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <ScrollReveal>
                        <div className="space-y-16">
                            <div className="space-y-4">
                                <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase block">
                                    Curated Engagements
                                </span>
                                <h2 className="text-5xl md:text-7xl font-serif">Gatherings</h2>
                            </div>

                            <div className="space-y-0">
                                {events.map((evt, i) => (
                                    <div key={i} className="flex items-center justify-between py-10 border-b border-white/5 group cursor-pointer">
                                        <div className="space-y-1">
                                            <span className="font-sans text-[10px] tracking-[0.3em] text-gold-dust uppercase opacity-60 group-hover:opacity-100 transition-opacity">{evt.date}</span>
                                            <h3 className="text-3xl font-serif text-starlight group-hover:pl-4 transition-all duration-500">{evt.title}</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-gold-dust/20 flex items-center justify-center group-hover:bg-gold-dust group-hover:text-vdark transition-all duration-500">
                                            <span className="text-xs">+</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="font-sans text-starlight/40 font-light leading-relaxed max-w-md italic">
                                Immerse yourself in the deconstructed art of consumption. Reservations are strictly managed.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gold-dust/5 rounded-2xl group-hover:scale-110 transition-transform duration-1000"></div>
                            <div className="relative overflow-hidden rounded-2xl border border-white/10">
                                <img
                                    src={eventImg}
                                    alt="Tasting Event"
                                    className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-vdark via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

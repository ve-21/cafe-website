import ScrollReveal from './ScrollReveal';
import heritageImg from '../assets/heritage_beans.png';
import { motion } from 'framer-motion';

export default function Story() {
    return (
        <section id="story" className="min-h-screen py-32 relative overflow-hidden bg-vdark">
            {/* Grain & Decor */}
            <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none"></div>
            <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-gold-dust/5 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <ScrollReveal>
                        <div className="relative group">
                            <div className="absolute -inset-8 border border-gold-dust/20 rounded-2xl group-hover:rotate-0 rotate-3 transition-transform duration-1000"></div>
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                                <img
                                    src={heritageImg}
                                    alt="Heritage Organic Beans"
                                    className="w-full scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale brightness-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-vdark via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase block">
                                    Our Pedigree
                                </span>
                                <h2 className="text-5xl md:text-7xl font-serif text-starlight leading-[1.1]">
                                    Heritage <br />
                                    <span className="italic text-gold-dust">Organic</span>
                                </h2>
                            </div>

                            <div className="space-y-6 max-w-lg">
                                <p className="text-starlight/60 font-sans text-lg font-light leading-relaxed">
                                    Our beans are not merely grown; they are curated from the oldest estates in the highlands.
                                    Bathed in mist and nurtured by decades of silence.
                                </p>
                                <p className="text-starlight/60 font-sans text-lg font-light leading-relaxed">
                                    We believe in the deconstruction of the traditional coffee experience. Here, gravity is a suggestion,
                                    and flavor is the only absolute law.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 bg-transparent border border-gold-dust/50 text-gold-dust hover:bg-gold-dust hover:text-vdark transition-all duration-500 font-sans uppercase tracking-[0.3em] text-[10px] font-bold"
                            >
                                Read the Journal
                            </motion.button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

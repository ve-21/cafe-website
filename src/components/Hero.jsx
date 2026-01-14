import { motion } from 'framer-motion';
import steamImg from '../assets/coffee_steam_macro_1768209032321.png';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-vdark">
            {/* Grain Overlay for Cinematic Feel */}
            <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-30"></div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-gold-dust/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-forest/10 rounded-full blur-[120px] animate-float"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <motion.p
                            initial={{ letterSpacing: '0.1em', opacity: 0 }}
                            animate={{ letterSpacing: '0.4em', opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-gold-dust text-xs uppercase font-sans mb-8"
                        >
                            The Pinnacle of Organic Luxury
                        </motion.p>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-parchment leading-[0.9] mb-12">
                            <span className="block opacity-90">Defying</span>
                            <span className="block italic text-gold-dust ml-12">Gravity</span>
                        </h1>

                        <p className="text-starlight/60 max-w-lg mx-auto font-sans text-lg font-light leading-relaxed mb-12">
                            Where time slows down and every drop tells a century-old story. Experience coffee beyond the earth's pull.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/order-menu')}
                                className="px-12 py-5 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-widest text-sm hover:bg-starlight transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            >
                                Experience the Menu
                            </motion.button>
                            <button className="text-starlight/80 font-sans uppercase tracking-[0.2em] text-xs hover:text-gold-dust transition-colors border-b border-starlight/20 pb-2">
                                Our Heritage
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Cinematic Float Image */}
            <motion.div
                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl -z-0 opacity-40 mix-blend-screen pointer-events-none"
                animate={{
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <img src={steamImg} alt="Luxury Essence" className="w-full h-auto" />
            </motion.div>
        </section>
    );
}

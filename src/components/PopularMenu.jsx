import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopularMenu() {
    const [items, setItems] = useState([
        { id: 1, name: "Truffle Avocado Toast", price: "$14.00", description: "Sourdough, shaved black truffle, poached egg.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80" },
        { id: 2, name: "Cold Brew Tonic", price: "$6.00", description: "Ethiopian cold brew with artisan tonic water.", image: "https://images.unsplash.com/photo-1517701604599-bb29b5c7dd90?auto=format&fit=crop&w=800&q=80" },
        { id: 3, name: "Pistachio Rose Cake", price: "$8.50", description: "Persian style cake with rosewater glaze.", image: "https://images.unsplash.com/photo-1568625959952-b892a02e6043?auto=format&fit=crop&w=800&q=80" },
        { id: 4, name: "Lavender Latte", price: "$6.50", description: "House-made lavender syrup, double shot.", image: "https://images.unsplash.com/photo-1550503020-f47285a73e66?auto=format&fit=crop&w=800&q=80" }
    ]);

    const [isExpanded, setIsExpanded] = useState(false);
    const visibleItems = isExpanded ? items : items.slice(0, 3);

    return (
        <section className="py-24 bg-nebula relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-20 space-y-4">
                        <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase">
                            The Collection
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-starlight">Guests Favorites</h2>
                        <div className="w-24 h-[1px] bg-gold-dust/30 mx-auto mt-6"></div>
                    </div>
                </ScrollReveal>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <AnimatePresence>
                        {visibleItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-vdark shadow-2xl">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-100 transition-opacity"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-vdark via-vdark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>

                                    {/* Content inside card */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-end mb-4">
                                            <h3 className="text-2xl font-serif text-starlight pr-4">{item.name}</h3>
                                            <span className="text-gold-dust font-sans font-medium text-lg">{item.price}</span>
                                        </div>
                                        <p className="text-starlight/40 text-sm font-sans font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            {item.description}
                                        </p>
                                        <button className="text-gold-dust text-[10px] uppercase tracking-[0.2em] border-b border-gold-dust/20 pb-1 hover:border-gold-dust transition-all">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {items.length > 3 && (
                    <div className="text-center mt-20">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-12 py-4 bg-vdark border border-gold-dust/20 text-gold-dust hover:border-gold-dust transition-all duration-500 font-sans uppercase tracking-[0.2em] text-[10px] font-bold"
                        >
                            {isExpanded ? "Show Selection" : "Explore All Favorites"}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}

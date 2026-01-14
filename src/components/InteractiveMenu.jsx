import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InteractiveMenu() {
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: "Velvet Espresso", price: "$4.50", category: "Coffee", rank: 1, description: "Double shot, notes of dark chocolate and cherry.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Estate Pour Over", price: "$6.00", category: "Coffee", rank: 1, description: "Single origin, hand-poured, floral aroma.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 3, name: "Maple Smoked Latte", price: "$7.50", originalPrice: "$8.50", category: "Seasonal", rank: 2, description: "Real maple syrup, smoked sea salt, oat milk.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
        { id: 4, name: "Ancient Grain Croissant", price: "$5.00", category: "Bakery", rank: 3, description: "Buttery layers with spelt and quinoa flour.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 5, name: "Heritage Avocado Toast", price: "$14.00", category: "Brunch", rank: 4, description: "Sourdough, heirloom tomatoes, micro-greens.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=200&q=80" },
    ]);

    const uniqueCategories = [...new Set(menuItems.map(item => item.category))].slice(0, 4);
    const groupedMenu = menuItems.reduce((acc, item) => {
        if (!uniqueCategories.includes(item.category)) return acc;
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <section id="menu" className="py-32 bg-vdark text-starlight min-h-screen relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gold-dust/5"></div>
            <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gold-dust/5"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-32 space-y-4">
                        <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase">The Collection</span>
                        <h2 className="text-5xl md:text-8xl font-serif">Menu Preview</h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-x-32 gap-y-24">
                    {uniqueCategories.map((category) => {
                        const items = groupedMenu[category];
                        const visibleItems = items.slice(0, 2);

                        return (
                            <div key={category} className="space-y-12">
                                <ScrollReveal>
                                    <div className="flex items-center gap-6">
                                        <h3 className="text-3xl font-serif text-gold-dust italic">{category}</h3>
                                        <div className="h-[1px] flex-1 bg-gold-dust/20"></div>
                                    </div>
                                </ScrollReveal>

                                <div className="space-y-12">
                                    {visibleItems.map((item) => (
                                        <ScrollReveal key={item.id}>
                                            <motion.div whileHover={{ x: 10 }} className="group flex gap-6 items-start">
                                                {/* Thumbnail with luxury frame */}
                                                {item.image && (
                                                    <div className="w-16 h-16 flex-shrink-0 relative">
                                                        <div className="absolute inset-0 border border-gold-dust/10 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                                        <div className="relative w-full h-full bg-nebula overflow-hidden border border-white/5">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover opacity-100 transition-all duration-700"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex-grow">
                                                    <div className="flex items-baseline justify-between mb-2">
                                                        <h4 className="text-2xl font-serif text-starlight group-hover:text-gold-dust transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <div className="flex-grow border-b border-dotted border-gold-dust/20 mx-4 relative -top-1"></div>
                                                        <span className="text-xl font-sans font-light text-gold-dust">{item.price}</span>
                                                    </div>
                                                    <p className="text-starlight/40 font-sans text-sm font-light leading-relaxed max-w-md">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-32">
                    <ScrollReveal>
                        <Link
                            to="/order-menu"
                            className="inline-block px-14 py-5 border border-gold-dust/30 text-gold-dust hover:bg-gold-dust hover:text-vdark transition-all duration-500 font-sans text-xs font-bold tracking-[0.3em] uppercase"
                        >
                            Explore Full Catalog
                        </Link>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

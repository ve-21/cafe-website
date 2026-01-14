import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FullMenuPage() {
    // In a real app, fetch from /api/menu
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: "Velvet Espresso", price: "$4.50", category: "Coffee", rank: 1, description: "Double shot, notes of dark chocolate and cherry.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Estate Pour Over", price: "$6.00", category: "Coffee", rank: 1, description: "Single origin, hand-poured, floral aroma.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 12, name: "Flat White", price: "$5.50", category: "Coffee", rank: 1, description: "Micro-foam perfection with a nutty finish.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
        { id: 3, name: "Maple Smoked Latte", price: "$7.50", originalPrice: "$8.50", category: "Seasonal", rank: 2, description: "Real maple syrup, smoked sea salt, oat milk.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
        { id: 4, name: "Ancient Grain Croissant", price: "$5.00", category: "Bakery", rank: 3, description: "Buttery layers with spelt and quinoa flour.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 14, name: "Vegan Lemon Scone", price: "$4.50", category: "Bakery", rank: 3, description: "Zesty lemon glaze, poppy seeds.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 24, name: "Matcha Cruffin", price: "$6.00", category: "Bakery", rank: 3, description: "Croissant-muffin hybrid with matcha cream.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 5, name: "Heritage Avocado Toast", price: "$14.00", category: "Brunch", rank: 4, description: "Sourdough, heirloom tomatoes, micro-greens.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=200&q=80" },
        { id: 6, name: "Forest Mushroom Tartine", price: "$16.00", category: "Brunch", rank: 4, description: "Wild mushrooms, truffle oil, ricotta spread.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
        { id: 7, name: "Antigravity Bowl", price: "$13.00", category: "Brunch", rank: 4, description: "Quinoa, roasted roots, tahini dressing.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" }
    ]);

    const categories = [...new Set(menuItems.map(item => item.category))];

    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const scrollToCategory = (category) => {
        setActiveCategory(category);
        const element = document.getElementById(category);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const groupedMenu = menuItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});


    return (
        <div className="bg-vdark min-h-screen pt-20 text-starlight selection:bg-gold-dust selection:text-vdark">
            {/* Grain Overlay */}
            <div className="fixed inset-0 bg-grain pointer-events-none opacity-20 z-0"></div>

            {/* Sticky Category Nav */}
            <motion.div
                initial={{ y: -100 }} animate={{ y: 0 }}
                className="sticky top-0 z-40 bg-vdark/80 backdrop-blur-xl border-b border-white/5 py-8"
            >
                <div className="container mx-auto px-6 overflow-x-auto whitespace-nowrap hide-scrollbar flex justify-center gap-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => scrollToCategory(cat)}
                            className={`text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 pb-2 border-b-2 ${activeCategory === cat ? 'text-gold-dust border-gold-dust' : 'text-starlight/40 border-transparent hover:text-starlight'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="container mx-auto px-6 max-w-5xl py-24 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-32 space-y-6">
                        <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.5em] uppercase block">Archives</span>
                        <h1 className="text-6xl md:text-8xl font-serif text-starlight mb-6">Complete Menu</h1>
                        <p className="text-starlight/40 max-w-xl mx-auto font-sans leading-relaxed text-lg font-light italic">
                            A comprehensive curation of our finest offerings, from morning brews to evening indulgences.
                        </p>
                    </div>
                </ScrollReveal>

                {Object.keys(groupedMenu).map((category, index) => (
                    <div key={category} id={category} className="mb-40 scroll-mt-40">
                        <ScrollReveal>
                            <div className="flex items-center gap-8 mb-20">
                                <h3 className="text-4xl md:text-5xl font-serif text-starlight italic lowercase">
                                    {category}
                                    <span className="text-gold-dust not-italic ml-2">.</span>
                                </h3>
                                <div className="h-[1px] bg-gradient-to-r from-gold-dust/20 to-transparent flex-grow"></div>
                            </div>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                            {groupedMenu[category].map((item) => (
                                <ScrollReveal key={item.id}>
                                    <motion.div whileHover={{ x: 10 }} className="group flex gap-8 items-start">
                                        {/* Thumbnail with luxury frame */}
                                        {item.image && (
                                            <div className="w-24 h-24 flex-shrink-0 relative">
                                                <div className="absolute inset-0 border border-gold-dust/20 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                                <div className="relative w-full h-full bg-nebula overflow-hidden border border-white/10">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex-grow pt-2">
                                            <div className="flex items-baseline justify-between mb-3">
                                                <h4 className="text-2xl font-serif text-starlight opacity-90 group-hover:text-gold-dust transition-colors">
                                                    {item.name}
                                                </h4>
                                                <div className="flex gap-3 items-center">
                                                    {item.originalPrice && (
                                                        <span className="text-xs text-starlight/20 line-through font-sans">
                                                            {item.originalPrice}
                                                        </span>
                                                    )}
                                                    <span className="text-xl font-sans font-medium text-gold-dust">
                                                        {item.price}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-starlight/40 text-[13px] font-sans leading-relaxed max-w-sm font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-32 border-t border-white/5 relative z-10">
                <Link to="/" className="group inline-flex items-center gap-4 text-gold-dust font-sans text-[10px] font-bold tracking-[0.5em] uppercase hover:underline underline-offset-8 decoration-gold-dust/30 decoration-2">
                    <span className="w-8 h-px bg-gold-dust group-hover:w-12 transition-all"></span>
                    Return to Estate Home
                </Link>
            </div>
        </div>
    );
}

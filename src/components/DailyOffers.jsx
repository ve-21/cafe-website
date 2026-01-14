import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DailyOffers() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([
        { id: 1, title: "Velvet Cardamom Bun", originalPrice: "$6.50", discountPrice: "$5.00", description: "Warm, spiced brioche knotted with cardamom.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=800&q=80" },
        { id: 2, title: "Reserve Geisha", originalPrice: "$15.00", discountPrice: "$12.00", description: "Floral notes of jasmine and bergamot.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" },
        { id: 3, title: "Smoked Vanilla Latte", originalPrice: "$7.00", discountPrice: "$5.50", description: "House-smoked vanilla bean & espresso.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80" }
    ]);

    const displayOffers = offers.slice(0, 3);

    return (
        <section className="py-24 bg-vdark border-y border-white/5 relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase block">
                                Seasonal Highlights
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-starlight">Today Offers</h2>
                        </div>
                        <div className="h-[1px] flex-1 bg-gold-dust/10 hidden md:block mx-12"></div>
                        <p className="text-starlight/40 font-sans text-sm max-w-xs leading-relaxed italic">
                            Hand-selected micro-lots and house-baked rarities, available until sold out.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-12">
                    {displayOffers.map((offer, idx) => (
                        <ScrollReveal key={offer.id}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="group relative"
                            >
                                <div className="h-[450px] overflow-hidden rounded-2xl border border-white/5 relative bg-nebula shadow-2xl">
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000"
                                    />

                                    {/* Glass Content Overlay */}
                                    <div className="absolute inset-x-4 bottom-4 bg-vdark/80 backdrop-blur-md border border-white/10 p-8 rounded-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-serif text-starlight mb-2">{offer.title}</h3>
                                        <p className="text-starlight/40 font-sans text-xs mb-6 uppercase tracking-widest">{offer.description}</p>

                                        <div className="flex items-center gap-4">
                                            {offer.discountPrice && offer.discountPrice !== offer.originalPrice ? (
                                                <>
                                                    <span className="text-gold-dust text-2xl font-sans font-bold">
                                                        {offer.discountPrice}
                                                    </span>
                                                    <span className="text-starlight/20 text-sm line-through font-sans">
                                                        {offer.originalPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-gold-dust text-2xl font-sans font-bold">
                                                    {offer.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sale Tag */}
                                    {offer.discountPrice && (
                                        <div className="absolute top-6 left-6 bg-gold-dust text-vdark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                            Curated Deal
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={() => navigate('/order-menu')}
                        className="text-starlight font-sans uppercase tracking-[0.3em] text-[10px] pb-2 border-b border-gold-dust/30 hover:border-gold-dust transition-all"
                    >
                        Discover the full collection
                    </button>
                </div>
            </div>
        </section>
    );
}

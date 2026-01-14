import ScrollReveal from './ScrollReveal';
import beansImg from '../assets/coffee_beans_floating_1768209064137.png';

export default function MenuHighlights() {
    const items = [
        { name: "Velvet Espresso", price: "$6.50", desc: "Double shot, micro-foam, gold dust." },
        { name: "Antigravity Cold Brew", price: "$8.00", desc: "Nitrogen-infused, suspended cream." },
        { name: "Copper Latte", price: "$7.50", desc: "Caramelized milk, cinnamon smoke." },
    ];

    return (
        <section className="min-h-screen py-24 relative bg-forest text-parchment overflow-hidden">
            {/* Background Beans */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img src={beansImg} alt="Floating Beans" className="w-full h-full object-cover animate-float" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <h2 className="text-center text-4xl md:text-6xl font-serif mb-20">Curated Selections</h2>
                </ScrollReveal>

                <div className="max-w-2xl mx-auto space-y-12">
                    {items.map((item, i) => (
                        <ScrollReveal key={i}>
                            <div className="group border-b border-parchment/20 pb-6 hover:border-parchment/60 transition-colors cursor-pointer">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-2xl font-serif group-hover:text-copper transition-colors">{item.name}</h3>
                                    <span className="font-sans text-copper font-medium">{item.price}</span>
                                </div>
                                <p className="font-sans text-parchment/60 text-sm tracking-wide">{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

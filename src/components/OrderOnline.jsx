import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';

export default function OrderOnline() {
    return (
        <section id="order-online" className="py-32 bg-vdark relative border-y border-white/5">
            <div className="container mx-auto px-6 text-center">
                <ScrollReveal>
                    <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase block mb-6">Efficiency</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-starlight mb-8">Order for Pickup</h2>
                    <p className="font-sans text-starlight/40 max-w-xl mx-auto mb-16 italic text-lg font-light leading-relaxed">
                        Skip the line. Order your favorites ahead of time and we'll have them suspended in perfection waiting for you.
                    </p>

                    <div className="flex justify-center">
                        <Link to="/order-menu" className="px-16 py-6 bg-gold-dust text-vdark hover:bg-starlight transition-all duration-500 font-sans font-bold uppercase tracking-[0.3em] text-[10px] shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                            Start Order
                        </Link>
                    </div>

                    <p className="mt-16 text-[9px] font-sans text-starlight/20 uppercase tracking-[0.4em]">
                        Powered by Square & Resonance v2.0
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}

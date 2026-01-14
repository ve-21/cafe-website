import ScrollReveal from './ScrollReveal';
import { Instagram } from 'lucide-react';

export default function InstagramFeed() {
    // Using placeholders or existing assets for the vibe
    return (
        <section className="py-32 bg-vdark">
            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <div className="flex flex-col items-center mb-24 text-center space-y-4">
                        <div className="w-16 h-16 bg-gold-dust/10 rounded-full flex items-center justify-center text-gold-dust border border-gold-dust/20 mb-4">
                            <Instagram className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-serif text-starlight tracking-tight">@TheAntigravityEstate</h2>
                        <a href="#" className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-dust hover:text-starlight transition-all duration-500 font-bold border-b border-gold-dust/20 pb-2">Connect with the Resonance</a>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <ScrollReveal key={i}>
                            <div className="aspect-[4/5] bg-nebula relative group overflow-hidden cursor-pointer border border-white/5 rounded-2xl">
                                {/* Synthetic Bloom Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-vdark to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-80"></div>

                                <div className="absolute inset-0 bg-gradient-to-br from-gold-dust/5 to-transparent group-hover:scale-110 transition-transform duration-1000"></div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-vdark/60 backdrop-blur-sm text-gold-dust font-sans text-[10px] tracking-[0.5em] uppercase font-bold z-20">
                                    <span className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Artifact</span>
                                </div>

                                {/* Abstract Decorative Ring */}
                                <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-gold-dust/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

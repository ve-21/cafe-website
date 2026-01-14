import ScrollReveal from './ScrollReveal';
import brewImg from '../assets/brewing_method_copper_1768209635206.png';
import { motion } from 'framer-motion';

export default function Process() {
    const steps = [
        { title: "THE SELECTION", subtitle: "Curated from 2000m above sea level", text: "Hand-picked cherries from micro-lots where oxygen is thin and flavors are concentrated." },
        { title: "THE ROAST", subtitle: "Restored 1920s Gothot Drums", text: "Small-batch roasting where we listen for the second crack to lock in volatile aromatics." },
        { title: "THE ALCHEMY", subtitle: "Precision Copper Extraction", text: "Using hand-beaten copper V60s and water filtered through artisanal volcanic stone." },
    ];

    return (
        <section className="min-h-screen py-32 bg-nebula relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 opacity-10 grayscale mix-blend-overlay">
                <img src={brewImg} alt="Brewing Process" className="w-full h-full object-cover scale-150 rotate-12" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-32 space-y-4">
                        <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.5em] uppercase block">
                            The Methodology
                        </span>
                        <h2 className="text-5xl md:text-8xl font-serif text-starlight italic opacity-10">The Ritual</h2>
                        <h2 className="text-4xl md:text-6xl font-serif text-starlight -mt-10 md:-mt-16">The Alchemic Process</h2>
                    </div>
                </ScrollReveal>

                <div className="relative space-y-40">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gold-dust/20 -translate-x-1/2 hidden md:block"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <ScrollReveal>
                                <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Number Circle on Line */}
                                    <div className="absolute left-[20px] md:left-1/2 top-0 w-10 h-10 bg-vdark border border-gold-dust text-gold-dust font-serif italic text-sm flex items-center justify-center rounded-full -translate-x-1/2 z-20 hidden md:flex">
                                        0{index + 1}
                                    </div>

                                    <div className="w-full md:w-1/2 group">
                                        <div className="p-8 md:p-12 bg-vdark/40 backdrop-blur-md border border-white/5 rounded-2xl group-hover:border-gold-dust/30 transition-all duration-700">
                                            <span className="text-gold-dust font-sans text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">{step.subtitle}</span>
                                            <h3 className="text-3xl font-serif text-starlight mb-6">{step.title}</h3>
                                            <p className="font-sans text-starlight/40 leading-relaxed font-light">{step.text}</p>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 hidden md:block">
                                        {/* Spacer for the other side of timeline */}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

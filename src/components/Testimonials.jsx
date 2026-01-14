import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
    const reviews = [
        { text: "“A suspended reality. The espresso defies physics.”", author: "Julian V.", title: "Gault&Millau Critic" },
        { text: "“The Antigravity Estate is not a cafe; it is a sanctuary for the senses.”", author: "Elara M.", title: "Architectural Digest" },
        { text: "“Time stops here. Pure, unadulterated luxury.”", author: "Marcus T.", title: "Master Sommelier" },
    ];

    return (
        <section className="py-40 bg-vdark relative overflow-hidden">
            {/* Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-gold-dust/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid gap-20 lg:grid-cols-3">
                    {reviews.map((review, i) => (
                        <ScrollReveal key={i}>
                            <div className="space-y-10 group cursor-default">
                                <div className="text-6xl text-gold-dust/20 font-serif font-light leading-none group-hover:text-gold-dust/80 transition-colors duration-700">“</div>
                                <p className="font-serif text-3xl text-starlight leading-relaxed italic pr-8">
                                    {review.text.replace(/“|”/g, '')}
                                </p>
                                <div className="space-y-1">
                                    <p className="font-sans text-[10px] font-bold tracking-[0.4em] text-gold-dust uppercase">{review.author}</p>
                                    <p className="font-sans text-[9px] tracking-[0.25em] text-starlight/30 uppercase">{review.title}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

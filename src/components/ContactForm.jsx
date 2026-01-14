import ScrollReveal from './ScrollReveal';

export default function ContactForm() {
    return (
        <section className="py-32 bg-vdark text-starlight relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-dust/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-24 space-y-6">
                        <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.4em] uppercase block">Correspondence</span>
                        <h2 className="text-5xl md:text-7xl font-serif">Reach Out</h2>
                        <p className="font-sans text-starlight/40 font-light italic leading-relaxed">For private events, deconstructed catering, or general inquiries into the estate.</p>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <form className="bg-nebula/40 backdrop-blur-xl p-10 md:p-16 border border-white/5 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const data = {
                                name: e.target.name.value,
                                email: e.target.email.value,
                                phone: e.target.phone.value,
                                objective: e.target.objective.value,
                                message: e.target.message.value
                            };

                            try {
                                const res = await fetch('/api/messages', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });
                                if (res.ok) {
                                    alert("Your correspondence has been transmitted to the estate.");
                                    e.target.reset();
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        {/* Honeypot field - hidden */}
                        <div className="hidden">
                            <label>Bot check: <input name="bot-field" /></label>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Identity</label>
                                <input name="name" type="text" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Liaison</label>
                                <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Contact Chronicle</label>
                                <input name="phone" type="tel" placeholder="Phone Number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Objective</label>
                                <div className="relative">
                                    <select name="objective" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight/60 appearance-none cursor-pointer [&>option]:bg-vdark">
                                        <option>General Correspondence</option>
                                        <option>Birthday Party</option>
                                        <option>Marriage</option>
                                        <option>Normal Function</option>
                                        <option>Private Procurement / Events</option>
                                        <option>Estate Catering</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold-dust/40">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-16 space-y-4">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Inquiry</label>
                            <textarea name="message" placeholder="Tell us about your requirements..." required rows="5" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full py-6 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-starlight transition-all duration-500 shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                            Transmit Message
                        </button>
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
}

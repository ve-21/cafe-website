import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Info, Trash2, Send } from 'lucide-react';

export default function MessageManager() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(setMessages);
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Archive this correspondence?")) return;
        const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        if (res.ok) setMessages(prev => prev.filter(m => m.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-3xl font-serif text-starlight">Correspondence</h2>
                    <p className="text-starlight/40 text-xs mt-2 uppercase tracking-widest">Public Liaison & General Inquiries</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="bg-gold-dust/10 text-gold-dust px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold-dust/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        {messages.length} Active Records
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] flex flex-col lg:flex-row gap-12 relative items-start hover:border-gold-dust/20 transition-all duration-700 group group"
                        >
                            <div className="min-w-[280px] space-y-4">
                                <div className="inline-flex items-center gap-2 bg-gold-dust/10 text-gold-dust px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] mb-2 border border-gold-dust/20">
                                    <Info size={10} />
                                    {msg.objective}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-starlight leading-tight">{msg.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-starlight/40 text-[10px] uppercase font-sans tracking-widest font-bold">Identity Transmitted</p>
                                        <span className="w-1 h-1 rounded-full bg-gold-dust/20"></span>
                                        <p className="text-gold-dust/60 text-[10px] font-sans tracking-widest uppercase">
                                            {msg.timestamp ? new Date(msg.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Archive Date Unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gold-dust hover:text-starlight transition-colors font-sans cursor-pointer group-hover:translate-x-1 duration-500">
                                    <Mail size={16} />
                                    <span className="border-b border-gold-dust/20 pb-0.5">{msg.email}</span>
                                </div>
                                {msg.phone && (
                                    <div className="flex items-center gap-3 text-sm text-starlight/60 font-sans mt-2">
                                        <div className="w-4 flex justify-center">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </div>
                                        <span className="tracking-widest font-bold text-[11px]">{msg.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative min-h-[160px]">
                                <span className="absolute top-[-10px] left-8 bg-vdark px-3 text-[8px] uppercase tracking-widest text-starlight/20 font-bold flex items-center gap-2">
                                    Transmission Content
                                    {msg.timestamp && (
                                        <>
                                            <span className="text-gold-dust/30">•</span>
                                            <span className="text-gold-dust/40">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </>
                                    )}
                                </span>
                                <p className="text-starlight/70 text-base leading-relaxed font-sans font-light italic">
                                    "{msg.message}"
                                </p>
                                <div className="absolute bottom-6 right-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button onClick={() => handleDelete(msg.id)} className="p-3 bg-red-950/30 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20">
                                        <Trash2 size={18} />
                                    </button>
                                    <a href={`mailto:${msg.email}`} className="p-3 bg-gold-dust/10 text-gold-dust hover:bg-gold-dust hover:text-vdark rounded-xl transition-all border border-gold-dust/20">
                                        <Send size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {messages.length === 0 && (
                <div className="py-32 text-center space-y-4 opacity-10">
                    <Mail size={48} className="mx-auto" />
                    <p className="font-serif italic text-xl">The Correspondence Vault is Secure</p>
                </div>
            )}
        </div>
    );
}

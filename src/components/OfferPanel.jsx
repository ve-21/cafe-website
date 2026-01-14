import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function OfferPanel() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show offer after 4 seconds
        const timer = setTimeout(() => setIsVisible(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // "custom bezier" ish
                    className="fixed bottom-6 right-6 z-[60] w-full max-w-sm"
                >
                    <div className="relative bg-[#0F1C15] border border-copper/30 p-10 shadow-2xl overflow-hidden">
                        {/* Background grain effect specifically for this panel if needed, or just solid */}

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-forest/40 hover:text-copper transition-colors"
                            aria-label="Dismiss Offer"
                        >
                            <X size={16} strokeWidth={1} />
                        </button>

                        {/* Staggered Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
                                }
                            }}
                            className="space-y-6 text-center"
                        >
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
                                <p className="text-copper text-xs uppercase tracking-[0.2em] font-sans mb-3">Limited Invitation</p>
                                <h3 className="text-3xl font-serif text-parchment leading-tight">
                                    The Evening<br />Cupping
                                </h3>
                            </motion.div>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                                className="font-sans text-parchment/60 text-sm leading-relaxed"
                            >
                                Experience our reserve micro-lots. Receive a complimentary tasting flight with your first reservation.
                            </motion.p>

                            <motion.button
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                                className="w-full py-3 bg-copper text-forest-dark font-serif font-medium uppercase tracking-widest hover:bg-parchment transition-colors duration-500 mt-2"
                            >
                                Claim Invitation
                            </motion.button>

                            <motion.button
                                onClick={() => setIsVisible(false)}
                                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                className="text-white/20 text-[10px] uppercase tracking-widest hover:text-white/40 transition-colors"
                            >
                                Dismiss
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

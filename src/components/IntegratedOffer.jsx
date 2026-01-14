import { motion } from 'framer-motion';

export default function IntegratedOffer() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-[45px] bg-[#1a1a1a] flex items-center justify-center relative z-40"
        >
            {/* Elegant Gold Separator Line */}
            <div className="absolute top-0 left-0 w-full h-[0.5px] bg-[#D4AF37]/50"></div>

            <p className="text-[#D4AF37] font-serif text-xs md:text-sm tracking-[2px] uppercase text-center font-medium">
                An Exclusive Invitation: Enjoy a Complimentary Pastry with your First Reserve Brew.
            </p>
        </motion.div>
    );
}

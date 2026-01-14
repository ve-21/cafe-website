import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock authentication for demo
        if (email === 'admin@antigravity.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-vdark flex items-center justify-center text-starlight relative overflow-hidden selection:bg-gold-dust selection:text-vdark">
            {/* Grain Overlay */}
            <div className="fixed inset-0 bg-grain pointer-events-none opacity-20 z-0"></div>

            {/* Ambient Lighting */}
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gold-dust/5 blur-[150px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md p-12 border border-white/5 bg-nebula/40 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-3xl relative z-10"
            >
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex p-5 bg-gold-dust/5 rounded-full border border-gold-dust/20 mb-4 text-gold-dust">
                        <Lock size={28} />
                    </div>
                    <span className="text-gold-dust font-sans text-[10px] font-bold tracking-[0.4em] uppercase block">Security Protocol</span>
                    <h1 className="text-4xl font-serif">Estate Access</h1>
                    <p className="text-starlight/30 text-[10px] font-sans tracking-[0.2em] uppercase">Authorized Personnel Token Required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-10">
                    <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-gold-dust ml-1">Identity Identifier</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm"
                            placeholder="admin@antigravity.com"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-gold-dust ml-1">Secure Passkey</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                    <button className="w-full py-6 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-starlight transition-all duration-500 shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                        Authorize Access
                    </button>
                    <p className="text-center text-starlight/20 text-[9px] uppercase tracking-[0.2em]">Resonance v2.0 Cryptographic System</p>
                </form>
            </motion.div>
        </div>
    );
}

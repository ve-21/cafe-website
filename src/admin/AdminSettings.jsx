import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Lock, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showPasswordChange, setShowPasswordChange] = useState(false);

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => setName(data.name));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (showPasswordChange && newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    password: (showPasswordChange && newPassword) ? newPassword : undefined,
                    currentPassword
                })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: 'Estate credentials updated successfully' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordChange(false);
            } else {
                setMessage({ type: 'error', text: data.error || 'Update failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'System error during authorization update' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
            <div className="text-center md:text-left">
                <h2 className="text-4xl font-serif text-starlight">Estate Authority</h2>
                <p className="text-starlight/40 text-xs mt-2 uppercase tracking-[0.3em] font-bold">Manage Admin Credentials & Protocol</p>
            </div>

            <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 rounded-[48px] overflow-hidden shadow-2xl p-10 md:p-16">
                <form onSubmit={handleUpdate} className="space-y-16">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border flex items-center gap-4 ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                        >
                            {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                            <span className="font-sans text-sm tracking-wide">{message.text}</span>
                        </motion.div>
                    )}

                    <div className="space-y-12">
                        {/* Identity Section - Always Visible */}
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-gold-dust">
                                    <User size={20} />
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Authorized Identity</span>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-starlight/30 font-bold ml-1">Admin Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Estate master name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-gold-dust outline-none transition-all font-sans text-lg text-starlight"
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-gold-dust">
                                    <Shield size={20} />
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Authorization</span>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] uppercase tracking-[0.3em] text-starlight/30 font-bold ml-1">Current Cipher</label>
                                    <input
                                        type="password"
                                        required
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Verify with existing password"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Change Toggle */}
                        <div className="pt-8 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => setShowPasswordChange(!showPasswordChange)}
                                className="flex items-center gap-3 text-gold-dust hover:text-starlight transition-colors group"
                            >
                                <Lock size={18} className={showPasswordChange ? "rotate-12 transition-transform" : ""} />
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black">{showPasswordChange ? "Cancel Cipher Update" : "Change Security Cipher (Password)"}</span>
                            </button>

                            <AnimatePresence>
                                {showPasswordChange && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="grid md:grid-cols-2 gap-8 pt-10">
                                            <div className="space-y-4">
                                                <label className="block text-[10px] uppercase tracking-[0.3em] text-starlight/30 font-bold ml-1">New Cipher</label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-[10px] uppercase tracking-[0.3em] text-starlight/30 font-bold ml-1">Confirm New Cipher</label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Retype new password"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5">
                        <button
                            disabled={loading}
                            className="w-full md:w-auto px-16 py-6 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-starlight transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-4 disabled:opacity-50"
                        >
                            <Save size={14} />
                            {loading ? "Transmitting Changes..." : "Secure and Save Settings"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-gold-dust/5 border border-gold-dust/10 p-10 rounded-[40px] flex items-start gap-8">
                <Shield size={32} className="text-gold-dust shrink-0 mt-1" />
                <div className="space-y-2">
                    <h4 className="text-gold-dust font-serif italic text-xl">Governance Protocol</h4>
                    <p className="text-starlight/50 font-sans text-sm leading-relaxed">
                        Changes to the Authorized Identity or Security Protocol will take effect immediately. Please ensure you store your new cipher securely, as recovery requires manual estate intervention.
                    </p>
                </div>
            </div>
        </div>
    );
}

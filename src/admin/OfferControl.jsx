import { useState, useEffect } from 'react';
import { Plus, Trash2, Tag, Upload, ImageIcon } from 'lucide-react';

export default function OfferManager() {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({ title: '', originalPrice: '', discountPrice: '', description: '', image: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        const res = await fetch('/api/offers');
        const data = await res.json();
        setOffers(data);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewOffer({ ...newOffer, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async () => {
        if (!newOffer.image) {
            alert("Please upload an offer visualization.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOffer)
            });
            if (res.ok) {
                fetchOffers();
                setNewOffer({ title: '', originalPrice: '', discountPrice: '', description: '', image: '' });
            }
        } catch (error) {
            console.error("Failed to add offer:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
        if (res.ok) fetchOffers();
    };

    return (
        <div className="space-y-12 pb-20">
            <h2 className="text-4xl font-serif text-starlight">Offer Control</h2>

            <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] space-y-8 shadow-2xl">
                <div className="flex items-center gap-4">
                    <Tag className="text-gold-dust" size={24} />
                    <h3 className="text-xs uppercase tracking-[0.4em] font-black text-starlight/60">Broadcast New Engagement</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Product Title</label>
                            <input
                                placeholder="e.g. Midnight Cold Brew"
                                value={newOffer.title}
                                onChange={e => setNewOffer({ ...newOffer, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Market Valuation</label>
                                <input
                                    placeholder="Original ($)"
                                    value={newOffer.originalPrice}
                                    onChange={e => setNewOffer({ ...newOffer, originalPrice: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Special Offering</label>
                                <input
                                    placeholder="Discount ($)"
                                    value={newOffer.discountPrice}
                                    onChange={e => setNewOffer({ ...newOffer, discountPrice: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Engagement Narrative</label>
                            <textarea
                                placeholder="Describe the uniqueness of this offering..."
                                value={newOffer.description}
                                onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans h-32 resize-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Offer Visualization</label>
                        <div className="relative group aspect-square lg:aspect-video border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center bg-white/[0.02] overflow-hidden hover:border-gold-dust/30 transition-all cursor-pointer">
                            {newOffer.image ? (
                                <>
                                    <img src={newOffer.image} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" alt="Preview" />
                                    <div className="relative z-10 bg-vdark/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                                        <ImageIcon className="text-gold-dust" size={18} />
                                        <span className="text-[10px] uppercase tracking-widest font-black">Visual Locked</span>
                                    </div>
                                    <label className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 hover:bg-gold-dust hover:text-vdark rounded-full text-[10px] uppercase font-bold cursor-pointer transition-all">Re-visualize</label>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-6 p-12 text-center group-hover:scale-105 transition-transform duration-500">
                                    <div className="w-20 h-20 rounded-full bg-gold-dust/5 flex items-center justify-center border border-gold-dust/10">
                                        <Upload className="text-gold-dust" size={32} />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-lg font-serif italic text-parchment">Upload High-Res Visual</p>
                                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">16:9 Aspect ratio recommended</p>
                                    </div>
                                    <label className="px-10 py-4 bg-white/5 text-parchment hover:bg-gold-dust hover:text-vdark rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all cursor-pointer border border-white/10">Browse Assets</label>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex justify-end">
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="bg-gold-dust text-vdark px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-starlight transition-all duration-700 shadow-[0_15px_30px_rgba(212,175,55,0.15)] flex items-center gap-4 disabled:opacity-50"
                    >
                        {loading ? "Broadcasting..." : <><Plus size={18} /> Publish Offer</>}
                    </button>
                </div>
            </div>

            {/* Offer List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map(offer => (
                    <div key={offer.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 bg-forest-dark/90 px-3 py-1 rounded text-xs font-bold flex gap-2">
                                <span className={offer.discountPrice ? "text-gray-400 line-through" : "text-copper"}>{offer.originalPrice}</span>
                                {offer.discountPrice && <span className="text-copper">{offer.discountPrice}</span>}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-serif mb-2">{offer.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{offer.description}</p>
                            <button onClick={() => handleDelete(offer.id)} className="text-red-400 text-xs uppercase tracking-widest hover:text-red-300 flex items-center gap-2">
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

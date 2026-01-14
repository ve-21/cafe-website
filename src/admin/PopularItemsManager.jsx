import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, Upload, ImageIcon } from 'lucide-react';

export default function PopularItemsManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', description: '', image: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPopular();
    }, []);

    const fetchPopular = async () => {
        const res = await fetch('/api/popular-items');
        const data = await res.json();
        setItems(data);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem({ ...newItem, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async () => {
        if (!newItem.image) {
            alert("Please upload an image portrait.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/popular-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                fetchPopular();
                setNewItem({ name: '', price: '', description: '', image: '' });
            }
        } catch (error) {
            console.error("Failed to add popular item:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/popular-items/${id}`, { method: 'DELETE' });
        if (res.ok) fetchPopular();
    };

    return (
        <div className="space-y-12 pb-20">
            <h2 className="text-4xl font-serif text-starlight">Guest Favorites</h2>

            <div className="bg-nebula/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] space-y-8 shadow-2xl">
                <div className="flex items-center gap-4">
                    <Star className="text-gold-dust" size={24} />
                    <h3 className="text-xs uppercase tracking-[0.4em] font-black text-starlight/60">Curate New Favorite</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Artifact Identity</label>
                            <input
                                placeholder="Item Name"
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Valuation</label>
                            <input
                                placeholder="Price (e.g. $14.50)"
                                value={newItem.price}
                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Narrative</label>
                            <textarea
                                placeholder="Short description of the item's soul..."
                                value={newItem.description}
                                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-parchment outline-none focus:border-gold-dust transition-all font-sans h-32 resize-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-gold-dust font-bold ml-1">Visual Manifest</label>
                        <div className="relative group aspect-square lg:aspect-video border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center bg-white/[0.02] overflow-hidden hover:border-gold-dust/30 transition-all cursor-pointer">
                            {newItem.image ? (
                                <>
                                    <img src={newItem.image} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" alt="Preview" />
                                    <div className="relative z-10 bg-vdark/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                                        <ImageIcon className="text-gold-dust" size={18} />
                                        <span className="text-[10px] uppercase tracking-widest font-black">Frame Captured</span>
                                    </div>
                                    <label className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 hover:bg-gold-dust hover:text-vdark rounded-full text-[10px] uppercase font-bold cursor-pointer transition-all">Replace Portrait</label>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-6 p-12 text-center group-hover:scale-105 transition-transform duration-500">
                                    <div className="w-20 h-20 rounded-full bg-gold-dust/5 flex items-center justify-center border border-gold-dust/10">
                                        <Upload className="text-gold-dust" size={32} />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-lg font-serif italic text-parchment">Upload Item Portrait</p>
                                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Cinematic quality suggested</p>
                                    </div>
                                    <label className="px-10 py-4 bg-white/5 text-parchment hover:bg-gold-dust hover:text-vdark rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] transition-all cursor-pointer border border-white/10">Browse Library</label>
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
                        {loading ? "Archiving..." : <><Plus size={18} /> Add Favorite</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                        <div className="h-40 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif text-lg">{item.name}</h3>
                                <span className="text-copper font-bold">{item.price}</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-4">{item.description}</p>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 text-xs uppercase tracking-widest hover:text-red-300 flex items-center gap-2">
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                        <div className="absolute top-2 right-2 bg-copper text-forest-dark p-1 rounded-full">
                            <Star size={12} fill="currentColor" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

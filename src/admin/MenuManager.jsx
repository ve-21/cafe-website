import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, ImageIcon } from 'lucide-react';

export default function MenuManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Coffee', rank: 1, description: '', image: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const res = await fetch('/api/menu');
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
            alert("Please upload an image first.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (res.ok) {
                fetchMenu();
                setNewItem({ name: '', price: '', category: 'Coffee', rank: 1, description: '', image: '' });
            }
        } catch (error) {
            console.error("Failed to add item:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
        if (res.ok) fetchMenu();
    };

    const categories = ["Coffee", "Seasonal", "Bakery", "Brunch", "Tea"];

    return (
        <div className="space-y-8 pb-20">
            <h2 className="text-3xl font-serif">Menu Manager</h2>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gold-dust">New Collection Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input
                            placeholder="Item Name"
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-parchment outline-none focus:border-gold-dust transition-all"
                        />
                        <div className="flex gap-4">
                            <input
                                placeholder="Price (e.g. 5.00)"
                                value={newItem.price}
                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                className="flex-1 bg-black/20 border border-white/10 p-4 rounded-xl text-parchment outline-none focus:border-gold-dust transition-all"
                            />
                            <select
                                value={newItem.category}
                                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                className="flex-1 bg-black/20 border border-white/10 p-4 rounded-xl text-parchment outline-none focus:border-gold-dust transition-all appearance-none cursor-pointer"
                            >
                                {categories.map(c => <option key={c} value={c} className="bg-vdark text-starlight">{c}</option>)}
                            </select>
                        </div>
                        <input
                            type="number"
                            placeholder="Hierarchy Rank (1-10)"
                            value={newItem.rank}
                            onChange={e => setNewItem({ ...newItem, rank: parseInt(e.target.value) })}
                            className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-parchment outline-none focus:border-gold-dust transition-all"
                        />
                        <textarea
                            placeholder="Description"
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-parchment outline-none focus:border-gold-dust transition-all h-24 resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="relative group h-full min-h-[200px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-black/10 overflow-hidden hover:border-gold-dust/30 transition-all cursor-pointer">
                            {newItem.image ? (
                                <>
                                    <img src={newItem.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Preview" />
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <ImageIcon className="text-gold-dust" size={32} />
                                        <span className="text-[10px] uppercase tracking-widest font-bold">Image Ready</span>
                                        <label className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-[10px] uppercase font-bold cursor-pointer">Re-upload</label>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-4 p-8 text-center">
                                    <Upload className="text-white/20 group-hover:text-gold-dust transition-colors" size={48} />
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Capture or Upload Item Portrait</p>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Supports high-res PNG/JPG</p>
                                    </div>
                                    <label className="mt-4 px-8 py-3 bg-gold-dust/10 text-gold-dust hover:bg-gold-dust hover:text-vdark rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer">Browse Estate Logs</label>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="bg-gold-dust text-vdark px-10 py-4 font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-starlight transition-all duration-500 flex items-center gap-4 disabled:opacity-50"
                    >
                        {loading ? "Archiving..." : <><Plus size={16} /> Add to Collection</>}
                    </button>
                </div>
            </div>

            {/* Menu List */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                        <tr>
                            <th className="p-4">Img</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Rank</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map(item => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="w-10 h-10 bg-white/10 rounded overflow-hidden">
                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4 text-gray-400">{item.category}</td>
                                <td className="p-4 text-gray-400">{item.rank}</td>
                                <td className="p-4">${item.price}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-white/10 rounded text-red-400"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

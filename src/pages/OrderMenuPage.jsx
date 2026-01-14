import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, CheckCircle, Loader, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function OrderMenuPage() {
    const navigate = useNavigate();
    // Using duplicate data for demo smoothness
    const menuItems = [
        { id: 1, name: "Velvet Espresso", price: 4.50, category: "Coffee", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
        { id: 2, name: "Estate Pour Over", price: 6.00, category: "Coffee", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 3, name: "Maple Smoked Latte", price: 7.50, category: "Seasonal", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
        { id: 4, name: "Ancient Grain Croissant", price: 5.00, category: "Bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
        { id: 5, name: "Heritage Avocado Toast", price: 14.00, category: "Brunch", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=200&q=80" }
    ];

    const categories = [...new Set(menuItems.map(item => item.category))];
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [userData, setUserData] = useState({ name: '', phone: '', address: '' });

    // Validation State
    const [phoneError, setPhoneError] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isCheckingPhone, setIsCheckingPhone] = useState(false);

    // Address State
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);

    // Mock Phone API Check
    const checkPhoneValidity = async (number) => {
        setIsCheckingPhone(true);
        // Simulate API call to Abstract/Numverify
        await new Promise(r => setTimeout(r, 800));

        setIsCheckingPhone(false);
        // Mock logic: Valid if length > 9 and numeric
        if (number.length > 9 && /^\d+$/.test(number.replace(/\D/g, ''))) {
            setIsPhoneValid(true);
            setPhoneError("");
        } else {
            setIsPhoneValid(false);
            setPhoneError("Please enter a valid phone number");
        }
    };

    const handlePhoneChange = (e) => {
        const val = e.target.value;
        setUserData({ ...userData, phone: val });
        setIsPhoneValid(false);
        if (val.length > 5) checkPhoneValidity(val);
    };

    // Mock Address Autocomplete
    const handleAddressChange = async (e) => {
        const val = e.target.value;
        setUserData({ ...userData, address: val });

        if (val.length > 3) {
            // Simulate Google Places API
            const mockSuggestions = [
                `${val} Main St, Downtown`,
                `${val} Park Ave, Uptown`,
                `${val} Sea View Ln, Coastal`
            ];
            setAddressSuggestions(mockSuggestions);
            setShowAddressDropdown(true);
        } else {
            setShowAddressDropdown(false);
        }
    };

    // Live Order Tracking
    const [lastOrderId, setLastOrderId] = useState(() => localStorage.getItem('pendingOrderId'));
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io(); // Connect via proxy

        socket.on("connect", () => {
            console.log("Connected to socket:", socket.id);
            setIsConnected(true);
            // Re-join room if we have a pending order
            if (lastOrderId) {
                console.log("Joining room for order:", lastOrderId);
                socket.emit("join-order-room", lastOrderId);
            }
        });

        socket.on("disconnect", () => setIsConnected(false));

        // The specific 'Luxury' confirmation event requested
        socket.on("order_confirmed_luxury", () => {
            console.log("Luxury Confirmation Received!");
            setShowConfirmation(true);
            // Clear pending order after showing confirmation
            localStorage.removeItem('pendingOrderId');
            setLastOrderId(null);
        });

        return () => socket.disconnect();
    }, [lastOrderId]);

    const openItem = (item) => {
        setSelectedItem(item);
        setQuantity(1);
    };

    const addToCart = () => {
        setCart([...cart, { ...selectedItem, quantity }]);
        setSelectedItem(null);
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: userData,
                    items: cart,
                    total: cartTotal
                })
            });

            if (response.ok) {
                const data = await response.json();
                setLastOrderId(data.id);
                localStorage.setItem('pendingOrderId', data.id);

                alert(`Order Placed! Please wait for confirmation. Order ID: #${data.id}`);
                setCart([]);
                setIsCheckout(false);
                setIsCartOpen(false);
            }
        } catch (error) {
            console.error("Order failed:", error);
            alert("Order failed. Please ensure the backend server is running.");
        }
    };

    return (
        <div className="bg-vdark min-h-screen pt-24 pb-12 relative overflow-x-hidden text-starlight selection:bg-gold-dust selection:text-vdark">
            {/* Grain Overlay */}
            <div className="fixed inset-0 bg-grain pointer-events-none opacity-20 z-0"></div>

            {/* Floating Cart Button */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed top-8 right-8 z-50 bg-gold-dust text-vdark px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.3)] flex items-center gap-4 hover:scale-105 transition-all duration-500 group"
            >
                <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="font-bold font-sans tracking-widest text-sm">${cartTotal.toFixed(2)}</span>
            </button>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <span className="text-gold-dust font-sans text-xs font-bold tracking-[0.5em] uppercase block">Direct Procurement</span>
                    <h1 className="text-5xl md:text-7xl font-serif">Curated Menu</h1>
                </div>

                {categories.map(cat => (
                    <div key={cat} className="mb-24">
                        <div className="flex items-center gap-6 mb-12">
                            <h3 className="text-3xl font-serif italic text-starlight/90">{cat}</h3>
                            <div className="h-px bg-gradient-to-r from-gold-dust/20 to-transparent flex-grow"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {menuItems.filter(i => i.category === cat).map(item => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -8 }}
                                    onClick={() => openItem(item)}
                                    className="cursor-pointer group relative bg-nebula/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-gold-dust/30 transition-all duration-700"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-vdark/80 to-transparent"></div>
                                    </div>
                                    <div className="p-8 flex justify-between items-end">
                                        <div className="space-y-1">
                                            <h4 className="font-serif text-2xl group-hover:text-gold-dust transition-colors">{item.name}</h4>
                                            <p className="text-starlight/30 text-[10px] uppercase tracking-widest font-sans">View Selection</p>
                                        </div>
                                        <span className="text-gold-dust font-bold text-xl font-sans">${item.price.toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Item Popup */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-vdark/90 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-nebula w-full max-w-lg rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10 relative"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-10 bg-vdark/50 p-3 rounded-full hover:bg-gold-dust hover:text-vdark transition-colors border border-white/5 text-starlight"><X size={20} /></button>
                            <div className="h-64 relative">
                                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-nebula via-transparent to-transparent"></div>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="space-y-2">
                                    <span className="text-gold-dust font-sans text-[10px] font-bold tracking-[0.3em] uppercase">{selectedItem.category}</span>
                                    <h3 className="text-4xl font-serif">{selectedItem.name}</h3>
                                    <p className="text-gold-dust font-sans font-bold text-2xl">${selectedItem.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center justify-between py-6 border-y border-white/5">
                                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-starlight/40 font-bold">Quantity Selection</span>
                                    <div className="flex items-center gap-8">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 border border-white/10 rounded-full hover:border-gold-dust hover:text-gold-dust transition-all active:scale-95"><Minus size={16} /></button>
                                        <span className="text-3xl font-serif w-8 text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 border border-white/10 rounded-full hover:border-gold-dust hover:text-gold-dust transition-all active:scale-95"><Plus size={16} /></button>
                                    </div>
                                </div>

                                <button onClick={addToCart} className="w-full py-5 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-starlight transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                    Include into Order &mdash; ${(selectedItem.price * quantity).toFixed(2)}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Cart & Checkout Slide-over */}
            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-[60] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="absolute inset-0 bg-vdark/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-lg bg-nebula shadow-[0_0_80px_rgba(0,0,0,0.9)] h-full flex flex-col border-l border-white/5"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-3xl font-serif italic text-starlight leading-none">Your Card</h2>
                                <button onClick={() => setIsCartOpen(false)} className="opacity-40 hover:opacity-100 hover:rotate-90 transition-all duration-500"><X size={32} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                                        <ShoppingBag size={64} />
                                        <p className="font-serif text-xl italic">The collection is currently empty.</p>
                                    </div>
                                ) : (
                                    cart.map((item, idx) => (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={idx} className="flex gap-6 items-center border-b border-white/5 pb-8 group">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h4 className="font-serif text-xl group-hover:text-gold-dust transition-colors">{item.name}</h4>
                                                <p className="text-[10px] uppercase tracking-widest text-starlight/30">Curation Unit: {item.quantity}</p>
                                            </div>
                                            <span className="font-sans font-bold text-lg text-gold-dust">${(item.price * item.quantity).toFixed(2)}</span>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <div className="p-10 bg-vdark/40 backdrop-blur-3xl border-t border-white/5 space-y-10">
                                <div className="flex justify-between items-center text-3xl font-serif">
                                    <span className="opacity-40 italic">Valuation</span>
                                    <span className="text-gold-dust italic">${cartTotal.toFixed(2)}</span>
                                </div>

                                {isCheckout ? (
                                    <form onSubmit={handleCheckout} className="space-y-6">
                                        <div className="space-y-4">
                                            <input required placeholder="Full Name" className="w-full p-5 bg-white/5 border border-white/10 rounded-xl focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />

                                            {/* Phone with Validation */}
                                            <div className="relative">
                                                <input
                                                    required
                                                    placeholder="Phone Number"
                                                    className={`w-full p-5 bg-white/5 border rounded-xl pr-14 focus:outline-none transition-all font-sans text-sm text-starlight ${phoneError ? 'border-red-900 focus:border-red-500' : 'border-white/10 focus:border-gold-dust'}`}
                                                    value={userData.phone}
                                                    onChange={handlePhoneChange}
                                                />
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                                    {isCheckingPhone ? <Loader className="animate-spin text-gold-dust" size={20} /> :
                                                        isPhoneValid ? <CheckCircle className="text-gold-dust" size={20} /> : null}
                                                </div>
                                                {phoneError && <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest ml-1">{phoneError}</p>}
                                            </div>

                                            {/* Address with Autocomplete */}
                                            <div className="relative">
                                                <input
                                                    required
                                                    placeholder="Delivery Address"
                                                    className="w-full p-5 bg-white/5 border border-white/10 rounded-xl focus:border-gold-dust outline-none transition-all font-sans text-sm text-starlight"
                                                    value={userData.address}
                                                    onChange={handleAddressChange}
                                                    onBlur={() => setTimeout(() => setShowAddressDropdown(false), 200)}
                                                />
                                                {showAddressDropdown && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute z-10 w-full bg-nebula border border-white/10 rounded-xl shadow-2xl mt-2 max-h-56 overflow-auto backdrop-blur-xl"
                                                    >
                                                        {addressSuggestions.map((s, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => {
                                                                    setUserData({ ...userData, address: s });
                                                                    setShowAddressDropdown(false);
                                                                }}
                                                                className="p-5 hover:bg-white/5 cursor-pointer flex items-center gap-4 text-[13px] text-starlight/60 border-b border-white/5 last:border-0 hover:text-gold-dust transition-colors"
                                                            >
                                                                <MapPin size={14} className="text-gold-dust" /> {s}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isPhoneValid}
                                            className="w-full py-5 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-starlight transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
                                        >
                                            {isCheckingPhone ? "Verifying Number..." : "Authorize Procurement"}
                                        </button>
                                        <button type="button" onClick={() => setIsCheckout(false)} className="w-full text-[10px] uppercase tracking-[0.3em] text-starlight/20 hover:text-starlight transition-colors">Return to Selection</button>
                                    </form>
                                ) : (
                                    <button
                                        disabled={cart.length === 0}
                                        onClick={() => setIsCheckout(true)}
                                        className="w-full py-5 bg-starlight text-vdark font-sans font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold-dust transition-all duration-500 disabled:opacity-20 flex items-center justify-center gap-4"
                                    >
                                        Proceed to Authorization
                                        <div className="w-8 h-px bg-vdark/20"></div>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Waiting Indicator - Luxury Version */}
            {lastOrderId && !showConfirmation && (
                <div className="fixed bottom-10 left-10 z-[100] bg-nebula/90 backdrop-blur-xl border border-gold-dust/30 p-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4 animate-float">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gold-dust/20 animate-ping rounded-full"></div>
                            <Loader className="animate-spin text-gold-dust relative z-10" size={24} />
                        </div>
                        <div>
                            <p className="font-serif italic text-lg text-starlight">Awaiting Concierge...</p>
                            <p className="text-[10px] uppercase tracking-widest text-gold-dust opacity-60">ID #{lastOrderId}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest border transition-colors ${isConnected ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                        <div className={`w-1 h-1 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        {isConnected ? 'Resonance Established' : 'Attempting Resonance...'}
                    </div>
                </div>
            )}

            {/* Order Confirmation Modal - Luxury Version */}
            <AnimatePresence>
                {showConfirmation && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-vdark/95 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-nebula p-12 rounded-[40px] shadow-[0_80px_160px_rgba(0,0,0,1)] text-center max-w-lg w-full border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-dust"></div>
                            <div className="w-24 h-24 bg-gold-dust/10 text-gold-dust rounded-full flex items-center justify-center mx-auto mb-10 border border-gold-dust/20">
                                <CheckCircle size={48} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-6 mb-12">
                                <motion.span
                                    initial={{ letterSpacing: '0.2em', opacity: 0 }}
                                    animate={{ letterSpacing: '0.6em', opacity: 1 }}
                                    className="text-gold-dust text-[10px] font-bold uppercase block"
                                >
                                    Procurement Authorized
                                </motion.span>
                                <h2 className="text-5xl font-serif text-starlight leading-tight">Order Received</h2>
                                <p className="text-starlight/40 font-sans text-lg font-light italic">Your selection #{lastOrderId} is now being meticulously prepared at our estate.</p>
                            </div>
                            <button
                                onClick={() => { setShowConfirmation(false); navigate('/'); }}
                                className="w-full py-5 bg-gold-dust text-vdark font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-starlight transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
                            >
                                Return to Estate
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

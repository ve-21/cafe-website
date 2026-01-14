import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Storage Helpers
const loadData = (filename, defaultValue) => {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
        try {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Error loading ${filename}:`, e);
            return defaultValue;
        }
    }
    return defaultValue;
};

const saveData = (filename, data) => {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow multiple just in case
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, '../dist')));

// Data Initialization (Load from "Database")
let menuItems = loadData('menu.json', [
    { id: 1, name: "Velvet Espresso", price: "4.50", category: "Coffee", description: "Double shot, notes of dark chocolate and cherry.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Estate Pour Over", price: "6.00", category: "Coffee", description: "Single origin, hand-poured, floral aroma.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Maple Smoked Latte", price: "7.50", originalPrice: "8.50", category: "Seasonal", description: "Real maple syrup, smoked sea salt, oat milk.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Ancient Grain Croissant", price: "5.00", category: "Bakery", description: "Buttery layers with spelt and quinoa flour.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80" },
    { id: 5, name: "Heritage Avocado Toast", price: "14.00", category: "Brunch", description: "Sourdough, heirloom tomatoes, micro-greens.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=200&q=80" }
]);

let offers = loadData('offers.json', [
    { id: 1, title: "Velvet Cardamom Bun", originalPrice: "$6.50", discountPrice: "$5.00", description: "Warm, spiced brioche.", image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Reserve Geisha", originalPrice: "$12.00", discountPrice: "", description: "Floral notes of jasmine.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Smoked Vanilla Latte", originalPrice: "$7.00", discountPrice: "$5.50", description: "House-smoked vanilla bean.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80" }
]);

let popularItems = loadData('popular.json', [
    { id: 1, name: "Truffle Avocado Toast", price: "$14.00", description: "Sourdough, shaved black truffle, poached egg.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Cold Brew Tonic", price: "$6.00", description: "Ethiopian cold brew with artisan tonic water.", image: "https://images.unsplash.com/photo-1517701604599-bb29b5c7dd90?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Pistachio Rose Cake", price: "$8.50", description: "Persian style cake with rosewater glaze.", image: "https://images.unsplash.com/photo-1568625959952-b892a02e6043?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Lavender Latte", price: "$6.50", description: "House-made lavender syrup, double shot.", image: "https://images.unsplash.com/photo-1550503020-f47285a73e66?auto=format&fit=crop&w=800&q=80" }
]);

let bookings = loadData('bookings.json', []);
let messages = loadData('messages.json', []);
let orders = loadData('orders.json', []);
let adminSettings = loadData('adminSettings.json', {
    name: "Admin Name",
    password: "admin"
});

// API ENDPOINTS

// Admin Settings
app.get('/api/admin/settings', (req, res) => res.json({ name: adminSettings.name }));
app.put('/api/admin/settings', (req, res) => {
    console.log("Settings update attempt:", req.body);
    const { name, password, currentPassword } = req.body;

    // Basic verification
    if (currentPassword !== adminSettings.password) {
        console.warn("Authorization failed: Incorrect current password.");
        return res.status(401).json({ error: "Incorrect current password" });
    }

    if (name) adminSettings.name = name;
    if (password) adminSettings.password = password;

    saveData('adminSettings.json', adminSettings);
    console.log("Settings updated. New Master Name:", adminSettings.name);
    res.json({ success: true, name: adminSettings.name });
});

// Bookings
app.get('/api/bookings', (req, res) => res.json(bookings));
app.post('/api/bookings', (req, res) => {
    const newBooking = { id: Date.now(), timestamp: new Date().toISOString(), ...req.body };
    bookings.push(newBooking);
    saveData('bookings.json', bookings);
    io.emit('new-booking', newBooking);
    res.status(201).json(newBooking);
});
app.delete('/api/bookings/:id', (req, res) => {
    bookings = bookings.filter(b => b.id != req.params.id);
    saveData('bookings.json', bookings);
    res.json({ success: true });
});

// Messages
app.get('/api/messages', (req, res) => res.json(messages));
app.post('/api/messages', (req, res) => {
    const newMessage = { id: Date.now(), timestamp: new Date().toISOString(), ...req.body };
    messages.push(newMessage);
    saveData('messages.json', messages);
    io.emit('new-message', newMessage);
    res.status(201).json(newMessage);
});
app.delete('/api/messages/:id', (req, res) => {
    messages = messages.filter(m => m.id != req.params.id);
    saveData('messages.json', messages);
    res.json({ success: true });
});

// Menu CRUD
app.get('/api/menu', (req, res) => res.json(menuItems));
app.post('/api/menu', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    menuItems.push(newItem);
    saveData('menu.json', menuItems);
    res.status(201).json(newItem);
});
app.put('/api/menu/:id', (req, res) => {
    const { id } = req.params;
    const index = menuItems.findIndex(i => i.id == id);
    if (index > -1) {
        menuItems[index] = { ...menuItems[index], ...req.body };
        saveData('menu.json', menuItems);
        res.json(menuItems[index]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});
app.delete('/api/menu/:id', (req, res) => {
    menuItems = menuItems.filter(i => i.id != req.params.id);
    saveData('menu.json', menuItems);
    res.json({ success: true });
});

// Offers CRUD
app.get('/api/offers', (req, res) => res.json(offers));
app.post('/api/offers', (req, res) => {
    const newOffer = { id: Date.now(), ...req.body };
    offers.push(newOffer);
    saveData('offers.json', offers);
    res.status(201).json(newOffer);
});
app.delete('/api/offers/:id', (req, res) => {
    offers = offers.filter(o => o.id != req.params.id);
    saveData('offers.json', offers);
    res.json({ success: true });
});

// Popular Items CRUD
app.get('/api/popular-items', (req, res) => res.json(popularItems));
app.post('/api/popular-items', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    popularItems.push(newItem);
    saveData('popular.json', popularItems);
    res.status(201).json(newItem);
});
app.delete('/api/popular-items/:id', (req, res) => {
    popularItems = popularItems.filter(i => i.id != req.params.id);
    saveData('popular.json', popularItems);
    res.json({ success: true });
});

// Socket IO setup moved to top
// const http = require('http');
// const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Allow users to join a specific "Order Room"
    socket.on('join-order-room', (orderId) => {
        console.log(`Socket ${socket.id} joining room: order_${orderId}`);
        socket.join(`order_${orderId}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Orders registry initialized at startup from persistence layer

app.get('/api/orders/history', (req, res) => {
    const { date } = req.query; // Format: YYYY-MM-DD

    let filteredOrders = orders.filter(o => o.status === "Delivered");

    if (date) {
        // Filter by date match
        filteredOrders = filteredOrders.filter(o => {
            const orderDate = new Date(o.id).toISOString().split('T')[0];
            return orderDate === date;
        });
    }

    res.json(filteredOrders);
});

app.get('/api/orders/live', (req, res) => {
    // Return orders that are not delivered
    const liveOrders = orders.filter(o => o.status !== "Delivered");
    res.json(liveOrders);
});

app.post('/api/orders', (req, res) => {
    const newOrder = {
        id: Date.now(),
        status: "New",
        timestamp: new Date().toISOString(),
        ...req.body
    };

    orders.push(newOrder);
    saveData('orders.json', orders);

    // Notify Admin (General Feed)
    console.log("Emitting new-order event for order:", newOrder.id);
    io.emit('new-order', newOrder);

    res.status(201).json(newOrder);
});

app.post('/api/orders/:id/accept', (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.id == id);
    if (orderIndex > -1) {
        orders[orderIndex].status = "Accepted";
        saveData('orders.json', orders);

        // TARGETED EMIT: Send "order_confirmed_luxury" ONLY to the room "order_{id}"
        console.log(`Order ${id} accepted. Emitting luxury confirmation to room: order_${id}`);
        io.to(`order_${id}`).emit('order_confirmed_luxury');

        // Update general feed
        io.emit('order-status-updated', { id: parseInt(id), status: "Accepted" });
        res.json({ success: true, id, status: "Accepted" });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

app.put('/api/orders/:id/deliver', (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.id == id);
    if (orderIndex > -1) {
        orders[orderIndex].status = "Delivered";
        saveData('orders.json', orders);

        // Notify admins to remove from live feed
        io.emit('order-status-updated', { id: parseInt(id), status: "Delivered" });

        res.json({ success: true, id, status: "Delivered" });
    } else {
        res.status(404).json({ error: "Order not found" });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Add '0.0.0.0' to allow external connections
server.listen(port, '0.0.0.0', () => {
    console.log(`Backend running on port ${port}`);
});
// app.listen(port); // Deprecated in favor of server.listen

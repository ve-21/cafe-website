import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import FullMenuPage from './pages/FullMenuPage';
import OrderMenuPage from './pages/OrderMenuPage';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import DashboardOverview from './admin/DashboardOverview';
import MenuManager from './admin/MenuManager';
import OrderFeed from './admin/OrderFeed';
import DailySales from './admin/DailySales';
import OfferControl from './admin/OfferControl';
import PopularItemsManager from './admin/PopularItemsManager';
import BookingManager from './admin/BookingManager';
import MessageManager from './admin/MessageManager';
import AdminSettings from './admin/AdminSettings';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return isAdmin ? children : <Navigate to="/admin" replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<PublicHome />} />
                <Route path="/menu" element={<FullMenuPage />} />
                <Route path="/order-menu" element={<OrderMenuPage />} />

                {/* Admin Login */}
                <Route path="/admin" element={<Login />} />

                {/* Protected Dashboard Routes */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<DashboardOverview />} />
                    <Route path="orders" element={<OrderFeed />} />
                    <Route path="bookings" element={<BookingManager />} />
                    <Route path="messages" element={<MessageManager />} />
                    <Route path="menu" element={<MenuManager />} />
                    <Route path="popular" element={<PopularItemsManager />} />
                    <Route path="offers" element={<OfferControl />} />
                    <Route path="sales" element={<DailySales />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

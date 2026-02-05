import { use, useEffect, useState } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { getProfile } from "../../services/profileService";
import { logoutService } from "../../services/authService";
import axios from "axios";
interface Product {
  _id: string;
  product_name: string;
  product_price: number;
}

interface OrderItem {
  _id: string;
  product_id: Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  status: string;
  payment_method: string;
  payment_status: string;
  total_price: number;
  delivery_address: string;
  items: OrderItem[];
  createdAt: string;
}

function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({
    email: "",
    name: "",
    avatar: "",
    updatedAt: "",
    mobileno: "",
  });
  const fetchUserProfile = async () => {
    const response = await getProfile();
    setUser(response.customer);
  };
  const handleLogout = async () => {
    await logoutService();
    window.location.href = "/login";
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

const [orders, setOrders] = useState<Order[]>([]);
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:4000/orders");
    setOrders(response.data.orders || []);
    console.log(response.data.orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

useEffect(() => {
  fetchOrders();
}, []);


  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut, onClick: handleLogout },
  ];

 
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {user.avatar}
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {user.name}
                </h2>
                <p className="text-sm text-slate-500">{user.email}</p>
                <p className="text-sm text-slate-500">{user.mobileno}</p>

                <p className="text-xs text-slate-400 mt-1">
                  Member since {user.updatedAt}
                </p>
              </div>

              {/* Navigation */}
              <nav className="mt-6 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={
                        item.onClick
                          ? item.onClick
                          : () => setActiveTab(item.id)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">
                          Total Orders
                        </p>
                        <p className="text-3xl font-bold text-slate-900">{orders.length}</p>
                      </div>
                      <ShoppingBag className="w-10 h-10 text-blue-500 opacity-20" />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">
                          Total Spent
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          $2,847
                        </p>
                      </div>
                      <CreditCard className="w-10 h-10 text-purple-500 opacity-20" />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-pink-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">
                          Wishlist Items
                        </p>
                        <p className="text-3xl font-bold text-slate-900">45
                        </p>
                      </div>
                      <Heart className="w-10 h-10 text-pink-500 opacity-20" />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-900">
                          Notifications
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-900">
                          Privacy & Security
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  Order History
                </h3>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-gray-500">No orders found</p>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors space-y-2"
                      >
                        <p>
                          <span className="font-semibold">Order ID:</span>{" "}
                          {order._id}
                        </p>
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {order.status}
                        </p>
                        <p>
                          <span className="font-semibold">Payment:</span>{" "}
                          {order.payment_method} ({order.payment_status})
                        </p>
                        <p>
                          <span className="font-semibold">Total:</span> ₹
                          {order.total_price}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {order.delivery_address}
                        </p>

                        <div className="mt-3">
                          <p className="font-semibold mb-1">Items:</p>
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex justify-between text-sm text-gray-600"
                            >
                              {/* <span>{item.product_id.product_name}</span> */}
                              <span>
                                x{item.quantity} | ₹{item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  My Wishlist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {["addresses", "payment", "settings"].includes(activeTab) && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h3>
                <p className="text-slate-500">
                  This section is under development. Stay tuned!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

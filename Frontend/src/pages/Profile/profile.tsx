import { useEffect, useState } from "react";
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
  const orders = [
    {
      id: "#DM-2847",
      date: "Jan 20, 2026",
      status: "Delivered",
      total: "$284.00",
      items: 3,
    },
    {
      id: "#DM-2846",
      date: "Jan 15, 2026",
      status: "In Transit",
      total: "$156.50",
      items: 2,
    },
    {
      id: "#DM-2845",
      date: "Jan 10, 2026",
      status: "Delivered",
      total: "$423.00",
      items: 5,
    },
  ];

  const wishlist = [
    { id: 1, name: "Wireless Headphones", price: "$129.99", image: "🎧" },
    { id: 2, name: "Smart Watch", price: "$299.99", image: "⌚" },
    { id: 3, name: "Laptop Stand", price: "$49.99", image: "💻" },
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut , onClick: handleLogout},
  ];


  const getStatusColor = (status:any) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
                      onClick={item.onClick ? item.onClick : () => setActiveTab(item.id)}
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
                        <p className="text-3xl font-bold text-slate-900">24</p>
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
                        <p className="text-3xl font-bold text-slate-900">
                          {wishlist.length}
                        </p>
                      </div>
                      <Heart className="w-10 h-10 text-pink-500 opacity-20" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {order.id}
                            </p>
                            <p className="text-sm text-slate-500">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">
                            {order.total}
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
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
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                            <Package className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 mb-1">
                              {order.id}
                            </p>
                            <p className="text-sm text-slate-500 mb-2">
                              {order.date} • {order.items} items
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                          <p className="text-xl font-bold text-slate-900">
                            {order.total}
                          </p>
                          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-xl p-5 hover:border-pink-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-4xl">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-lg font-bold text-blue-600 mb-2">
                            {item.price}
                          </p>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                              Add to Cart
                            </button>
                            <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

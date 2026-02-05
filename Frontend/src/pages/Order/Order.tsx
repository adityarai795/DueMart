import { useState } from "react";
import { useCart } from "../../context/cartContext";
import { orderService } from "../../services/orderService";
import "./Order.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Order = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty!");
        return;
      }

      if (!deliveryAddress.trim()) {
        setError("Please enter a delivery address!");
        return;
      }

      setLoading(true);
      setError("");
      setMessage("");

      // Create order on backend
      const orderResponse = await orderService.createOrder(
        deliveryAddress,
        cartItems,
      );

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      setOrderId(orderResponse.orderId);
      // Open Razorpay payment
      openRazorpay(orderResponse.razorpayOrder, orderResponse.orderId);
    } catch (err: any) {
      setError(err.message || "Checkout failed. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = (razorpayOrder: any, orderId: string) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RcmZXeO1j9z5PP",
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "DueMart",
      description: "Order Payment",
      handler: (response: any) => verifyPayment(response, orderId),
      theme: { color: "#0f172a" },
    };

    try {
      new window.Razorpay(options).open();
    } catch (err) {
      setError("Failed to open payment gateway. Please try again.");
      console.error("Razorpay open error:", err);
    }
  };

  const verifyPayment = async (response: any, orderId: string) => {
    try {
      setLoading(true);

      const paymentData = {
        orderId,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };

      const verifyResponse = await orderService.verifyPayment(paymentData);

      if (!verifyResponse.success) {
        throw new Error(
          verifyResponse.message || "Payment verification failed",
        );
      }

      // Clear cart and show success message
      clearCart();
      setMessage(
        `🎉 Order placed successfully! Order ID: ${verifyResponse.order._id}`,
      );
      setDeliveryAddress("");
    } catch (err: any) {
      setError(
        err.message || "Payment verification failed. Please contact support.",
      );
      console.error("Payment verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <h1>🛒 My Cart</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Start shopping!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item: any) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="item-total">
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="delivery-section">
            <h3>Delivery Address</h3>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              rows={4}
            />
          </div>

          <div className="order-footer">
            <h2>Total: ₹{totalPrice.toFixed(2)}</h2>

            <button
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
              className="checkout-btn"
            >
              {loading ? "Processing..." : "💳 Checkout & Pay"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;

import { useState } from "react";
import { useCart } from "../../context/cartContext";
import "./Order.css";

// Razorpay script loader
declare global {
  interface Window {
    Razorpay: any;
  }
}

const SERVER_URL = "http://localhost:5000/orders";
const RAZORPAY_KEY = "rzp_test_RcmZXeO1j9z5PP";
const USER_ID = "69689f92a68cacba087d7e97"; // TODO: Get from auth context

// ==========================================
// ORDER COMPONENT
// ==========================================
const Order = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // STEP 1: CHECKOUT (Create Order)
  // ==========================================
  const handleCheckout = async () => {
    console.log("\n🔄 STEP 1: CHECKOUT - Creating order...");
    setError("");
    setMessage("");

    try {
      setLoading(true);

      // IF: Cart is empty
      if (cartItems.length === 0) {
        setError("Cart is empty. Please add items first.");
        setLoading(false);
        return;
      }

      console.log(`✅ Cart has ${cartItems.length} items`);

      // CALL: Backend to create order
      const response = await fetch(`${SERVER_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: USER_ID,
          delivery_address: "Lucknow, UP, India",
        }),
      });

      const data = await response.json();
      console.log("📨 Backend response:", data);

      // IF: Order creation failed
      if (!data.success || !data.razorpayOrder) {
        setError(data.message || "Failed to create order");
        setLoading(false);
        return;
      }

      console.log(`✅ Order created: ${data.orderId}`);
      console.log(`✅ Razorpay Order ID: ${data.razorpayOrder.id}`);

      // GO TO: STEP 2 - Open Payment
      handlePayment(data.razorpayOrder, data.orderId);
    } catch (err) {
      console.error("❌ Checkout error:", err);
      setError("Error creating order. Please try again.");
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 2: PAYMENT (Open Razorpay)
  // ==========================================
  const handlePayment = async (razorpayOrder: any, orderId: any) => {
    console.log("\n💳 STEP 2: PAYMENT - Opening Razorpay...");

    try {
      // Load Razorpay script if not loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => openRazorpay(razorpayOrder, orderId);
        document.body.appendChild(script);
      } else {
        openRazorpay(razorpayOrder, orderId);
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
      setError("Error opening payment gateway");
      setLoading(false);
    }
  };

  // Open Razorpay checkout
  const openRazorpay = (razorpayOrder: any, orderId: any) => {
    const options = {
      key: RAZORPAY_KEY,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "DueMart",
      description: "Order Payment",
      image: "https://yourlogo.com/logo.png",
      prefill: {
        email: "customer@email.com",
        contact: "9999999999",
        name: "Customer",
      },
      theme: {
        color: "#2563EB",
      },
      handler: (response: any) => {
        console.log("✅ Payment successful from Razorpay");
        console.log("📦 Payment data:", response);
        // GO TO: STEP 3 - Verify Payment
        handleVerifyPayment(response, orderId);
      },
      modal: {
        ondismiss: () => {
          console.log("❌ Payment cancelled by user");
          setError("Payment cancelled");
          setLoading(false);
        },
      },
    };

    console.log("💳 Opening Razorpay with order:", razorpayOrder.id);

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ==========================================
  // STEP 3: VERIFY PAYMENT (Confirm on Backend)
  // ==========================================
  const handleVerifyPayment = async (paymentData: any, _orderId: any) => {
    console.log("\n✔️ STEP 3: VERIFY - Verifying payment on backend...");

    try {
      // CALL: Backend to verify payment
      const response = await fetch(`${SERVER_URL}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log("📨 Backend verification response:", result);

      // IF: Verification failed
      if (!result.success) {
        setError(result.message || "Payment verification failed");
        setLoading(false);
        return;
      }

      console.log("✅ Payment verified successfully");

      // GO TO: STEP 4 - Success
      handleOrderSuccess(result.order);
    } catch (err) {
      console.error("❌ Verification error:", err);
      setError("Error verifying payment. Please contact support.");
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 4: SUCCESS (Order Confirmed)
  // ==========================================
  const handleOrderSuccess = (order: any) => {
    console.log("\n✅ STEP 4: SUCCESS - Order confirmed!");
    console.log("Order details:", order);

    setLoading(false);
    setMessage(
      `🎉 Order placed successfully!\n\nOrder ID: ${order._id}\nStatus: ${order.status}`,
    );

    // Clear cart
    clearCart();

    // Reset message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ==========================================
  // UI: RENDER
  // ==========================================
  return (
    <div className="order-container">
      {/* HEADER */}
      <div className="order-header">
        <h1>🛒 My Cart</h1>
        <p>Review your items before checkout</p>
      </div>

      {/* MESSAGES */}
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* CART ITEMS */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 🛒</p>
          </div>
        ) : (
          cartItems.map((item: any) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="item-quantity">
                <span>Qty: {item.quantity}</span>
              </div>

              <div className="item-total">
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER: TOTAL & CHECKOUT */}
      {cartItems.length > 0 && (
        <div className="order-footer">
          <div className="order-total">
            <h2>Grand Total</h2>
            <h2 className="total-price">₹{totalPrice.toFixed(2)}</h2>
          </div>

          <button
            className={`checkout-btn ${loading ? "loading" : ""}`}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              "💳 Checkout & Pay"
            )}
          </button>

          <p className="payment-info">
            You will be redirected to Razorpay to complete payment
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;

"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: send to Stripe/Braintree
    alert("Payment submitted (simulated).");
  };

  return (
    <main className="payment-container">
      <h1>Payment Information</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Cardholder Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Card Number
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required maxLength={16} />
        </label>

        <label>
          Expiration Date (MM/YY)
          <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} required placeholder="MM/YY" />
        </label>

        <label>
          CVV
          <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required maxLength={4} />
        </label>

        <label>
          ZIP / Postal Code
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
        </label>

        <button type="submit">Submit Payment</button>
      </form>
    </main>
  );
}

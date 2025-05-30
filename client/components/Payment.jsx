"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardholder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    zip: "",
  });

  const [selectedCard, setSelectedCard] = useState('visa');

  const cardOptions = [
  { id: 'visa', src: '/public/visa.png', alt: 'Visa' },
  { id: 'mastercard', src: '/public/mastercard.png', alt: 'MasterCard' },
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted (simulated).");
  };

  return (
    <main className="payment-container">
      <h1 className="title">Secure Checkout</h1>
      <form onSubmit={handleSubmit} className="payment-form-split">

        <div className="card-options" style={{ display: 'flex', gap: '1rem' }}>
            {cardOptions.map((card) => (
          <div
                key={card.id}
                className={`card-option ${selectedCard === card.id ? 'selected' : ''}`}
                onClick={() => setSelectedCard(card.id)}
               >
            <img src={card.src} alt={card.alt} width={60} />
          </div>
          ))}
        </div>

        <div className="form-section">
          <h2>Credit Card Information</h2>

          <div className="row">
  <label className="full">
    Cardholder Name
    <input
      type="text"
      name="cardholder"
      value={formData.cardholder}
      onChange={handleChange}
      required
    />
  </label>
</div>


          <div className="row">
            <label className="half">
              Card Number
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required maxLength={16} />
            </label>

            <label className="quarter">
              CVV
              <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required maxLength={3} />
              <small className="helper-text">3-digit code on back of your card</small>
            </label>
          </div>

          <div className="row">
            <label className="quarter">
              Expiry Month
              <select name="expiryMonth" value={formData.expiryMonth} onChange={handleChange} required>
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </label>

            <label className="quarter">
              Expiry Year
              <select name="expiryYear" value={formData.expiryYear} onChange={handleChange} required>
                <option value="">YY</option>
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={i} value={String(year).slice(2)}>
                      {String(year).slice(2)}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="half">
              ZIP / Postal Code
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required maxLength={5} />
            </label>
          </div>
        </div>

        {/* Shopper Details */}
        <div className="section-divider">
          <h2>Shopper Details</h2>

          <div className="row">
  <label className="full">
    Full Name
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </label>
</div>

<div className="row">
  <label className="full">
    Email Address
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </label>
</div>

        </div>

        <button type="submit" className="select-button">Submit Payment</button>
      </form>
    </main>
  );
}

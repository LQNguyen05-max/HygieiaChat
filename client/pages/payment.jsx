"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { updateSubscriptionStatus } from "@/lib/firebase";
import { auth } from "../lib/firebase";

export default function PaymentPage() {
  const [selectedCard, setSelectedCard] = useState(null); // State to track selected card
  const [modalContent, setModalContent] = useState(null); // State to track modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State to track if terms are accepted
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false); // State to track if privacy policy is accepted
  const [isSubscribed, setIsSubscribed] = useState(false);
<<<<<<< HEAD
  const [modalType, setModalType] = useState("info");
=======

>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
  // Router for navigation
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cardOptions = [
    { id: "visa", src: "/visa.png", alt: "Visa" },
    { id: "mastercard", src: "/mastercard.png", alt: "MasterCard" },
  ];

  const handleCardSelection = (cardID) => {
    setSelectedCard(cardID); // Update the selected card state
  };

<<<<<<< HEAD
const onSubmit = async (data) => {
  if (!selectedCard) {
    openModal("Please select a card type.");
    return;
  }

  if (!isTermsAccepted || !isPrivacyAccepted) {
    openModal("You must agree to the Terms of Service and Privacy Policy to proceed.");
    return;
  }

  // Debug localStorage values
  const jwtCheck = localStorage.getItem("jwtToken");
  const googleIdCheck = localStorage.getItem("googleIdToken");
  console.log("JWT Token:", jwtCheck);
  console.log("Google ID Token:", googleIdCheck);

  const isLoggedIn = jwtCheck || googleIdCheck;
  if (!isLoggedIn || !auth.currentUser) {
    openModal("You must be logged in to make a payment.");
    return;
  }
  try{
    const success = await updateSubscriptionStatus(auth.currentUser.uid, "Pro");
    if (success){
      localStorage.setItem("subscription", "Pro");
      openModal(`Payment processed successfully with ${selectedCard}!`, "success");
      setIsSubscribed(true);
    } else {
      openModal("There is an issue updating your subscription. Please try again.");
=======
  const onSubmit = async (data) => {
    if (!selectedCard) {
      alert("Please select a card type.");
      return;
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
    }
  }
  catch (error) {
    console.error("Subscription update error: ", error);
    openModal("An error occurred while we process your payment.");
  }
};

<<<<<<< HEAD
  const openModal = (content, type = "info") => {
=======
    if (!isTermsAccepted || !isPrivacyAccepted) {
      alert("You must agree to the Terms of Service and Privacy Policy to proceed.");
      return;
    }

    // Debug localStorage values
    const jwtCheck = localStorage.getItem("jwtToken");
    const googleIdCheck = localStorage.getItem("googleIdToken");
    console.log("JWT Token:", jwtCheck);
    console.log("Google ID Token:", googleIdCheck);

    const isLoggedIn = jwtCheck || googleIdCheck;
    if (!isLoggedIn || !auth.currentUser) {
      alert("You must be logged in to make a payment.");
      return;
    }
    try{
      const success = await updateSubscriptionStatus(auth.currentUser.uid, "Pro");
      if (success){
        localStorage.setItem("subscription", "Pro");
        alert(`Payment processed successfully with ${selectedCard}!`);
        setIsSubscribed(true);
        router.push("/");
      } else {
        alert("There is an issue updating your subscription. Please try again.");
      }
    }
    catch (error) {
      console.error("Subscription update error: ", error);
      alert("An error occurred while we process your paymnt.");
    }
  };

  const openModal = (content) => {
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
    setModalContent(content);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleTermsAcceptance = () => {
    if (modalContent === "Terms of Service" && !isTermsAccepted) {
      alert("You must agree to the Terms of Service to proceed.");
      return;
    }
    closeModal();
  };

  const handleCheckboxChange = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  const formatCardNumber = (value) =>
  value
    .replace(/\D/g, "")          
    .slice(0, 16)               
    .match(/.{1,4}/g)         
    ?.join("-") || "";

  return (
<<<<<<< HEAD
    <main className="payment-container bg-payment">
      <h1 className="title">Checkout</h1>
      <div className = "flex gap-8 items-stretch max-w-5xl mx-auto">
    <div className="left-col w-1/2 flex flex-col bg-white shadow rounded-lg p-6">
<h3 className="text-lg font-semibold mb-4 flex-none text-center">Compare Plans</h3>

    <table className="comparison-table w-full flex-1 text-center [&>tbody>tr>td]:py-4">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Free</th>
          <th>Pro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Basic Access</td>
          <td>✅</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Priority Support</td>
          <td>❌</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Early Access to Tools</td>
          <td>❌</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Unlimited Messages</td>
          <td>❌</td>
          <td>✅</td>
        </tr>
        <tr>
          <td>Image/Vision Processing</td>
          <td>❌</td>
          <td>✅</td>
        </tr>
      </tbody>
    </table>
    </div>
<form onSubmit={handleSubmit(onSubmit)} className="right-col w-1/2 payment-form-split flex flex-col">
=======
    <main className="payment-container">
      <h1 className="title">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="payment-form-split">
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
        <div className="card-options" style={{ display: "flex", gap: "1rem" }}>
          {cardOptions.map((card) => (
            <div
              key={card.id}
              className={`card-option ${
                selectedCard === card.id ? "selected" : ""
              }`}
              onClick={() => handleCardSelection(card.id)} // Handle card selection
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
                {...register("cardholder", {
                  required: "Cardholder name is required",
                })}
                className={`input ${errors.cardholder ? "error" : ""}`}
              />
              {errors.cardholder && (
                <p className="error-text">{errors.cardholder.message}</p>
              )}
            </label>
          </div>

          <div className="row">
            <label className="half">
              Card Number
              <input
                type="text"
                {...register("cardNumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                    message:
                      "Card number must follow the format XXXX-XXXX-XXXX-XXXX",
                  },
                })}
<<<<<<< HEAD
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value);
                  return e.target.value;
                }}
=======
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
                className={`input ${errors.cardNumber ? "error" : ""}`}
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
              {errors.cardNumber && (
                <p className="error-text">{errors.cardNumber.message}</p>
              )}
            </label>

            <label className="quarter">
              CVV
              <input
                type="text"
                {...register("cvv", {
                  required: "CVV is required",
                  maxLength: { value: 3, message: "CVV must be 3 digits" },
                })}
                className={`input ${errors.cvv ? "error" : ""}`}
              />
              {errors.cvv && <p className="error-text">{errors.cvv.message}</p>}
              <small className="helper-text">
                3-digit code on back of your card
              </small>
            </label>
          </div>

          <div className="row">
            <label className="quarter">
              Expiry Month
              <select
                {...register("expiryMonth", {
                  required: "Expiry month is required",
                })}
                className={`input ${errors.expiryMonth ? "error" : ""}`}
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
              {errors.expiryMonth && (
                <p className="error-text">{errors.expiryMonth.message}</p>
              )}
            </label>

            <label className="quarter">
              Expiry Year
              <select
                {...register("expiryYear", {
                  required: "Expiry year is required",
                })}
                className={`input ${errors.expiryYear ? "error" : ""}`}
              >
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
              {errors.expiryYear && (
                <p className="error-text">{errors.expiryYear.message}</p>
              )}
            </label>

            <label className="half">
              ZIP / Postal Code
              <input
                type="text"
                {...register("zip", {
                  required: "ZIP code is required",
                  maxLength: { value: 5, message: "ZIP code must be 5 digits" },
                })}
                className={`input ${errors.zip ? "error" : ""}`}
              />
              {errors.zip && <p className="error-text">{errors.zip.message}</p>}
            </label>
          </div>
        </div>

        <button type="submit" className="select-button">
          Submit Payment
        </button>

        <p className="terms">
          By clicking "Submit Payment", you agree to our{" "}
          <button
            type="button"
            className="link"
<<<<<<< HEAD
            onClick={() => openModal("Terms of Service", "terms")}

=======
            onClick={() => openModal("Terms of Service")}
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
          >
            <strong>Terms of Service</strong>
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="link"
<<<<<<< HEAD
            onClick={() => openModal("Privacy Policy", "privacy")}
=======
            onClick={() => openModal("Privacy Policy")}
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
          >
            <strong>Privacy Policy</strong>
          </button>
          .
        </p>
      </form>
<<<<<<< HEAD
      </div>  
{isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      {/* ======= TITLE ======= */}
      {modalType === "info" ? null : <h2>{modalContent}</h2>}

      {/* ======= BODY ======= */}
      {modalType === "terms" && (
        <>
          <p>
            By using this service you agree to pay through HygieiaChat and to the
            following Terms of Service. If you do not agree, please do not proceed.
          </p>
          <label className="block mt-4">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />{" "}
            I agree to the Terms of Service
          </label>
        </>
      )}

      {modalType === "privacy" && (
        <>
          <p>
            This Privacy Policy explains how HygieiaChat collects, uses and protects
            your data when you make a payment. By using this service you consent to
            these practices.
          </p>
          <label className="block mt-4">
            <input
              type="checkbox"
              checked={isPrivacyAccepted}
              onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
            />{" "}
            I agree to the Privacy Policy
          </label>
        </>
      )}

      {modalType === "info" && <p>{modalContent}</p>}

      {/* ======= BUTTON ======= */}
      <button
        className="select-button mt-6"
        onClick={() => {
          if (modalType === "terms" && !isTermsAccepted) {
            openModal("You must accept the Terms of Service to continue.");
            return;
          }
          if (modalType === "privacy" && !isPrivacyAccepted) {
            openModal("You must accept the Privacy Policy to continue.");
            return;
          }

          if (modalType === "success") {
            closeModal();
            router.push("/"); 
            return;
          }

          closeModal();
        }}
      >
          {modalType === "info"    && "OK"}
          {modalType === "terms"   && "Accept"}
          {modalType === "privacy" && "Accept"}
          {modalType === "success" && "OK"}
      </button>
    </div>
  </div>
)}
=======

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalContent}</h2>
            <h1>{new Date().toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}</h1>
            <p>
              {modalContent === "Terms of Service"
                ? "By using this service, you agree to make the payment through HygieiaChat, you agree to the following Terms of Service. If you do not agree to these terms, please do not proceed with the transaction. "
                : "This Privacy Policy addresses, HygieiaChat collects, uses, and protects your personal information when you make a payment. By using this service, you consent to the data practices described in this policy. Do you wish to proceed?"}  
            </p>
            {modalContent === "Terms of Service" && (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  />
                  I agree to the Terms of Service
                </label>
              </div>
            )}
            {modalContent === "Privacy Policy" && (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isPrivacyAccepted}
                    onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                  />
                  I agree to the Privacy Policy
                </label>
              </div>
            )}
            <button
              className="select-button"
              onClick={() => {
                if (modalContent === "Terms of Service" && !isTermsAccepted) {
                  alert("You must agree to the Terms of Service to proceed.");
                  return;
                }
                if (modalContent === "Privacy Policy" && !isPrivacyAccepted) {
                  alert("You must agree to the Privacy Policy to proceed.");
                  return;
                }
                closeModal(); // Close the modal
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
>>>>>>> 5d65a6e34015b69ab7f4d7d9e358895d8312ff65
    </main>
  );
}

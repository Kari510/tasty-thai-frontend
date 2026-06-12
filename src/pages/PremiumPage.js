import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";

function PremiumPage() {

  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="premium-page">

      <div className="premium-banner">
        <h1>Premium Membership</h1>
        <p>
          Extra dietary protection and priority reservation features
        </p>
      </div>

      <div className="premium-container">

        {/* PLAN 1 */}
        <div className="premium-card">

          <h2>🛡 Allergy Protection</h2>

          <p className="price">$4.99/month</p>

          <ul>
            <li>Ingredient alerts</li>
            <li>Allergy warnings</li>
            <li>Dietary recommendations</li>
          </ul>

          <button
            onClick={() => {
              setSelectedPlan("Allergy Protection");
              setShowPopup(true);
            }}
          >
            Select Plan
          </button>

        </div>

        {/* PLAN 2 */}
        <div className="premium-card">

          <h2>⭐ Priority Reservation</h2>

          <p className="price">$6.99/month</p>

          <ul>
            <li>Priority bookings</li>
            <li>Special requests</li>
            <li>Faster reservation process</li>
          </ul>

          <button
            onClick={() => {
              setSelectedPlan("Priority Reservation");
              setShowPopup(true);
            }}
          >
            Select Plan
          </button>

        </div>

        {/* PLAN 3 */}
        <div className="premium-card">

          <h2>👑 Premium Plus</h2>

          <p className="price">$9.99/month</p>

          <ul>
            <li>All Allergy Protection features</li>
            <li>Priority reservations</li>
            <li>Health & dietary support</li>
          </ul>

          <button
            onClick={() => {
              setSelectedPlan("Premium Plus");
              setShowPopup(true);
            }}
          >
            Select Plan
          </button>

        </div>

      </div>

      {/* PAYMENT POPUP */}
      {showPopup && (

        <div className="popup-overlay">

          <div className="popup-card">

            <h2>{selectedPlan}</h2>

            <p>
              This is a payment simulation for demonstration purposes.
            </p>

            <input
              type="text"
              placeholder="Card Holder Name"
            />

            <input
              type="text"
              placeholder="Card Number"
            />

            <input
              type="text"
              placeholder="Expiry Date"
            />

            <button
              className="pay-btn"
              onClick={() => {
                alert(
                  `${selectedPlan} Activated Successfully`
                );

                setShowPopup(false);

                navigate("/");
              }}
            >
              Confirm Payment
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default PremiumPage;
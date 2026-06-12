import React from "react";
import { useNavigate } from "react-router-dom";
import homeBg from "../images/Home_bg.png";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div
        className="hero"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="overlay">

          {/* TITLE */}
          <h1>Authentic Thai Dining Experience</h1>

          {/* TEXT */}
          <p>
            Discover the rich flavours of Thailand with our
            carefully crafted dishes made from the finest ingredients.
          </p>

          {/* BUTTONS */}
          <div className="buttons">
            <button
              className="btn"
              onClick={() => navigate("/reservation")}
            >
              Reserve Now
            </button>

            <button
              className="btn"
              onClick={() => navigate("/menu")}
            >
              Explore Menu
            </button>
          </div>

          {/* FEATURE CARDS */}
          <div className="features">
            <div className="feature-card">
              <span className="icon">📅</span>
              <span>Easy Reservation</span>
            </div>

            <div className="feature-card">
              <span className="icon">🌿</span>
              <span>Dietary Support</span>
            </div>

            <div className="feature-card">
              <span className="icon">💬</span>
              <span>Special Requests</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
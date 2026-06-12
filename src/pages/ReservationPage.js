import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReservationPage.css";
import banner from "../images/reservation-banner.png";

function ReservationPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const [selectedDishes, setSelectedDishes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    dietary: [],
    request: ""
  });

  /* ✅ LOAD SELECTED DISHES */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedDishes")) || [];
    setSelectedDishes(data);

    /* ✅ AUTO-FILL DIETARY */
    const dietarySet = new Set();

    data.forEach(d => {
      if (d.tags) {
        d.tags.split(" ").forEach(tag => dietarySet.add(tag));
      }
    });

    setForm(prev => ({
      ...prev,
      dietary: Array.from(dietarySet)
    }));

  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({ ...form, dietary: [...form.dietary, value] });
    } else {
      setForm({
        ...form,
        dietary: form.dietary.filter((item) => item !== value)
      });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.date ||
    !form.time ||
    !form.guests
  ) {
    alert("Please fill all details");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          dishes: selectedDishes
        })
      }
    );

    const data = await response.json();

    console.log(data);

    setShowConfirmation(true);

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};
  return (
    <div className="reservation-page">

      {/* BANNER */}
      <div
        className="reservation-banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="banner-overlay">
          <h1>Reserve Your Table</h1>
          <p>Book your dining experience with dietary preferences</p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="reservation-container">

        <form className="reservation-form" onSubmit={handleSubmit}>

          <h2>Book Your Table</h2>

          {/* ✅ MULTIPLE DISHES */}
          {selectedDishes.length > 0 && (
            <div className="selected-dish-list">

              {selectedDishes.map((dish, index) => (
                <div className="dish-item" key={index}>

                  <img src={dish.img} alt="" />

                  <div className="dish-info">
                    <h4>{dish.name}</h4>
                    <p>{dish.price}</p>
                  </div>

                  {/* ❌ REMOVE */}
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const updated = selectedDishes.filter((_, i) => i !== index);
                      setSelectedDishes(updated);
                      localStorage.setItem("selectedDishes", JSON.stringify(updated));
                    }}
                  >
                    ✕
                  </button>

                </div>
              ))}

              {/* 🔙 ADD MORE */}
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/menu")}
              >
                Add More Dishes
              </button>

            </div>
          )}

          {/* FORM FIELDS */}

          <div className="form-group">
            <label>Full Name</label>
            <input name="name" placeholder="Enter your full name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" placeholder="Enter phone number" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" name="time" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Guests</label>
            <select name="guests" onChange={handleChange} required>
              <option value="">Number of guests</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dietary Requirements</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="Vegan"
                  checked={form.dietary.includes("Vegan")}
                  onChange={handleCheckbox}
                /> Vegan
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Gluten-Free"
                  checked={form.dietary.includes("Gluten-Free")}
                  onChange={handleCheckbox}
                /> Gluten-Free
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Nut-Allergy"
                  checked={form.dietary.includes("Nut-Allergy")}
                  onChange={handleCheckbox}
                /> Nut-Allergy
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Special Request</label>
            <input name="request" placeholder="Enter your request" onChange={handleChange} />
          </div>

          <button type="button" className="submit-btn" onClick={handleSubmit}>
  Submit Reservation
</button>

        </form>
      </div>
      {showConfirmation && (
  <div className="confirm-overlay">
    <div className="confirm-card">

      <h2>
  Reservation Successful 
  <span style={{ color: "green", marginLeft: "8px" }}>✔</span>
</h2>

      <div className="confirm-details">
        <p><strong>Booking ID:</strong> #{Math.floor(Math.random() * 100000)}</p>
        <p><strong>Date:</strong> {form.date}</p>
        <p><strong>Time:</strong> {form.time}</p>
        <p><strong>Guests:</strong> {form.guests}</p>
        <p><strong>Dietary:</strong> {form.dietary.join(", ") || "None"}</p>
      </div>

      <button
        className="home-btn"
        onClick={() => {
          localStorage.removeItem("selectedDishes");
          setShowConfirmation(false);
          navigate("/");
        }}
      >
        Return Home
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default ReservationPage;
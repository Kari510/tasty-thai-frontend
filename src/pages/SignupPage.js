import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

  e.preventDefault();

  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  const pendingDish =
    localStorage.getItem("pendingDish");

  if (pendingDish) {

    const dish = JSON.parse(pendingDish);

    const existing =
      JSON.parse(
        localStorage.getItem("selectedDishes")
      ) || [];

    existing.push(dish);

    localStorage.setItem(
      "selectedDishes",
      JSON.stringify(existing)
    );

    localStorage.removeItem(
      "pendingDish"
    );

    navigate("/reservation");

  } else {

    navigate("/");

  }

};

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h2>Create Account</h2>

       <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

      </div>
    </div>
  );
}

export default SignupPage;
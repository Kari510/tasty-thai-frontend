import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

     const navigate = useNavigate();
     
  const [form, setForm] = useState({
 
    email: "",
    password: ""
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

    const dish =
      JSON.parse(pendingDish);

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
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

          <p
  className="forgot-link"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
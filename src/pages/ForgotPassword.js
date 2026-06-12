import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPasswordPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!email) {
      alert("Enter your email");
      return;
    }

    setShowSuccess(true);
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your email address and
          we'll send a reset link.
        </p>

        {!showSuccess ? (

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button type="submit">
              Send Reset Link
            </button>

          </form>

        ) : (

          <>
            <h3>✓ Reset Link Sent</h3>

            <p>
              Password reset instructions
              have been sent to:
            </p>

            <strong>{email}</strong>

            <button
              onClick={() =>
                navigate("/login")
              }
            >
              Back to Login
            </button>
          </>

        )}

      </div>

    </div>
  );
}

export default ForgotPasswordPage;
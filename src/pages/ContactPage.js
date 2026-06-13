import React, { useState } from "react";
import "./ContactPage.css";
import banner from "../images/contact-banner.png";

function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    alert("Please fill all fields");
    return;
  }

  try {

  const response = await fetch(
  "https://tasty-thai-backend.onrender.com/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  }
);

     console.log(response.status);

    const data = await response.json();

    console.log(data);

    alert("Message Sent Successfully!");

    setForm({
      name: "",
      email: "",
      message: ""
    });

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

};
  return (
    <div className="contact-page">

      {/* BANNER */}
      <div
        className="contact-banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="banner-text">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-info">
          <h3>Get in Touch</h3>

          <p>📍 Tauranga, New Zealand</p>
          <p>📞 021 111 111</p>
          <p>✉️ thai@gmail.com</p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="contact-form">

          <h3>Contact Form</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
             <input
  name="name"
  value={form.name}
  placeholder="Enter your name"
  onChange={handleChange}
/>
            </div>

            <div className="form-group">
              <label>Email</label>
             <input
  name="email"
  value={form.email}
  placeholder="Enter your email"
  onChange={handleChange}
/>
            </div>

            <div className="form-group">
              <label>Message</label>
             <textarea
  name="message"
  value={form.message}
  placeholder="Write your message"
  onChange={handleChange}
/>
            </div>

            <button type="submit">Send Message</button>

          </form>

        </div>

      </div>

      {/* FOOTER */}
      <div className="contact-footer">
        <h3>TASTY THAI</h3>
        <p>Authentic Cuisine</p>
      </div>

    </div>
  );
}

export default ContactPage;
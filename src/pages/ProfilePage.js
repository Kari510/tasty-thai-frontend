import React, { useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {

  const [user, setUser] = useState({
    name: "Michael Chapman",
    email: "michael@gmail.com",
    phone: "020 0000 000"
  });

  /* EDIT MODE */
  const [editing, setEditing] = useState(false);

  return (
    <div className="profile-page">

      {/* PROFILE CARD */}
      <div className="profile-card">

        {/* AVATAR */}
        <div className="profile-avatar"></div>

        <div className="premium-badge">
  ⭐ Premium Plus Member
        </div>

        {/* USER INFO */}
        <div className="profile-info">

          <div className="form-group">
            <label>Name:</label>

            <input
              type="text"
              value={user.name}
              disabled={!editing}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Email:</label>

            <input
              type="email"
              value={user.email}
              disabled={!editing}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>

            <input
              type="text"
              value={user.phone}
              disabled={!editing}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          </div>

        </div>

        <hr />

        {/* UPCOMING RESERVATION */}
        <div className="reservation-section">
          <h4>Upcoming Reservation</h4>

          <p><strong>Selected Dishes:</strong></p>

<ul className="dish-list">
  <li>Pad Thai</li>
  <li>Spring Rolls</li>
  <li>Thai Milk Tea</li>
</ul>

          <p><strong>Date:</strong> 1 July 2026</p>
          <p><strong>Time:</strong> 7:30 PM</p>
          <p><strong>Guests:</strong> 5</p>
        </div>

        <div className="reservation-section">
  <h4>Reservation History</h4>

  <div className="history-container">

    <div className="history-card">
      <p><strong>#1001</strong></p>
      <p>12 April 2026</p>
      <p>3 Guests</p>
      <p>Completed ✔</p>
    </div>

    <div className="history-card">
      <p><strong>#1002</strong></p>
      <p>28 March 2026</p>
      <p>2 Guests</p>
      <p>Completed ✔</p>
    </div>

  </div>

</div>

<div className="quick-actions">

  <button
    onClick={() => window.location.href="/reservation"}
  >
    Make Reservation
  </button>

  <button
    onClick={() => window.location.href="/premium"}
  >
    Premium Membership
  </button>

</div>
       
       
        {/* EDIT BUTTON */}
    <div className="button-group">

  <button
  className="edit-btn"
  onClick={() => setEditing(!editing)}
>
  {editing ? "Save" : "Edit"}
</button>

 <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("selectedDishes");
    localStorage.removeItem("pendingDish");

    window.location.href = "/";
  }}
>
  Logout
</button>

  {editing && (
    <button className="cancel-btn">
      Cancel
    </button>
  )}

</div>
      </div>

    </div>
  );
}

export default ProfilePage;
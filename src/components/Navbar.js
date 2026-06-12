import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import "./Navbar.css";
function Navbar() {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("selectedDishes");
    localStorage.removeItem("pendingDish");

    setShowMenu(false);

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT LOGO */}
      <div className="logo">
        <h2>TASTY THAI</h2>
        <p>Authentic Cuisine</p>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
          Home
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => isActive ? "active-link" : ""}>
          Menu
        </NavLink>

        <NavLink to="/reservation" className={({ isActive }) => isActive ? "active-link" : ""}>
          Reservation
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>
          Contact
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>
          Profile
        </NavLink>
      </div>

      {/* MENU ICON */}
      <div className="menu-wrapper">
        

        <div
  className="menu-icon"
  onClick={() => setShowMenu(!showMenu)}
>
  <Menu size={24} color="white" />
</div>

      {showMenu && (

  <div className="dropdown-menu">

    <div
      className="close-menu"
      onClick={() => setShowMenu(false)}
    >
      ✕
    </div>
<NavLink
  to="/login"
  onClick={() => setShowMenu(false)}
>
  👤 Login
</NavLink>

<NavLink
  to="/signup"
  onClick={() => setShowMenu(false)}
>
  📝 Sign Up
</NavLink>

<NavLink
  to="/premium"
  onClick={() => setShowMenu(false)}
>
  ⭐ Premium Membership
</NavLink>

{isLoggedIn && (

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    🚪 Logout
  </button>

)}

  </div>

)}

      </div>
    </nav>
  );
}

export default Navbar;
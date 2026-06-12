import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuPage.css";

import banner from "../images/menu-banner.png";

// MAINS
import dish1 from "../images/dish1.png";
import dish2 from "../images/dish2.png";
import dish3 from "../images/dish3.png";

// NOODLES
import noodles1 from "../images/noodles1.png";
import noodles2 from "../images/noodles2.png";
import noodles3 from "../images/noodles3.png";

// ENTREES
import entree1 from "../images/entree1.png";
import entree2 from "../images/entree2.png";
import entree3 from "../images/entree3.png";

// DRINKS
import drink1 from "../images/drink1.png";
import drink2 from "../images/drink2.png";
import drink3 from "../images/drink3.png";

function MenuPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("mains");
  const [selectedDish, setSelectedDish] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const menuData = {
    mains: [
      { img: dish1, name: "Cashew Chicken", price: "$18.50", desc: "Stir fried vegetables and cashews with your choice of protein.", tags: "Gluten-Free Nuts" },
      { img: dish2, name: "Pad Kra Prow", price: "$17.50", desc: "Spicy Thai stir-fried minced meat with basil.", tags: "Gluten-Free Spicy" },
      { img: dish3, name: "Pad Khing", price: "$19.00", desc: "Stir-fried vegetables with sliced ginger.", tags: "Gluten-Free Vegan" }
    ],

    noodles: [
      { img: noodles1, name: "Pad Thai", price: "$17.00", desc: "Classic Thai rice noodles with peanuts.", tags: "Gluten-Free Nuts" },
      { img: noodles2, name: "Pad See Ew", price: "$16.50", desc: "Flat noodles with soy sauce and greens.", tags: "Vegetarian" },
      { img: noodles3, name: "Glass Noodles", price: "$15.50", desc: "Light stir-fried noodles with vegetables.", tags: "Gluten-Free Vegan" }
    ],

    entrees: [
      { img: entree1, name: "Spring Rolls (5 pcs)", price: "$9.00", desc: "Crispy spring rolls with sweet chilli sauce.", tags: "Vegetarian Vegan" },
      { img: entree2, name: "Wontons (5 pcs)", price: "$10.50", desc: "Golden fried wontons with chilli sauce.", tags: "Gluten" },
      { img: entree3, name: "Curry Puffs (5 pcs)", price: "$9.50", desc: "Thai curry puffs with sweet chilli sauce.", tags: "Dairy-Free" }
    ],

    drinks: [
      { img: drink1, name: "Sprite (350ml)", price: "$4.00", desc: "Refreshing lemon-lime soft drink.", tags: "Vegan" },
      { img: drink2, name: "Coca-Cola (350ml)", price: "$4.00", desc: "Classic refreshing cola.", tags: "vegan" },
      { img: drink3, name: "Thai Milk Tea (350ml)", price: "$5.00", desc: "Sweet traditional Thai iced tea.", tags: "Dairy" }
    ]
  };

  return (
    <div className="menu-page">

      {/* BANNER */}
      <div className="menu-banner" style={{ backgroundImage: `url(${banner})` }}></div>

      <div className="menu-container">

       <div className="search-wrapper">
  <div className="search-box">

    <span className="search-icon">🔍</span>

    <input
      type="text"
      placeholder="Search Dishes"
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

    <button
  type="button"
  className="clear-search"
  onClick={() => {
    setSearchTerm("");
  }}
>
  ✕
</button>

  </div>

  {false && (

    <div className="search-suggestions">

      {Object.values(menuData)
        .flat()
        .filter(item =>
          item.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        )
        .map((item, index) => (

          <div
            key={index}
            className="suggestion-item"
            onClick={() => {

  setSearchTerm(item.name);

  if (
    menuData.mains.some(
      dish => dish.name === item.name
    )
  ) {
    setCategory("mains");
  }

  if (
    menuData.noodles.some(
      dish => dish.name === item.name
    )
  ) {
    setCategory("noodles");
  }

  if (
    menuData.entrees.some(
      dish => dish.name === item.name
    )
  ) {
    setCategory("entrees");
  }

  if (
    menuData.drinks.some(
      dish => dish.name === item.name
    )
  ) {
    setCategory("drinks");
  }

}}
          >
            {item.name}
          </div>

        ))}

    </div>

  )}

</div>

        <div className="filters">

  <button
    className="filter"
    onClick={() => setSelectedFilter("All")}
  >
    All
  </button>

  <button
    className="filter"
    onClick={() => setSelectedFilter("Vegetarian")}
  >
    Vegetarian
  </button>

  <button
    className="filter"
    onClick={() => setSelectedFilter("Gluten-Free")}
  >
    Gluten-Free
  </button>

  <button
    className="filter"
    onClick={() => setSelectedFilter("Vegan")}
  >
    Vegan
  </button>

  <button
    className="filter"
    onClick={() => setSelectedFilter("Nuts")}
  >
    Nut Alert
  </button>

  <button
    className="filter"
    onClick={() => setSelectedFilter("Dairy")}
  >
    Dairy-Free
  </button>

</div>

        {/* CATEGORY */}
        <div className="categories">
          <button className={category === "mains" ? "active-cat" : ""} onClick={() => setCategory("mains")}>Mains</button>
          <button className={category === "entrees" ? "active-cat" : ""} onClick={() => setCategory("entrees")}>Entrees</button>
          <button className={category === "noodles" ? "active-cat" : ""} onClick={() => setCategory("noodles")}>Noodles</button>
          <button className={category === "drinks" ? "active-cat" : ""} onClick={() => setCategory("drinks")}>Drinks</button>
        </div>

  <h3>
  Showing: {selectedFilter}
</h3>

        {/* CARDS */}
        <div className="menu-cards">
          {menuData[category]
  .filter(item => {

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All"
        ? true
        : item.tags &&
          item.tags.includes(selectedFilter);

    return (
      matchesSearch &&
      matchesFilter
    );

  })
  .map((item, index) => (
            <div className="card" key={index}>
              <img
                src={item.img}
                alt=""
                className={category === "drinks" ? "drink-img" : ""}
              />

              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p className="desc">{item.desc}</p>
              {item.tags && <p className="tags">{item.tags}</p>}

              <button onClick={() => setSelectedDish(item)}>
                View Details
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* POPUP */}
      {selectedDish && (
        <div className="modal-overlay" onClick={() => setSelectedDish(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <span className="close-btn" onClick={() => setSelectedDish(null)}>✕</span>

            <div className="modal-content">
              <img src={selectedDish.img} alt="" />

              <div>
                <h2>{selectedDish.name}</h2>
                <p className="modal-price">{selectedDish.price}</p>
                <p>{selectedDish.desc}</p>

                <h4>Ingredients</h4>
                <ul>
                  <li>Vegetables</li>
                  <li>Protein</li>
                  <li>Sauce</li>
                </ul>

                <div className="modal-tags">
                  {selectedDish.tags && <span>{selectedDish.tags}</span>}
                </div>

               <button
  className="reserve-btn"
  onClick={() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {

      localStorage.setItem(
        "pendingDish",
        JSON.stringify(selectedDish)
      );

      setShowAuthPopup(true);

      return;
    }

    const existing =
      JSON.parse(
        localStorage.getItem("selectedDishes")
      ) || [];

    const alreadyExists =
      existing.some(
        d => d.name === selectedDish.name
      );

    const updated =
      alreadyExists
        ? existing
        : [...existing, selectedDish];

    localStorage.setItem(
      "selectedDishes",
      JSON.stringify(updated)
    );

    navigate("/reservation");

  }}
>
  Add to Reservation
</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {showAuthPopup && (

        <div className="modal-overlay">

          <div className="modal-card">

            <h2>Login Required</h2>

            <p>
              Please login or create an account
              before making a reservation.
            </p>

            <button
              className="reserve-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="reserve-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

            <button
              className="reserve-btn"
              onClick={() => navigate("/premium")}
            >
              ⭐ Premium Membership
            </button>

            <button
              className="reserve-btn"
              onClick={() => setShowAuthPopup(false)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default MenuPage;

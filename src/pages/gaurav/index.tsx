/* eslint-disable @next/next/no-img-element */
import React from "react";

function Home() {
  return (
    <div className="wrapper">
      {/* Navbar  */}
      <nav className="navbar">
        <div></div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="auth-buttons">
          <label>New to jap?</label>
          <a href="#" className="signup-link">
            Sign up
          </a>
          <a href="#" className="login-btn buttonGradient">
            Login
          </a>
        </div>
      </nav>

      <div className="hero_section">
        {/* Company Logo  */}
        <div className="logo-container">
          <img
            src="/images&Logos/hero_Logo.png"
            alt="Company Logo"
            className="logo"
          />
        </div>

        {/* Search Bar  */}
        <div className="search-bar-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            className="search-bar"
            placeholder="Search jap..."
          />
        </div>
        <button className="search-button buttonGradient">Search</button>
      </div>

      <div className="container">
        <div className="availableOptions">
          <div className="left">
            <h2>Available for iOS and Android</h2>
            <div className="about">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="downloadOptions">
              <img src="/images&Logos/playStore.png" alt="play store" />
              <img src="/images&Logos/appStore.png" alt="app store" />
            </div>
          </div>
          <div className="right">
            <img src="/images&Logos/devices.png" alt="devices" />
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="footer">
          <div className="downloadOptions">
            <img src="/images&Logos/playStore.png" alt="play store" />
            <img src="/images&Logos/appStore.png" alt="app store" />
          </div>
          <div className="links">
            <div className="box">
              <h3>Company</h3>
              <a>lorem ipsum</a>
              <a>Our Team</a>
              <a>Careers</a>
            </div>
            <div className="box">
              <h3>Resources</h3>
              <a>lorem ipsum</a>
              <a>Our Team</a>
              <a>Careers</a>
            </div>
            <div className="box">
              <h3>Legal</h3>
              <a>lorem ipsum</a>
              <a>Our Team</a>
              <a>Careers</a>
            </div>
            <div className="box">
              <h3>Compliance</h3>
              <a>lorem ipsum</a>
              <a>Our Team</a>
              <a>Careers</a>
            </div>
          </div>
          <div className="about">
            <img src="/images&Logos/hero_Logo.png" className="logo" alt="logo" />
            <div className="rightsResevered">
              JAP.app © 2023 All rights reserved.
            </div>
            <div className="divider"></div>
            <div className="social_links">
              <img src="/images&Logos/icons/1.png" alt="" />
              <img src="/images&Logos/icons/2.png" alt="" />
              <img src="/images&Logos/icons/X.png" alt="" />
              <img src="/images&Logos/icons/3.png" alt="" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;

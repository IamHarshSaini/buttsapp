/* eslint-disable @next/next/no-img-element */
import React from "react";

function Search() {
  return (
    <div className="searchWrapper">
      <div className="filters">
        <div className="inputBox">
          <label>Name</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        <div className="inputBox">
          <label>Job Tittle</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        {/* <div className="inputBox">
          <label>Seniority</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div> */}
        <div className="inputBox">
          <label>Department</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        <div className="inputBox">
          <label>Skills</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        <div className="inputBox">
          <label>Years of experience</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        <div className="inputBox">
          <label>Location</label>
          <div className="input">
            <input placeholder="e.g. Electrical Audit" />
          </div>
        </div>
        <button className="search">Search</button>
      </div>
      <div className="cardsWrapper">
        {Array.from({ length: 20 }).map((x,i) => (
          <div className="card" key={`box-${i}`}>
            <img
              src="/images&Logos/icons/avtar.png"
              alt="avtar"
              className="avtar"
            />
            <div className="name">Jatin Luthra</div>
            <div className="postion">CEO, JAP</div>
            <div className="location">
              <img src="/images&Logos/icons/location.png" alt="phone" />6 Km
              away
            </div>
            <div className="action">
              <img src="/images&Logos/icons/phone.png" alt="phone" />
              <img src="/images&Logos/icons/email.png" alt="phone" />
              <img src="/images&Logos/icons/location.png" alt="phone" />
              <img src="/images&Logos/icons/message.png" alt="phone" />
              <img src="/images&Logos/icons/share.png" alt="phone" />
            </div>
          </div>
        ))}
      </div>
      <div className="dontKnow">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Search;

import { useRef, useState } from "react";
import axios from "axios";
import "../Styles/index.css";

let location = "";
let item = "";
let category = "";
let strtTime = "";
let finTime = "";
let requirements = "";

function postDeal() {
  const addDealForm = document.querySelector(".add");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    item: addDealForm.item.value,
    location: addDealForm.location.value,
    category: addDealForm.category.value,
    strtTime: addDealForm.strtTime.value,
    finTime: addDealForm.finTime.value,
    requirements: addDealForm.requirements.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  addDealForm.reset();

  fetch("localhost:3000/api/deals/create", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function AddDeal() {
  const showAddDeal = () => {};

  //Submit take parameters and add postman function

  return (
    <div class="container">
      <h1>POST</h1>

      <form class="add" id="add">
        <div class="row">
          <div class="col-25">
            <label for="item">ITEM NAME:</label>
          </div>
          <div class="col-75">
            <input type="text" name="item" placeholder="Item" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="location">LOCATION:</label>{" "}
          </div>
          <div class="col-75">
            <input
              type="text"
              name="location"
              placeholder="Location"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="Category">Category:</label>
          </div>
          <div class="col-75">
            <select id="category" name="category" placeholder="...">
              <option value="food">Food</option>
              <option value="experience">Experience</option>
              <option value="materials">Materials</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="strtTime">Time Start:</label>
          </div>
          <div class="col-75">
            <input type="time" id="strtTime" name="strtTime" required></input>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="finTime">Time Finish:</label>
          </div>
          <div class="col-75">
            <input type="time" id="finTime" name="finTime" required></input>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="reqs">Requirements:</label>
          </div>
          <div class="col-75">
            <input type="text" name="reqs" placeholder="optional" />
          </div>
        </div>
        <div class="row">
          <br />
          <div class="col-25"></div>
          <div class="col-75">
            <button onclick="postDeal()">Add Freebee</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDeal;

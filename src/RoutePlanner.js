import React, { useState } from "react";
import Map from "./Map";
import { compact } from "lodash";
const axios = require("axios");
const { getLatLngFromAddress } = require("./utils/addressFunctions");

function getLatLngfromString(value) {
  const [lat, lng] = value.split(",");
  return {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };
}

async function getRoutes(startPoint, locations = [], capacity = []) {
  try {
    const key = "wNEuM4xU8Dqqxgs2mpDdrXN4gcfhBBd5";
    const result = await axios.post("https://api.dispatchgrid.com/api/", {
      start_point: startPoint,
      loop: true,
      points: locations,
      capacity: capacity,
      api_key: key
    });

    return result && result.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function RoutePlanner() {
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState([]);
  const [points, setPoints] = useState([]);
  const [startingPoint, setStartingPoints] = useState("");

  function processPoints(value) {
    setResult([]);
    const values = value.split("\n");
    setPoints(values);
  }

  async function submit() {
    try {
      if (points.length) {
        setLoading(true);
        const startingPointsLatLng = await getLatLngFromAddress(startingPoint);
        const tempPoints = await Promise.all(
          compact(points).map(async (item) =>
            item !== startingPoint ? await getLatLngFromAddress(item) : false
          )
        );
        const result = await getRoutes(
          startingPointsLatLng,
          compact(tempPoints),
          [compact(tempPoints).length]
        );
        const resultData = Object.keys(result).map((number) => {
          return result[number].map((item) => getLatLngfromString(item));
        });
        setLoading(false);
        setResult(resultData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="container">
      <br />
      <label>Pickup Point Address:</label>
      <br />
      <input
        style={{ width: 400 }}
        placeholder="starting point"
        onChange={(e) => {
          setResult([]);
          setStartingPoints(e.target.value);
        }}
        value={startingPoint}
      />
      <br />
      <br />
      <label>Other Way Points Address (each on new line):</label>
      <br />
      <textarea
        rows={10}
        cols={50}
        value={points.join("\n").toString()}
        onChange={(e) => processPoints(e.target.value)}
      >
        Enter Lat,long in each line
      </textarea>
      <br />
      <button onClick={submit}>Submit</button>

      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div className="loader"></div>
        </div>
      )}
      <br />
      <br />
      <Map markers={results} />
    </div>
  );
}

export default RoutePlanner;

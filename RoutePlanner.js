import React, { useState, useEffect } from "react";

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
  const [points, setPoints] = useState([]);

  function processPoints(value) {
    const values = value.split("\n");
    setPoints(values);
  }

  useEffect(() => {
    getRoutes(
      "37.8148031,-122.2986597",
      [
        "37.8148031,-122.2986597",
        "37.409754,-122.089342",
        "37.8581113,-122.2477965"
      ],
      []
    ).then(data => console.log(data));
  }, []);

  return (
    <div>
      <textarea
        value={points.join("\n").toString()}
        onChange={e => processPoints(e.target.value)}
      >
        Enter Lat,long in each line
      </textarea>
    </div>
  );
}

export default RoutePlanner;

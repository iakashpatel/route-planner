import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { flatten } from "lodash";

function getRandomColor() {
  var color =
    Math.floor(Math.random() * 222 + 33).toString(16) +
    Math.floor(Math.random() * 222 + 33).toString(16) +
    Math.floor(Math.random() * 222 + 33).toString(16);
  return color;
}

function MapContainer(props) {
  var bounds = new props.google.maps.LatLngBounds();

  flatten(props.markers).map((x) => {
    bounds.extend(new props.google.maps.LatLng(x.lat, x.lng));
    return false;
  });

  return (
    <Map
      google={props.google}
      containerStyle={{ height: 500, width: "80%" }}
      bounds={bounds}
    >
      {flatten(
        props.markers.map((item) => {
          const color = getRandomColor();
          return item.map((item1, index) => (
            <Marker
              key={Math.random() * 1000000}
              position={{ lat: item1.lat, lng: item1.lng }}
              name={"Current location"}
              icon={{
                url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${
                  index + 1
                }|${color}|000000`
              }}
            />
          ));
        })
      )}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);

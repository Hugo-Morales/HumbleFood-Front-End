import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import api_key from "./credentials";

const containerStyle = {
  width: "1000px",
  height: "1000px",
};

const center = {
  lat: -34.603661,
  lng: -58.381495,
};

function MyComponent() {
  console.log(api_key);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key.mapsKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

//defaultCenter={{ lat: -34.603661, lng: -58.381495 }}

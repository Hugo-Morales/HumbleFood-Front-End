import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import api_key from "./credentials";
import { useDispatch } from "react-redux";
import { getShopDirection } from "../../../redux/actions";

// //-34.603661, -58.381495
// const Map = (props) => {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: -34.603661, lng: -58.381495 }}
//     />
//   );
// };

const containerStyle = {
  width: "600px",
  height: "600px",
};

function MyComponent() {
  const dispatch = useDispatch();

  const [center, setCenter] = useState({
    lat: -34.603661,
    lng: -58.381495,
  });

  let lat, lng;

  const handleFetchAddress = async () => {
    lat = center.lat;
    lng = center.lng;
    dispatch(getShopDirection(lat, lng));
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key.mapsKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(e) => {
        setCenter({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        icon={
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
        position={center}
        draggable={false}
        onPositionChanged={() => {
          handleFetchAddress();
        }}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

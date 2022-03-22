import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import api_key from "./credentials";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getShopDirection } from "../../../redux/actions";

const containerStyle = {
  width: "1000px",
  height: "1000px",
};

const center = {
  lat: -34.603661,
  lng: -58.381495,
};

function MyComponent() {
  const dispatch = useDispatch();

  let lat, lng;
  const handleFetchAddress = async (e) => {
    lat = e.latLng.lat();
    lng = e.latLng.lng();
    dispatch(getShopDirection(lat, lng));
    // const address = await axios.get(
    //   `http://api.positionstack.com/v1/reverse?access_key=87508c31ff90beec780b7f4866b1b54b&query=${e.latLng.lat()},${e.latLng.lng()}`
    // );
    // console.log(address.data.data[1].label);
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
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        icon={
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
        position={center}
        draggable={true}
        onDragEnd={(e) => {
          // console.log(e.latLng.lat());
          // console.log(e.latLng.lng());
          handleFetchAddress(e);
        }}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

//defaultCenter={{ lat: -34.603661, lng: -58.381495 }}

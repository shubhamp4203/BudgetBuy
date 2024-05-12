import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import styles from "./geofencing.module.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2xhd3giLCJhIjoiY2x2eGVrbWJ5MDA4ODJwcW1sMjgwMXczayJ9.9oScypRscFnCzhA2lSQiTA";

const Geofencing = () => {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.76966683377913);
  const [lat, setLat] = useState(21.20114966340776);
  const [advlat, setadvlat] = useState(null);
  const [advlng, setadvlng] = useState(null);
  const [advradius, setadvradius] = useState(null);
  const [zoom, setZoom] = useState(14);
  const location = useLocation();
  const products = location.state.products;
  useEffect(() => {
    const rendermap = () => {
      const radius = 0.5;
      if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      const addCircle = (e) => {
        if (map.current.getLayer("circle")) {
          map.current.removeLayer("circle");
          map.current.removeSource("circle");
        }

        const circle = turf.circle([e.lngLat.lng, e.lngLat.lat], radius, {
          steps: 100,
          units: "kilometers",
        });

        map.current.addSource("circle", {
          type: "geojson",
          data: circle,
        });

        map.current.addLayer({
          id: "circle",
          type: "fill",
          source: "circle",
          paint: {
            "fill-color": "#007cbf",
            "fill-opacity": 0.5,
          },
        });
        setadvlng(e.lngLat.lng);
        setadvlat(e.lngLat.lat);
        setadvradius(radius);
      };
      map.current.on("click", addCircle);
      let markers = [];

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      geocoder.on("result", function (e) {
        for (let marker of markers) {
          marker.remove();
        }

        markers = [];

        const marker = new mapboxgl.Marker()
          .setLngLat(e.result.geometry.coordinates)
          .addTo(map.current);

        markers.push(marker);
      });

      map.current.addControl(geocoder, "top-left");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: false,
        showUserHeading: false,
      });

      map.current.addControl(geolocate, "top-right");
    };
    rendermap();
  });
  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!advlat || !advlng || !advradius) {
      toast.error(
        "Please select the location on map where you want to sell your product"
      );
      return;
    }
    const regiondata = {
      latitude: advlat,
      longitude: advlng,
      radius: advradius,
    };

    const data = {
      products,
      regiondata,
    };

    const resp = await fetch(process.env.REACT_APP_URL_SELLER + "/advertise", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await resp.json();
    console.log(res);
  };
  return (
    <div>
      <Toaster richColors position="top-center" />
      <div
        style={{ position: "relative" }}
        ref={mapContainer}
        className={styles.mapcontainer}
      >
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            zIndex: 1,
            width: "100%",
          }}
          className={styles.butdiv}
        >
          <button
            type="submit"
            className={styles.confirmbutton}
            onClick={handleConfirm}
          >
            {" "}
            Confirm{" "}
          </button>
          <button
            type="submit"
            className={styles.confirmbutton}
            onClick={handleBack}
          >
            {" "}
            Back{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Geofencing;

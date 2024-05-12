import React, { createContext, useState, useEffect, Children } from "react";

export const LocationContext = createContext();
export const LocationProvider = ({ children }) => {
  const [userLng, setUserLng] = useState("");
  const [userLat, setUserLat] = useState("");
  const [serverIsRunning, setServerIsRunning] = useState(true);

  const sendLocation = async () => {
    try {
      const auth = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/authenticate",
        {
          credentials: "include",
        }
      );
      if (auth.ok) {
        const data = await auth.json();
        const userid = data.user_id;
        if (userLng && userLat) {
          const reqdata = {
            userid,
            lng: userLng,
            lat: userLat,
          };
          const loc = await fetch(
            process.env.REACT_APP_URL_GEOFENCING + "/userLocation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqdata),
            }
          );
        }
      }
    } catch (err) {
      setServerIsRunning(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLng(position.coords.longitude.toFixed(6));
      setUserLat(position.coords.latitude.toFixed(6));
    });
  }, []);

  useEffect(() => {
    if (!serverIsRunning) {
      return;
    }
    sendLocation();
  })

  useEffect(() => {
    if (!serverIsRunning) {
      return;
    }
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLng(position.coords.longitude.toFixed(6));
        setUserLat(position.coords.latitude.toFixed(6));
        sendLocation();
      });
    }, 300000);

    return () => clearInterval(intervalId);
  }, [userLng, userLat, serverIsRunning]);

  return (
    <LocationContext.Provider value={{ userLng, userLat }}>
      {children}
    </LocationContext.Provider>
  );
};

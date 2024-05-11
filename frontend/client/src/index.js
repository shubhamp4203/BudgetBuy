import React from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";

// const PUBLISHABLE_KEY =
//   "pk_test_dG91Y2hlZC1zY29ycGlvbi03OS5jbGVyay5hY2NvdW50cy5kZXYk";

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
document.title = "React.js Client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <App />
    {/* </ClerkProvider> */}
  </React.StrictMode>
);

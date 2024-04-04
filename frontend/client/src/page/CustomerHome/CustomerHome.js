import React, { useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import products from "../../data/products";
import Feedlist from "../../component/CustomerHomePage/Feedlist";
import { useNavigate } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function CustomerHome() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  async function handlelogout() {
    console.log("thai che");
    try {
      const response = await fetch(
        "https://e1e4-202-129-240-131.ngrok-free.app/logout",
        {
          method: "POST",
          credentials: "include", // "same-origin", "include", "omit"
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log(responseData.message);
      if (response.status == 200) {
        console.log("logged out");
        navigate("/signin");
      } else {
        console.log("Logout failed");
      }
      // const responseData = await response.json();
      // console.log("Success:", responseData);
      // if (response.ok) {
      //   navigate("/signin");
      // } else {
      //   alert("Email not found");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div>
        <div>
          <button onClick={handlelogout}>log out</button>
        </div>
        {/* <SignedIn>
          <UserButton afterSignout={() => navigate("/signin")} />
        </SignedIn> */}
        <SearchBar onSearch={handleSearch} />
      </div>
      <Feedlist products={filteredProducts} />
    </>
  );
}
export default CustomerHome;

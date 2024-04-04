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

  return (
    <>
      <div>
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

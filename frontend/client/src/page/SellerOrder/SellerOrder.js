import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import SellerOrder from "../../component/SellerOrder/SellerOrderList";

function YourProduct() {
  const [products, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_PRODUCT + "/getAll");
      const data = await resp.json();
      // console.log(data.result);
      setData(data.result);
    };
    fetchdata();
  }, []);

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <SellerOrder products={products} searchTerm={searchTerm} />
      <Navbar />
    </>
  );
}
export default YourProduct;

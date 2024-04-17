import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import YourProductList from "../../component/YourProduct/YourProductList";

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
      <YourProductList products={products} searchTerm={searchTerm} />
      <Navbar />
    </>
  );
}
export default YourProduct;

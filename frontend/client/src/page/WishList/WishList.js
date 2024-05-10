import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import WishListStack from "../../component/WishList/WishList-List";

function WishList() {
  const [products, setData] = useState([]);
  //   const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_PRODUCT + "/getAll");
      const data = await resp.json();
      setData(data.result);
    };
    fetchdata();
  }, []);

  return (
    <>
      {/* <SearchBar onSearch={setSearchTerm} /> */}
      <WishListStack products={products} />
      <Navbar />
    </>
  );
}
export default WishList;

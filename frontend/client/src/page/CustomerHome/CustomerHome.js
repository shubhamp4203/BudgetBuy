import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import Feedlist from "../../component/CustomerHomePage/Feedlist";

function CustomerHome() {
  const [products, setData] = useState([]);
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
      <SearchBar />
      <Feedlist products={products} />
      <Navbar />
    </>
  );
}
export default CustomerHome;

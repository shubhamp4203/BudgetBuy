import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import SellerNavBar from "../../component/Seller Navbar/NavBar";
import YourProductList from "../../component/YourProduct/YourProductList";

function YourProduct() {
  const [products, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(
        process.env.REACT_APP_URL_SELLER + "/getSellerProduct",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await resp.json();
      // console.log(data.result);
      setData(data.result);
    };
    fetchdata();
  }, []);

  const handleRemove = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setData(updatedProducts);
  };

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      {products.length > 0 ? (
        <YourProductList
          products={products}
          searchTerm={searchTerm}
          onRemove={handleRemove}
        />
      ) : (
        <h1>No Products Found</h1>
      )}
      <SellerNavBar />
    </>
  );
}
export default YourProduct;

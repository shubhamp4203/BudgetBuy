import React, { useEffect, useState } from "react";
import SearchBar from "../../component/sellersearch/searchBar";
import SellerNavBar from "../../component/Seller Navbar/NavBar";
import YourProductList from "../../component/YourProduct/YourProductList";
const { useNavigate } = require("react-router-dom");

function YourProduct() {
  const [products, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(
        process.env.REACT_APP_URL_SELLER + "/getSellerProduct",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (resp.status === 401) {
        navigate("/sellersignin");
      } else {
        const data = await resp.json();
        setData(data.result);
      }
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

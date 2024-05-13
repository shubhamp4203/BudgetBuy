import React, { useEffect, useState } from "react";
import Styles from "./AdvertiseProduct.module.css";
import AdvertiseCard from "../../component/AdvertiseCard/AdvertiseCard";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function AdvertiseProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleSelect = (product) => {
    if (selectedProducts.find((p) => p._id === product._id)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
      toast.error("Product Removed");
    } else {
      setSelectedProducts([...selectedProducts, product]);
      toast.success("Product Selected");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        process.env.REACT_APP_URL_SELLER + "/getSellerProduct",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.result);
      } else {
        toast.error("Something went wrong")
      }
    };
    fetchProducts();
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    navigate("/map", {state: {products: selectedProducts}})
  }
  return (
    <div className={Styles.container}>
      <Toaster richColors position="top-center" />
      <div className={Styles.header}>
        <h1>Advertise Products</h1>
        <marquee className={Styles.marquee}>
          From here you can choose product that you want to Advertise or make
          notification to user for better reach...
        </marquee>
      </div>
      <div className={Styles.list}>
        {products.map((product) => (
          <AdvertiseCard
            key={product._id}
            product={product}
            selected={selectedProducts.find((p) => p._id === product._id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className={Styles.done}>
        <button onClick={handleContinue}>Continue</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AdvertiseProduct;

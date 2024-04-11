import React, { useEffect, useState } from "react";
import Styles from "./AdvertiseProduct.module.css";
import AdvertiseCard from "../../component/AdvertiseCard/AdvertiseCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdvertiseProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("");
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setProducts(data);
      } else {
        toast("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1>Product List</h1>
        <marquee className={Styles.marquee}>
          From here you can choose product that you want to Advertise or make
          notification to user for better reach...
        </marquee>
      </div>
      <div className={Styles.list}>
        {products.map((product) => (
          <AdvertiseCard key={product._id} product={product} />
        ))}
      </div>
      <div className={Styles.done}>
        <button>done</button>
      </div>
    </div>
  );
}

export default AdvertiseProduct;

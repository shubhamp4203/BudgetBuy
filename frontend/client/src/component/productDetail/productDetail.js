// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./productDetail.module.css";
import FeedCard from "../suggestcard/FeedCard";
import { useNavigate } from "react-router-dom";
// import products from "../../data/products";
import { toast, Toaster } from "sonner";
const ProductDetail = () => {
  const { productId } = useParams();
  const product_list = [productId];
  const [item, setproduct] = useState({});
  const [seller, setseller] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getproduct = async () => {
      const resp = await fetch(
        process.env.REACT_APP_URL_PRODUCT + "/getproduct/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: product_list,
            type: "productDetail",
          }),
        }
      );
      const data = await resp.json();
      console.log(data);
      const sellerinf = data.finalResult.sellerinfo.seller;
      const product = data.finalResult.result;
      setproduct(product);
      setseller(sellerinf);
    };
    getproduct();
  }, []);

  const handlechat = async (e) => {
    e.preventDefault();
    const data = {
      seller_id: seller._id,
      seller_name: seller.name,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/chat",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const respData = await resp.json();
      console.log("resp:", respData);
      if (resp.ok) {
        navigate("/chat", {
          state: {
            groupId: respData.chatGroup._id,
            userId: respData.userId,
            groupData: respData.chatGroup,
          },
        });
      } else {
        console.log("signin");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const handlebuynow = async (e) => {
    e.preventDefault();
    const data = {
      product_id: item._id,
      seller_id: item.newProduct.seller_id,
      amount: 1,
      product_price: item.newProduct.price,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/addCart",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (resp.status == 201) {
        navigate("/payment");
      } else if (resp.status == 401) {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      {item.newProduct ? (
        <div className={style.container}>
          <div className={style.header}>
            <h1>{item.newProduct.name}</h1>
          </div>

          <div className={style.productDetails}>
            <div className={style.imginfo}>
              <img
                src={
                  "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
                  item._id
                }
                alt={item.newProduct.name}
              />
            </div>
            <div className={style.proinfo}>
              <div className={style.protag}>Name:</div>
              <div className={style.provalue}>{item.newProduct.name}</div>
              <div className={style.protag}>Price: </div>
              <div className={style.provalue}>{item.newProduct.price}</div>
              <div className={style.protag}>Stock:</div>
              <div className={style.provalue}> {item.newProduct.stock}</div>
            </div>
            <div className={style.description}>
              <div className={style.protag}>Product Categories</div>
              <div className={style.desvalue}>{item.newProduct.tags}</div>
            </div>
            <div className={style.description}>
              <div className={style.protag}>Description:</div>
              <div className={style.desvalue}>
                {item.newProduct.description}
              </div>
            </div>
            <div className={style.description}>
              <div className={style.protag}>specification:</div>
              <div className={style.desvalue}>
                {item.newProduct.specification}
              </div>
            </div>

            <div className={style.proinfo}>
              <div className={style.protag}>Seller Name:</div>
              <div className={style.provalue}>{seller.name}</div>
              <button onClick={handlechat}>Chat with Seller</button>
            </div>
            {item.sellerData.filter((product) => product._id !== item._id)
              .length > 0 && (
              <div className={style.description}>
                <div className={style.protag}> Product from Seller</div>
                <div className={style.sellerData}>
                  {item.sellerData
                    .filter((product) => product._id !== item._id)
                    .map((product) => (
                      <FeedCard product={product} key={product._id} />
                    ))}
                </div>
              </div>
            )}

            {item.tagData.filter((product) => product._id !== item._id).length >
              0 && (
              <div className={style.description}>
                <div className={style.protag}>Similar Product</div>
                <div className={style.sellerData}>
                  {item.tagData
                    .filter((product) => product._id !== item._id)
                    .map((product) => (
                      <FeedCard product={product} key={product._id} />
                    ))}
                </div>
              </div>
            )}
            <div className={style.privacyPolicy}>
              By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
              <a href="#">Terms of Service</a>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handlebuynow}>Buy Now</button>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default ProductDetail;

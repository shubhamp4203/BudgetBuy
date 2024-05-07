import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import styles from "./AddProduct.module.css";
import Select from "react-select";
import SellerNavbar from "../../component/Seller Navbar/NavBar";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [stock, setStock] = useState("");
  const [skuId, setSkuId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [dimension, setDimension] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const options = [
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Eletronics', label: 'Electronics' },
    { value: 'Home Appliances', label: 'Home Appliances' },
    { value: 'Gaming Mouse', label: 'Gaming Mouse' },
    // Add more options as needed
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#221f1f",
      borderWidth: "2px",
      boxShadow: "none",
    }),
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };
  const handleSubmit = async () => {
    if(!stock || !skuId || !name || !price || !description || !selectedTags || !image){
      toast.error("Please fill all the required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("stock", stock);
    formData.append("skuId", skuId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("dimension", dimension);
    formData.append("image", image);
    formData.append('tags', selectedTags.value);
    try { 
      const response = await fetch(
        process.env.REACT_APP_URL_SELLER + "/addproduct",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (response.status === 201) {
        toast.success("Product is added successfully");
        setTimeout(() => {
          navigate("/yourproducts");
        }, 1800);
      }   
      else if(response.status === 401) {
        toast.error("SKU ID is already in use");
      }else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.signupcontainer}>
      <Toaster richColors position="top-center"/>
      <h1>Add Product</h1>
      <div className={styles.signupform}>
        <label htmlFor="name">Name*</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="skuId">SKU ID*</label>
        <input
          className={styles.input}
          type="text"
          id="skuId"
          value={skuId}
          onChange={(e) => setSkuId(e.target.value)}
        />

        <label htmlFor="stock">Stock*</label>
        <input
          className={styles.input}
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <label htmlFor="price">Price*</label>
        <input
          className={styles.input}
          type="number"
          id="price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="description">Description*</label>
        <textarea
          className={styles.input}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="color">Color</label>
        <input
          className={styles.input}
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label htmlFor="dimension">Dimension</label>
        <input
          className={styles.input}
          type="text"
          id="dimension"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
        />

        <label htmlFor="Select Tags">Product Category*</label>
        <Select
          options={options}
          value={selectedTags}
          styles={customStyles}
          onChange={handleTagChange}
          required
        />

        <label htmlFor="image">Product Image*</label>
        <input
          className={`${styles.input}`}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button className={styles.signupbutton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <SellerNavbar/>
    </div>
  );
}

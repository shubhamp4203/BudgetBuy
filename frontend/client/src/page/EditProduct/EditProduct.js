import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./EditProduct.module.css";
import Select from "react-select";

export default function EditProduct() {
  const [stock, setStock] = useState("");
  const [skuId, setSkuId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [likes, setLikes] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [dimension, setDimension] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);

  const options = [
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "tag3", label: "Tag 3" },
    // Add more predefined tags as needed
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
    const formData = new FormData();
    formData.append("stock", stock);
    formData.append("skuId", skuId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("likes", likes);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("dimension", dimension);
    formData.append("image", image);
    selectedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_URL_PRODUCT + "/addproduct",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status === 201) {
        toast("Product is added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast("Product is not added  ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      <h1>Edit Product</h1>
      <div className={styles.signupform}>
        <label htmlFor="stock">Stock</label>
        <input
          className={styles.input}
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <label htmlFor="skuId">SKU ID</label>
        <input
          className={styles.input}
          type="text"
          id="skuId"
          value={skuId}
          onChange={(e) => setSkuId(e.target.value)}
        />

        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          className={styles.input}
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="likes">Likes</label>
        <input
          className={styles.input}
          type="number"
          id="likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          className={styles.input}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <label htmlFor="Select Tags">Select Tags</label>
        <Select
          isMulti
          options={options}
          value={selectedTags}
          styles={customStyles}
          onChange={handleTagChange}
        />
        <label htmlFor="image">Image</label>
        <input
          className={`${styles.input} ${styles.inputFileHidden}  ${styles.customFileUpload}`}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button className={styles.signupbutton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

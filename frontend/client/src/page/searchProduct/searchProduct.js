// SearchProduct.js
import React, { useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import ProductList from "../../component/productList/productList";
import products from "../../data/products";

function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default SearchProduct;

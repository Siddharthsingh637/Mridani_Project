import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Filter from "./Filter";
import FilterMob from "./FilterMob";
import Products from "./Products";
import Footer from "../Footer";
import {
  getProductsByCategory,
  getProductsByCollection,
} from "../../Service/API/api";

const ProductList = () => {
  const { categoryName, collectionName } = useParams();
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [title, setTitle] = useState("PRODUCTS");

  // Capitalize and prettify slug
  const formatTitle = (slug) => {
    return slug
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = [];

        if (categoryName) {
          data = await getProductsByCategory(categoryName);
        } else if (collectionName) {
          data = await getProductsByCollection(collectionName);
        }

        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    // Get last segment of path to determine title
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const formatted = formatTitle(lastSegment);
    setTitle(formatted.toUpperCase());

    fetchProducts();
  }, [categoryName, collectionName, location.pathname]);

  const handleFilter = (filters) => {
    let filtered = [...allProducts];

    filters.forEach(([key, value]) => {
      if (key === "availability") {
        filtered = filtered.filter((p) =>
          value === "In Stock" ? p.in_stock === true : p.in_stock === false
        );
      }

      if (key === "price" && Array.isArray(value)) {
        filtered = filtered.filter(
          (p) => p.price >= value[0] && p.price <= value[1]
        );
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "Price, low to high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price, high to low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetically, A-Z":
        sorted.sort((a, b) => a.product_title.localeCompare(b.product_title));
        break;
      case "Alphabetically, Z-A":
        sorted.sort((a, b) => b.product_title.localeCompare(a.product_title));
        break;
      case "Date, new to old":
        sorted.reverse();
        break;
      case "Date, old to new":
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="">
      <div className="hidden md:block">
        <Filter onFilter={handleFilter} onSort={handleSort} title={title} />
      </div>
      <div className="block md:hidden">
        <FilterMob onFilter={handleFilter} onSort={handleSort} title={title} />
      </div>
      <Products products={filteredProducts} />
      <Footer />
    </div>
  );
};

export default ProductList;

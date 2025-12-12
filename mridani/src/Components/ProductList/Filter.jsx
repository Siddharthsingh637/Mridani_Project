import React, { useState } from "react";
import { Range } from "react-range";
import { motion, AnimatePresence } from "framer-motion";

const Filter = ({ onFilter, onSort, title }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  const [sortOption, setSortOption] = useState("Featured");
  const [priceRange, setPriceRange] = useState([1000, 20000]);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  const handleFilterClick = (key, value) => {
    const updated = [...selectedFilters];
    const exists = updated.findIndex(
      ([k, v]) => k === key && JSON.stringify(v) === JSON.stringify(value)
    );
    if (exists >= 0) {
      updated.splice(exists, 1);
    } else {
      updated.push([key, value]);
    }
    setSelectedFilters(updated);
    onFilter(updated);
    setDropdown(null);
  };

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  const handlePriceApply = () => {
    handleFilterClick("price", priceRange);
    setDropdown(null);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setDropdown(null);
    if (onSort) onSort(value);
  };

  return (
    <div className="w-full bg-white p-4 md:px-20 flex flex-col md:flex-row flex-wrap md:items-center md:justify-between relative z-10 gap-4">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("price")}
            className="px-4 py-2 text-md rounded hover:bg-gray-100"
          >
            Price ▾
          </button>
          <AnimatePresence>
            {dropdown === "price" && (
              <motion.div
                className="absolute mt-2 w-72 bg-white rounded shadow p-4 z-30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Range
                  step={100}
                  min={0}
                  max={50000}
                  values={priceRange}
                  onChange={handlePriceChange}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#e2e8f0",
                        margin: "20px 0",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        border: "2px solid #000",
                      }}
                    />
                  )}
                />
                <div className="flex justify-between mt-4 gap-2">
                  <div className="flex items-center gap-1">
                    ₹
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                      className="w-24 px-2 py-1 rounded border"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    ₹
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                      className="w-24 px-2 py-1 rounded border"
                    />
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={handlePriceApply}
                    className="px-4 py-1 bg-black text-white text-sm rounded"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Availability Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("availability")}
            className="px-4 py-2 text-md rounded hover:bg-gray-100"
          >
            Availability ▾
          </button>
          <AnimatePresence>
            {dropdown === "availability" && (
              <motion.div
                className="absolute mt-2 w-48 bg-white rounded shadow z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {["In Stock", "Out of Stock"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterClick("availability", status)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center Title */}
      <div className="text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-xl font-bold text-gray-800 uppercase">
      {title || "Products"}
      </div>

      {/* Sort Section */}
      <div className="relative ml-auto md:ml-0">
        <button
          onClick={() => toggleDropdown("sort")}
          className="px-4 py-2 text-md rounded hover:bg-gray-100"
        >
          Sort By ▾
        </button>
        <AnimatePresence>
          {dropdown === "sort" && (
            <motion.div
              className="absolute right-0 mt-2 w-56 bg-white rounded shadow z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {[
                "Featured",
                "Best selling",
                "Alphabetically, A-Z",
                "Alphabetically, Z-A",
                "Price, low to high",
                "Price, high to low",
                "Date, old to new",
                "Date, new to old",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSortChange(option)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Filter;

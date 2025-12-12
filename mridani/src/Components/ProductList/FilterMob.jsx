import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Range } from "react-range";

const FilterMob = ({ onFilter, onSort }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: false,
    availability: false,
    sort: false,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterClick = (key, value) => {
    const updated = [...selectedFilters];
    const exists = updated.findIndex(([k, v]) => k === key && v === value);
    if (exists >= 0) {
      updated.splice(exists, 1);
    } else {
      updated.push([key, value]);
    }
    setSelectedFilters(updated);
    onFilter && onFilter(updated);
  };

  const handleSortChange = (value) => {
    onSort && onSort(value);
  };

  const [priceRange, setPriceRange] = useState([0, 50000]);


  return (
    <div className="w-full p-4 bg-white shadow-sm relative z-10 flex justify-between items-center">
      <h2 className="font-bold text-lg">Product category</h2>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-red-400 text-white px-6 py-2 rounded-3xl font-bold"
        >
          FILTER
        </button>

        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border z-50 overflow-hidden">
            {/* Price Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection("price")}
                className="w-full px-4 py-3 text-left font-semibold text-sm flex justify-between items-center"
              >
                Price
                <span>{openSections.price ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {openSections.price && (
                  <motion.div
                    className="px-6 py-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Range
                      step={100}
                      min={0}
                      max={50000}
                      values={priceRange}
                      onChange={setPriceRange}
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
                        onClick={() => {
                          handleFilterClick("price", priceRange);
                          toggleSection("price");
                        }}
                        className="px-4 py-1 bg-black text-white text-sm rounded"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            {/* Availability Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection("availability")}
                className="w-full px-4 py-3 text-left font-semibold text-sm flex justify-between items-center"
              >
                Availability
                <span>{openSections.availability ? "−" : "+"}</span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.availability ? "max-h-40" : "max-h-0"
                  }`}
              >
                {["In Stock", "Out of Stock"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterClick("availability", status)}
                    className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By Section */}
            <div>
              <button
                onClick={() => toggleSection("sort")}
                className="w-full px-4 py-3 text-left font-semibold text-sm flex justify-between items-center"
              >
                Sort By
                <span>{openSections.sort ? "−" : "+"}</span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.sort ? "max-h-64" : "max-h-0"
                  }`}
              >
                {[
                  "Featured",
                  "Best selling",
                  "Price, low to high",
                  "Price, high to low",
                  "Alphabetically, A-Z",
                  "Alphabetically, Z-A",
                  "Date, old to new",
                  "Date, new to old",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSortChange(option)}
                    className="block w-full text-left px-6 py-2 text-sm hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterMob;

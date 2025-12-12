import React from "react";

const Header = ({ sort, setSort }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6 px-2">
      <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>

      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="sort" className="text-gray-600 font-medium">
          Sort By:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-400"
        >
          <option value="all">All</option>
          <option value="delivered">Delivered</option>
          <option value="notDelivered">Not Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

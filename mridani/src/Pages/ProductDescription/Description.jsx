import React from "react";

const Description = ({ description, features }) => {
  return (
    <div className="w-full py-12 bg-white">
      <div className="border-gray-200 py-10 max-w-5xl mx-auto">
        {/* Title */}
        <h4 className="text-xl font-bold text-gray-900 mb-4">
          Product Description
        </h4>

        {/* Horizontal line */}
        <hr className="border-t-2 border-gray-300 mb-6" />

        {/* Description content */}
        <div className="text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-line mb-10">
          {description}
        </div>

        {/* Features Table */}
        {features && (
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Product Highlights
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(features).map(([key, value]) => (
                    <tr key={key} className="text-center">
                      <th className="w-1/3 py-3 px-4 bg-gray-50 text-gray-700 font-semibold capitalize border-r border-gray-300 align-middle">
                        {key.replace(/_/g, " ")}
                      </th>
                      <td className="w-2/3 py-3 px-4 text-gray-800 align-middle">
                        {Array.isArray(value) ? (
                          <ul className="list-disc list-inside space-y-1">
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;

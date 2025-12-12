import React from "react";

const DescriptionMob = ({ description, features }) => {
  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Product Description
        </h4>

        {/* Horizontal line */}
        <hr className="border-t-2 border-gray-300 mb-6" />

        {/* Description content */}
        <div className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-line mb-10">
          {description}
        </div>

        {/* Features Table */}
        {features && (
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Product Highlights
            </h4>

            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-full text-sm sm:text-base">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(features).map(([key, value]) => (
                    <tr key={key} className="text-left sm:text-center">
                      <th className="w-1/3 py-3 px-4 bg-gray-50 text-gray-700 font-medium capitalize border-r border-gray-300 align-top">
                        {key.replace(/_/g, " ")}
                      </th>
                      <td className="w-2/3 py-3 px-4 text-gray-800">
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

export default DescriptionMob;

import React from "react";
import Comment from "./Comment";
import FAQSection from "./FAQSection";
export default function ProductTabs({ product, activeTab, setActiveTab }) {
  const tabs = ["Product Details", "Rating & Reviews", "FAQs"];

  return (
    <div className="mt-16">
      <div className=" flex justify-center border-b border-gray-200  gap-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 font-semibold text-lg  w-100 ${
              activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === "Product Details" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Product Details</h3>
            {product.features && (
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "Rating & Reviews" && (
          <div className="px-10">
            <Comment productId={product._id} />
          </div>
        )}

        {activeTab === "FAQs" && (
         <FAQsection />
        )}
      </div>
    </div>
  );
}

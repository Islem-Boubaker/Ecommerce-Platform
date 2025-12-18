import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../Hooks/useProduct";

import ProductImages from "../features/products/components/ProductImages";
import ProductInfo from "../features/products/components/ProductInfo";
import ProductTabs from "../features/products/components/ProductTabs";
import ProductLoader from "../features/products/components/ProductLoader";
import ProductCart from "../features/products/components/ProductCard";
import { getproductbygat } from "../services/Productservices";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Product Details");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      if (!product?.category) return;
      const items = await getproductbygat(product.category);
      setProducts(items);
    };
    fetchProducts();
  }, [product?.category]);

  if (loading) return <ProductLoader text="Loading product..." />;
  if (error)
    return (
      <ProductLoader
        error
        text={error}
        onRetry={() => navigate(-1)}
      />
    );
  if (!product)
    return (
      <ProductLoader
        text="Product not found"
        onRetry={() => navigate(-1)}
      />
    );

  return (
    <> <div className="min-h-screen ">
      {/* Back button */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>
      </div>

      {/* Product content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImages
        
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <ProductTabs product={product} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
      <div className="max-w-screen mx-auto px-6 py-8">
        <h2 className="text-5xl font-bold text-gray-900 uppercase">you might also like</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Array.isArray(products) ? products : []).map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>






      </div>
    </>
   
  );
}

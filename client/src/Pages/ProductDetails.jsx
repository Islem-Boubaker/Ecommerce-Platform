
import { useParams } from "react-router-dom";
import { useProduct } from "../Hooks/useProduct";

function ProductDetails() {
  const { id } = useParams(); // ← récupère l'id depuis l'URL
  const product = useProduct(id);

 

  if (!product) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={`${import.meta.env.VITE_API_URL}/${product.images?.[0]?.replace(/\\/g, "/")}`}
        alt={product.name}
        className="w-full h-80 object-cover"
      />
      <p className="mt-4">{product.description}</p>
      <div className="text-xl font-semibold mt-2">${product.price}</div>
    </div>
  );
}

export default ProductDetails;

import { useEffect, useState } from "react";
import { getProductById } from "../services/Productservices";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetch();
  }, [id]);

  return product;
};

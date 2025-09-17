import Product from "../models/Product.model.js";
export const addProduct = async (req, res) => {
  try {
   
    const filePaths = req.files.map(file => file.path);

   
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: filePaths,
    };

    // TODO: Save productData to DB
    Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product: productData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteproduct=(id)=>{
    Product.findByIdAndDelete(id)
    .then((product)=>{
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product deleted successfully",product})
    })
}
export const updateproduct=(id,productData)=>{
    Product.findByIdAndUpdate(id,productData)
    .then((product)=>{
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product updated successfully",product})
    })
}
export const getproductById=async (id) => {
  try {
  
    const products = await Product.findById(id);

  
    return products;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while getting products" });
  }
}

export const getallproducts=async (req, res) => {
      try {
        // Fetch all products
        const products = await Product.find();
    
        // Send as JSON response
        res.status(200).json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while getting products" });
      }
    }

export const getproductsByCategory=(category)=>{
    Product.find({category:category})
    .then((products)=>{
        if(!products){
            return res.status(404).json({message:"Products not found"})
        }
        res.status(200).json({message:"Products found successfully",products})
    })
}
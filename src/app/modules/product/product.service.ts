import Product from "./product.model";

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const createProduct = async (product: any) => {
  return await Product.create(product);
};

export const productsService = {
  getAllProducts,
  getProductById,
  createProduct,
};

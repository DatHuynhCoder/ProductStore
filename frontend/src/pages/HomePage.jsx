import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductionStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductionStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    console.log(message);
  };

  const handleUpdateProduct = async (pid, updatedData) => {
    const { success, message } = await updateProduct(pid, updatedData);
    console.log(message);
  };

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col items-center">
      <h1 className="text-center text-5xl font-bold text-[#fff] py-10">
        Current Products 🚀
      </h1>

      {products.length === 0 ? (
        <h2 className="text-2xl font-bold text-gray-500">
          No products found 🤧
          <Link to={"/create"}>
            <span className="underline underline-offset-6 text-blue-500">
              Create a product
            </span>
          </Link>
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(product._id, updatedProduct);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-2xl font-bold">{product.name}</h3>
      <p className="text-green-500 font-bold text-xl my-2">{product.price} $</p>
      <div className="flex justify-center gap-2">
        <div
          className="rounded-lg bg-blue-300 p-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <FaEdit size={24} />
        </div>
        <div
          className="rounded-lg bg-red-500 p-2 hover:cursor-pointer"
          onClick={() => onDelete(product._id)}
        >
          <RiDeleteBin2Fill size={24} />
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
              placeholder="Product Price"
            />
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
              placeholder="Image URL"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

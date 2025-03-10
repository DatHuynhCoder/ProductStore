import React, { useState } from 'react'
import { useProductionStore } from '../store/product';

const CreatePage = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const {createProduct} = useProductionStore();
  const handleAddProduct = async () => {
    const {success,message} = await createProduct(product);
    console.log("Success:", success);
    console.log("Message:", message);
  }

  return (
    <div className='bg-blue-950 min-h-screen flex flex-col items-center'>
      <h1 className='text-center text-5xl font-bold text-white py-10'>Create New Product</h1>

      <div className='w-full max-w-md bg-gray-300 rounded-2xl p-5 flex flex-col gap-3 shadow-lg'>
        <input
          type="text"
          value={product.name}
          placeholder='Product Name'
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className='p-3 rounded-md border-2 border-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-300 focus:bg-white transition-all duration-300'
        />

        <input
          type="text"
          value={product.price}
          placeholder='Price'
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className='p-3 rounded-md border-2 border-gray-400 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-300 focus:bg-white transition-all duration-300'
        />

        <input
          type="text"
          value={product.image}
          placeholder='Image URL'
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          className='p-3 rounded-md border-2 border-gray-400 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-300 focus:bg-white transition-all duration-300'
        />

        <input
          type="submit"
          value="Add Product"
          className='p-3 rounded-md bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 transition'
          onClick={handleAddProduct}
        />
      </div>
    </div>
  )
}

export default CreatePage

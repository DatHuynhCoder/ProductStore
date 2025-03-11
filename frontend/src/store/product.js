import { create } from "zustand";

const API_URL = "https://productstore-i787.onrender.com"

export const useProductionStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),
  createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.price || !newProduct.image){
      return {success: false, message: "Please fill in all field"}
    }
    const res = await fetch(`${API_URL}/api/products`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newProduct)
    })
    const data = await res.json();
    console.log(data);
    set((state) => ({products: [...state.products, data.data]}))
    return {success: true, message: "Product create successfully"}
  },
  fetchProducts: async () => {
    const res = await fetch(`${API_URL}/api/products`)
    const data = await res.json();
    set({products: data.data});
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`${API_URL}/api/products/${pid}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(!data.success) return {success: false, message: data.message};

    set(state => ({products: state.products.filter( product => product._id !== pid)}));
    return {success: true, message: data.message};
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`${API_URL}/api/products/${pid}`,{
      method: 'PUT',
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(updatedProduct)
    });
    const data = await res.json();
    if(!data.success) return {success: false, message: data.message};

    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product))
    }))
  }
}))
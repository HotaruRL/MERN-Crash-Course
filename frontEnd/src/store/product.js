import { useState } from 'react';
import {create} from 'zustand';

// global state to use everywhere
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),

    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}));
        return {success: true, message: "Product created successfully"}
    },

    fetchProducts: async () => {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        set({products: data.data});
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // to update the UI immediately no need to refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));

        return {success: true, message: data.message};
    },

    deleteProduct: async (pid) =>{
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // to update the UI immediately no need to refresh
        set(state => ({products: state.products.filter((product) => product._id !== pid)}));

        return {success: true, message: data.message};
    }
}));

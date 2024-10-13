import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminProducts = () => {
  const [productData, setProductData] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
  });
  const [editProductId, setEditProductId] = useState(null); // For updating products

  // Fetch all products (GET)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await response.json();
        setProductData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  // Create a new product (POST)
  const createProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      const data = await response.json();
      setProductData([...productData, data]); // Add the new product to the list
      setNewProduct({ title: "", description: "" }); // Clear the form
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  // Delete a product (DELETE)
  const deleteProduct = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      setProductData(productData.filter((product) => product._id !== id)); // Remove the deleted product
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  // Update a product (PUT)
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${editProductId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      const updatedProduct = await response.json();
      setProductData(
        productData.map((product) =>
          product._id === editProductId ? updatedProduct : product
        )
      );
      setEditProductId(null); // Exit edit mode
      setNewProduct({ title: "", description: "" }); // Clear the form
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Enter edit mode
  const handleEdit = (product) => {
    setEditProductId(product._id);
    setNewProduct({
      title: product.title,
      description: product.description,
    });
  };

  // Loading spinner
  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Authbtn />
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

        {/* Create/Edit Product Form */}
        <div className="mb-6">
          <h2 className="text-xl mb-4">
            {editProductId ? "Edit Product" : "Add New Product"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editProductId ? updateProduct() : createProduct();
            }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {editProductId ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>

        {/* Display Existing Products */}
        <div>
          <h2 className="text-xl mb-4">Existing Products</h2>
          <div className="space-y-4">
            {productData.map((product) => (
              <div key={product._id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p>{product.description}</p>
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;

import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const STORAGE_KEY = 'stirde_products';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    const apiProducts = response.data;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiProducts));
    return apiProducts;
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error.message);
    const localData = localStorage.getItem(STORAGE_KEY);
    try {
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage corrupt, using fallback');
    }
    const fallback = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await apiClient.post('/products', product);
    const newProduct = response.data;
    const products = await getProducts();
    return newProduct;
  } catch (error) {
    console.error('Add failed:', error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await apiClient.put(`/products/${id}`, updatedProduct);
    await getProducts();
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await apiClient.delete(`/products/${id}`);
    await getProducts();
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};

export { API_BASE };


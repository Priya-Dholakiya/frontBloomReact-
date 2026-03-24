import axios from 'axios';

const API_BASE = 'http://localhost:3001';
const STORAGE_KEY = 'stirde_products';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/api/products');
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
    const response = await apiClient.post('/api/products', product);
    const newProduct = response.data;
    await getProducts(); // Sync localStorage
    return newProduct;
  } catch (error) {
    console.error('Add failed:', error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await apiClient.put(`/api/products/${id}`, updatedProduct);
    await getProducts(); // Sync localStorage
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await apiClient.delete(`/api/products/${id}`);
    await getProducts(); // Sync localStorage
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const products = await getProducts();
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return categories.map(cat => ({ 
      title: cat, 
      products: products.filter(p => p.category === cat).length,
      image: products.find(p => p.category === cat)?.image || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519'
    }));
  } catch {
    return [];
  }
};

export { API_BASE };

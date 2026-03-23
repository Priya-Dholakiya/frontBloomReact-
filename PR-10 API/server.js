const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

app.use(cors());
app.use(express.json());

const readProducts = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeProducts = async (products) => {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
};

// GET /api/products
app.get('/api/products', async (req, res) => {
  const products = await readProducts();
  res.json(products);
});

// POST /api/products - auto generate ID
app.post('/api/products', async (req, res) => {
  const products = await readProducts();
  const newProduct = { 
    id: Date.now().toString(), // auto generate ID
    ...req.body 
  };
  products.push(newProduct);
  await writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
app.put('/api/products/:id', async (req, res) => {
  const products = await readProducts();
  const id = req.params.id;
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    await writeProducts(products);
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
  const products = await readProducts();
  const id = req.params.id;
  const filtered = products.filter(p => p.id !== id);
  await writeProducts(filtered);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API Server running at http://localhost:${PORT}`);
}  );

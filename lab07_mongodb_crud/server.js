const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/supermarket')
  .then(() => console.log('Connected to MongoDB Database: supermarket'))
  .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => console.log('Mongoose connected event fired.'));
mongoose.connection.on('error', (err) => console.log('Mongoose connection error event fired:', err));

// Mongoose Schema & Model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

// ==== REST API ENDPOINTS ==== //

// 1. POST /add-product
app.post('/add-product', async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        const newProduct = new Product({ name, category, price, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET /products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. PUT /update-product/:id
app.put('/update-product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Product updated!', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE /delete-product/:id
app.delete('/delete-product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. POST /order - decrement stock validation
app.post('/order', async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const product = await Product.findById(id);
        
        if (!product) return res.status(404).json({ error: 'Product not found' });
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock to place order.' });
        }
        
        product.stock -= quantity;
        await product.save();
        res.status(200).json({ message: 'Order placed successfully!', remainingStock: product.stock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. GET /analytics - Aggregation Pipeline
app.get('/analytics', async (req, res) => {
    try {
        const analytics = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalStock: { $sum: "$stock" },
                    avgPrice: { $avg: "$price" },
                    maxPrice: { $max: "$price" }
                }
            }
        ]);
        
        const lowStock = await Product.find({ stock: { $lt: 10 } });
        
        res.status(200).json({ categoryAnalytics: analytics, lowStockAlerts: lowStock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. GET /measure-query-time - Explains query execution stats
app.get('/measure-query-time', async (req, res) => {
    try {
        const queryExecution = await Product.find({ category: 'Electronics' }).explain('executionStats');
        res.status(200).json({ 
            message: "Query execution measurement successful.",
            executionTimeMillis: queryExecution.executionStats.executionTimeMillis,
            totalDocsExamined: queryExecution.executionStats.totalDocsExamined,
            indexUsed: queryExecution.queryPlanner.winningPlan.inputStage.indexName || "None (COLLSCAN)"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

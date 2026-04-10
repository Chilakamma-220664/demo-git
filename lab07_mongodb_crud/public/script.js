const API_URL = 'http://localhost:3002';

// Load Products on Startup
document.addEventListener('DOMContentLoaded', fetchProducts);

// Fetch Products from API
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        const tbody = document.getElementById('products-body');
        tbody.innerHTML = '';

        products.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.name}</td>
                <td><span style="background:#e2e8f0;padding:2px 8px;border-radius:10px;font-size:12px;">${p.category}</span></td>
                <td>$${p.price}</td>
                <td><strong>${p.stock}</strong> units</td>
                <td>
                    <button class="btn success" onclick="placeOrder('${p._id}')">Order 1</button>
                    <button class="btn danger" onclick="deleteProduct('${p._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

// Add New Product
document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value)
    };

    try {
        const res = await fetch(`${API_URL}/add-product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        
        if (res.ok) {
            document.getElementById('add-form').reset();
            fetchProducts();
        } else {
            alert("Error adding product");
        }
    } catch (err) {
        console.error(err);
    }
});

// Delete Product
async function deleteProduct(id) {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
        await fetch(`${API_URL}/delete-product/${id}`, { method: 'DELETE' });
        fetchProducts();
    } catch (err) {
        console.error(err);
    }
}

// Order Product (Decrement Stock)
async function placeOrder(id) {
    try {
        const res = await fetch(`${API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, quantity: 1 })
        });
        
        const data = await res.json();
        if (res.ok) {
            fetchProducts(); // Refresh UI
        } else {
            alert(data.error); // Show insufficient stock error
        }
    } catch (err) {
        console.error(err);
    }
}

// Get Analytics
document.getElementById('btn-analytics').addEventListener('click', async () => {
    try {
        const res = await fetch(`${API_URL}/analytics`);
        const data = await res.json();
        document.getElementById('analytics-output').innerText = JSON.stringify(data, null, 2);
    } catch (err) {
        console.error(err);
    }
});

// Get Query Execution Time
document.getElementById('btn-query').addEventListener('click', async () => {
    try {
        const res = await fetch(`${API_URL}/measure-query-time`);
        const data = await res.json();
        document.getElementById('analytics-output').innerText = JSON.stringify(data, null, 2);
    } catch (err) {
        console.error(err);
    }
});

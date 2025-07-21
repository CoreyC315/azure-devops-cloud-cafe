const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// ⚡️ IMPORTANT: This line must be BEFORE your API routes (e.g., /menu, /order)
// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// --- Endpoints for Cloud Café ---

// 1. /menu endpoint
// Returns a list of available coffee items
app.get('/menu', (req, res) => {
    const menu = [
        { id: 1, name: 'Espresso', price: 2.50 },
        { id: 2, name: 'Latte', price: 4.00 },
        { id: 3, name: 'Cappuccino', price: 3.75 },
        { id: 4, name: 'Americano', price: 3.00 },
        { id: 5, name: 'Mocha', price: 4.50 }
    ];
    console.log('GET /menu requested');
    res.status(200).json(menu);
});

// 2. /order endpoint
// Accepts a POST request to simulate placing an order
app.post('/order', (req, res) => {
    const { coffeeId, quantity } = req.body;

    if (!coffeeId || !quantity) {
        return res.status(400).json({ message: 'Missing coffeeId or quantity.' });
    }

    // In a real app, you'd save this to a database,
    // validate coffeeId, calculate total, etc.
    const orderId = Math.floor(Math.random() * 1000000); // Simulate an order ID
    console.log(`POST /order received: Coffee ID ${coffeeId}, Quantity ${quantity}. Assigning Order ID: ${orderId}`);

    res.status(201).json({
        message: 'Order placed successfully!',
        orderId: orderId,
        details: { coffeeId, quantity }
    });
});

// 3. /status/:id endpoint (Optional but good to have)
// Checks the status of an order
app.get('/status/:id', (req, res) => {
    const orderId = req.params.id;
    // In a real app, you'd query a database for order status
    const statuses = ['Pending', 'Brewing', 'Ready for Pickup', 'Completed', 'Cancelled'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    console.log(`GET /status/${orderId} requested. Status: ${randomStatus}`);
    res.status(200).json({
        orderId: orderId,
        status: randomStatus,
        message: `Status for order ${orderId} is: ${randomStatus}`
    });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).send("<h1>404 Not Found: This coffee shop doesn't serve that page!</h1>");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Cloud Café App listening on port ${PORT}`);
    console.log(`Access menu and prices at: http://localhost:${PORT}`);
    console.log(`Place order with POST to: http://localhost:${PORT}/order`);
    console.log(`Check order status at: http://localhost:${PORT}/status/:id`);
});
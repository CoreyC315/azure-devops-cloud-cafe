document.addEventListener('DOMContentLoaded', () => {
    const menuList = document.getElementById('menu-list');
    const coffeeSelect = document.getElementById('coffee-select');
    const orderForm = document.getElementById('order-form');
    const orderStatusDiv = document.getElementById('order-status');
    const statusForm = document.getElementById('status-form');
    const statusResultDiv = document.getElementById('status-result');

    let menuData = []; // To store fetched menu items

    // --- Fetch and display menu ---
    async function fetchMenu() {
        try {
            const response = await fetch('/menu');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            menuData = await response.json();
            
            menuList.innerHTML = ''; // Clear loading message
            coffeeSelect.innerHTML = '<option value="">-- Please select --</option>'; // Clear existing options

            menuData.forEach(item => {
                // Add to menu list
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                menuList.appendChild(li);

                // Add to coffee selection dropdown
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = `${item.name} ($${item.price.toFixed(2)})`;
                coffeeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching menu:', error);
            menuList.innerHTML = '<li>Failed to load menu. Please try again later.</li>';
        }
    }

    // --- Handle order form submission ---
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        orderStatusDiv.classList.remove('show', 'error');
        orderStatusDiv.textContent = 'Placing order...';
        orderStatusDiv.classList.add('show');

        const coffeeId = coffeeSelect.value;
        const quantity = document.getElementById('quantity').value;

        try {
            const response = await fetch('/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coffeeId: parseInt(coffeeId), quantity: parseInt(quantity) })
            });

            const data = await response.json();

            if (response.ok) {
                orderStatusDiv.textContent = `Order placed! Order ID: ${data.orderId}. Message: ${data.message}`;
                orderStatusDiv.classList.remove('error');
            } else {
                orderStatusDiv.textContent = `Error placing order: ${data.message || response.statusText}`;
                orderStatusDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            orderStatusDiv.textContent = 'An unexpected error occurred while placing your order.';
            orderStatusDiv.classList.add('error');
        }
    });

    // --- Handle check status form submission ---
    statusForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        statusResultDiv.classList.remove('show', 'error');
        statusResultDiv.textContent = 'Checking status...';
        statusResultDiv.classList.add('show');

        const orderId = document.getElementById('order-id-input').value;

        try {
            const response = await fetch(`/status/${orderId}`);
            const data = await response.json();

            if (response.ok) {
                statusResultDiv.textContent = `Order ${data.orderId} status: ${data.status}. Message: ${data.message}`;
                statusResultDiv.classList.remove('error');
            } else {
                statusResultDiv.textContent = `Error checking status: ${data.message || response.statusText}`;
                statusResultDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error checking status:', error);
            statusResultDiv.textContent = 'An unexpected error occurred while checking status.';
            statusResultDiv.classList.add('error');
        }
    });

    // Initial fetch of the menu when the page loads
    fetchMenu();
});
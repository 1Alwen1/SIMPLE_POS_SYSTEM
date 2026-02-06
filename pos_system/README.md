## Download

Click here to download the file for the Simple POS System: [Download](https://github.com/1Alwen1/SIMPLE_POS_SYSTEM/archive/refs/heads/pos_system_only.zip)

# Simple POS System

A web-based Point of Sale (POS) system built with HTML, CSS, JavaScript for the frontend and PHP/MySQL for the backend. This system allows users to manage inventory, process transactions, and view transaction history.

## Features

- **Inventory Management**: Add, view, and remove items categorized by type (e.g., POWDER, SABON, SOFTDRINKS, etc.)
- **Transaction Processing**: Select items, add to cart, calculate totals, process payments, and compute change
- **Transaction History**: View past transactions with details like date/time, items purchased, total, payment, and change
- **Responsive Design**: Modern, gradient-based UI with animations and mobile-friendly layout
- **Data Persistence**: Uses localStorage for client-side storage and MySQL database for server-side persistence via API

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with gradients, animations, and responsive design)
  - JavaScript (ES6+)

- **Backend**:
  - PHP 7+
  - MySQL

- **Development Environment**:
  - XAMPP (for local server and MySQL)

## Installation

1. **Prerequisites**:
   - XAMPP installed (or any web server with PHP and MySQL support)
   - Web browser (Chrome, Firefox, etc.)

2. **Setup**:
   - Clone or download the project files to your web server's document root (e.g., `C:/xampp/htdocs/pos_system` for XAMPP).
   - Start XAMPP and ensure Apache and MySQL services are running.

3. **Database Setup**:
   - Open phpMyAdmin (usually at `http://localhost/phpmyadmin`).
   - Create a new database named `simple_pos_db`.
   - Import the `database/simple_pos_db.sql` file to create the necessary tables.

4. **Configuration**:
   - Update `api/db.php` if your MySQL credentials differ from the defaults (root user, no password).

5. **Run the Application**:
   - Open your browser and navigate to `http://localhost/pos_system` (adjust path as needed).

## Usage

1. **Inventory Management**:
   - Navigate to the "Inventory" tab.
   - Add new items by entering name, selecting or creating a category, and setting a price.
   - View items organized by categories in tabs.
   - Remove items using the "Remove" button.

2. **Processing Transactions**:
   - Go to the "Transactions" tab.
   - Select a category to filter items.
   - Click on items to add them to the cart.
   - Enter customer payment and calculate change.
   - The transaction is automatically saved to history.

3. **Viewing History**:
   - Access the "History" tab to see past transactions.
   - Clear history if needed.

## API Endpoints

The system includes a RESTful API for backend operations:

### Inventory
- `GET /api/inventory.php`: Retrieve all inventory items
- `POST /api/inventory.php`: Add a new item (expects JSON: `{name, category, price}`)
- `DELETE /api/inventory.php?id={id}`: Remove an item by ID

### Transactions
- `POST /api/transactions.php`: Save a transaction (expects JSON: `{items, total, payment, change}`)

### History
- `GET /api/history.php`: Retrieve transaction history

## Database Schema

### `inventory` Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `category` (VARCHAR(255), NOT NULL)
- `price` (DECIMAL(10,2), NOT NULL)

### `transactions` Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `items` (TEXT, NOT NULL) - Comma-separated list of item names
- `total` (DECIMAL(10,2), NOT NULL)
- `payment` (DECIMAL(10,2), NOT NULL)
- `change_amount` (DECIMAL(10,2), NOT NULL)
- `date_time` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

## File Structure

```
pos_system/
├── index.html          # Main HTML file with embedded CSS and JS
├── style.css           # External CSS (if used separately)
├── js/
│   └── script.js       # JavaScript logic for frontend functionality
├── api/
│   ├── db.php          # Database connection configuration
│   ├── inventory.php   # Inventory API endpoints
│   ├── transactions.php # Transaction API endpoints
│   └── history.php     # History API endpoints
├── database/
│   └── simple_pos_db.sql # Database schema
└── README.md           # This file
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test thoroughly.
5. Submit a pull request.

## License

This project is open-source and available under the MIT License.

## Notes

- The frontend primarily uses localStorage for data persistence, but API calls are available for server-side storage.
- Predefined categories are included, but new categories can be added dynamically.
- Ensure CORS is properly configured if deploying to a different domain.
- For production use, consider implementing user authentication and input validation enhancements.

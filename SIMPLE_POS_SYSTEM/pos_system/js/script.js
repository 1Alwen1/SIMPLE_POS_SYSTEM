
/* ================== DATA ================== */
let items = [];
let cart = [];
let history = [];

try {
    items = JSON.parse(localStorage.getItem('items')) || [];
    history = JSON.parse(localStorage.getItem('history')) || [];
} catch (e) {
    console.warn("LocalStorage error", e);
}

/* ================== NAVIGATION ================== */
document.getElementById('nav-inventory').onclick = () => showSection('inventory');
document.getElementById('nav-transactions').onclick = () => showSection('transactions');
document.getElementById('nav-history').onclick = () => showSection('history');

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById(`nav-${id}`).classList.add('active');
}

/* ================== INVENTORY ================== */
function addItem() {
const name = document.getElementById('itemName').value.trim();
const price = parseFloat(document.getElementById('itemPrice').value);
const categorySelect = document.getElementById('itemCategorySelect');
const customCategory = document.getElementById('itemCategoryCustom').value.trim();

let category = "General";

if (categorySelect.value === "__new__" && customCategory) {
category = customCategory;
} else if (categorySelect.value) {
category = categorySelect.value;
}

if (!name || isNaN(price) || price < 0) {
alert("Invalid item data");
return;
}

items.push({ name, category, price });
localStorage.setItem("items", JSON.stringify(items));

document.getElementById('itemName').value = "";
document.getElementById('itemPrice').value = "";
document.getElementById('itemCategoryCustom').value = "";
categorySelect.value = "";

updateItemTabs();
updateItemButtons();
updateTransactionCategories();
updateCategoryDropdown();
}
const selected = itemCategorySelect.value;
const custom = itemCategoryCustom.value.trim();

let category = "General";

if (selected === "__new__" && custom) {
category = custom;
} else if (selected) {
category = selected;
}


function updateItemTabs() {
    tabButtons.innerHTML = "";
    tabContents.innerHTML = "";

    const categories = [...new Set(items.map(i => i.category))];
    categories.forEach((cat, i) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = (e) => showTab(cat, e);
        if (i === 0) btn.classList.add("active");
        tabButtons.appendChild(btn);

        const div = document.createElement("div");
        div.id = `tab-${cat}`;
        div.className = "tab-content" + (i === 0 ? " active" : "");

        const table = document.createElement("table");
        table.innerHTML = `
            <thead><tr><th>Item</th><th>Price</th><th>Action</th></tr></thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");
        items.forEach((item, index) => {
            if (item.category === cat) {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td><button class="remove" onclick="removeItem(${index})">Remove</button></td>
                    </tr>
                `;
            }
        });

        div.appendChild(table);
        tabContents.appendChild(div);
    });
}

function showTab(category, e) {
    document.querySelectorAll(".tab-buttons button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    document.getElementById(`tab-${category}`).classList.add("active");
}

function removeItem(index) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    updateItemTabs();
    updateItemButtons();
    updateTransactionCategories();
}

/* ================== TRANSACTIONS ================== */
function updateItemButtons(category = "All") {
    const buttonsDiv = document.getElementById("itemButtons");
    buttonsDiv.innerHTML = "";

    items.forEach((item, index) => {
        if (category === "All" || item.category === category) {
            const btn = document.createElement("button");
            btn.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            btn.onclick = () => addToCart(index);
            buttonsDiv.appendChild(btn);
        }
    });
}

updateTransactionCategories

/* ================== CART ================== */
function updateCart() {
const cartList = document.getElementById("cart");
cartList.innerHTML = "";
let total = 0;

cart.forEach(item => {
total += item.price;
cartList.innerHTML += `
    <li>
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
    </li>
`;
});

document.getElementById("total").textContent = total.toFixed(2);
}

/* ================== PAYMENT ================== */
function calculateChange() {
const total = parseFloat(document.getElementById("total").textContent);
const payment = parseFloat(document.getElementById("payment").value);
const result = document.getElementById("changeResult");

if (isNaN(payment) || payment < total) {
result.textContent = "❌ Insufficient payment";
result.className = "error";
return;
}

const change = payment - total;
result.textContent = `✅ Change: $${change.toFixed(2)}`;
result.className = "success";

saveHistory(total, payment, change);


}

/* ================== CART CONTROL ================== */
function clearCart() {
cart = [];

document.getElementById("payment").value = "";
document.getElementById("changeResult").textContent = "";
document.getElementById("changeResult").className = "";

updateCart();
}


/* ================== HISTORY ================== */
function saveHistory(total, payment, change) {
history.push({
date: new Date().toLocaleString(),
items: cart.map(i => i.name).join(", "),
total,
payment,
change
});

localStorage.setItem("history", JSON.stringify(history));
updateHistory();
}

function updateHistory() {
const list = document.getElementById("historyList");
list.innerHTML = "";

history.forEach(h => {
list.innerHTML += `
    <tr>
        <td>${h.date}</td>
        <td>${h.items}</td>
        <td>$${h.total.toFixed(2)}</td>
        <td>$${h.payment.toFixed(2)}</td>
        <td>$${h.change.toFixed(2)}</td>
    </tr>
`;
});
}
function updateCategoryDropdown() {
    const select = document.getElementById('itemCategorySelect');
    if (!select) return;
    
    select.innerHTML = "";

    const predefinedCategories = ["CAKE", "FUEL"];

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Select Category --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    predefinedCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    // Remove the "Add New Category" option since only CAKE and FUEL exist
}




/* ================== INIT ================== */
updateItemTabs();
updateTransactionCategories();
updateItemButtons();
updateHistory();
updateCategoryDropdown(); // <-- call this to populate dropdown immediately
// Add this event listener near your other initialization code
document.getElementById('nav-inventory').addEventListener('click', function() {
showSection('inventory');
setTimeout(updateCategoryDropdown, 100); // Small delay to ensure DOM is ready
});


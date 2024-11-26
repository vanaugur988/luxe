 // Products data
const products = [
    {
        id: 1,
        name: 'Leather Crossbody Bag',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 2,
        name: 'Classic Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=799&q=80'
    },
    {
        id: 3,
        name: 'Silk Scarf',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 4,
        name: 'Designer Sunglasses',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80'
    }
];

// Cart state
let cart = [];
let isLogin = true;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const searchModal = document.getElementById('searchModal');
const authModal = document.getElementById('authModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const nameField = document.getElementById('nameField');

// Initialize products
function initProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
            <button onclick="addToCart(${product.id})" class="add-to-cart">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price} × ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Modal toggles
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function toggleSearch() {
    searchModal.style.display = searchModal.style.display === 'block' ? 'none' : 'block';
    if (searchModal.style.display === 'block') {
        searchInput.focus();
    }
}

function toggleAuth() {
    authModal.style.display = authModal.style.display === 'block' ? 'none' : 'block';
}

function toggleAuthMode() {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? 'Login' : 'Register';
    nameField.style.display = isLogin ? 'none' : 'block';
    authForm.querySelector('button').textContent = isLogin ? 'Login' : 'Register';
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        
        searchResults.innerHTML = results.map(product => `
            <div class="search-result">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </div>
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '';
    }
});

// Auth form handling
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    toggleAuth();
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) toggleCart();
    if (e.target === searchModal) toggleSearch();
    if (e.target === authModal) toggleAuth();
});

// Initialize
initProducts();

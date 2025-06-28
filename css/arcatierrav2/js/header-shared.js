// header-shared.js - ACTUALIZADO PARA TU SISTEMA
function initializeHeader() {
    // Solo insertar header si NO estamos en login.html
    if (!window.location.pathname.includes('login.html')) {
        
        const headerHTML = `
        <header id="mainHeader">
            <nav>
                <div class="logo">
                    <a href="index.html">
                        <img src="images/logos/logo-arcatierra.png" alt="Arca Tierra" style="max-width: 150px; height: auto;">
                    </a>
                </div>
                
                <button class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <ul class="nav-links" id="navLinks">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="tienda.html">Tienda</a></li>
                    <li><a href="productos.html">Catálogo</a></li>
                    <li><a href="experiencias.html">Experiencias</a></li>
                    <li><a href="xochimilco.html">Xochimilco</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="medios-prensa.html">Medios</a></li>
                    <li><a href="recetas.html">Recetas</a></li>
                </ul>
                
                <div class="user-cart-section">
                    <div id="userSection">
                        <!-- Se llena dinámicamente -->
                    </div>
                    <div class="cart-icon">
                        <a href="#" onclick="toggleCart(); return false;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-6-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M12 2v20"></path>
                            </svg>
                            <span id="cartBadge" class="cart-badge">0</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Cart Sidebar (Global) -->
        <div class="cart-sidebar" id="cartSidebar">
            <div class="cart-header">
                <h2>Mi Carrito (<span id="cartItemsCount">0</span> productos)</h2>
                <button class="cart-close" onclick="toggleCart()">✕</button>
            </div>
            <div class="cart-items" id="cartItems">
                <!-- Items del carrito dinámicos -->
            </div>
            <div class="cart-footer">
                <div class="cart-subtotal">
                    <span>Subtotal</span>
                    <span>$<span id="cartSubtotal">0.00</span></span>
                </div>
                <div class="cart-subtotal">
                    <span>Envío</span>
                    <span id="cartShipping">Gratis</span>
                </div>
                <div class="cart-total">
                    <span>Total</span>
                    <span>$<span id="cartTotal">0.00</span> MXN</span>
                </div>
                <div class="cart-impact">
                    <p class="impact-title">🌍 Tu impacto positivo</p>
                    <div class="impact-metrics">
                        <div class="impact-item">
                            <span class="impact-value" id="co2Saved">0</span>
                            <span class="impact-label">kg CO₂</span>
                        </div>
                        <div class="impact-item">
                            <span class="impact-value" id="waterSaved">0</span>
                            <span class="impact-label">L agua</span>
                        </div>
                        <div class="impact-item">
                            <span class="impact-value" id="plasticSaved">0</span>
                            <span class="impact-label">g plástico</span>
                        </div>
                    </div>
                </div>
                <button class="checkout-button" onclick="proceedToCheckout()">
                    Proceder al pago
                </button>
            </div>
        </div>

        <!-- Overlay para cerrar el carrito -->
        <div class="cart-overlay" onclick="toggleCart()"></div>
        `;

        // Insertar Header en el body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // SIEMPRE verificar usuario y carrito
    checkUserSession();
    updateCart();
    
    // Mobile menu toggle si existe
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.getElementById('navLinks').classList.toggle('active');
        });
    }
}

// Verificar sesión de usuario - COMPATIBLE CON TU SISTEMA
function checkUserSession() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return; // Si no hay userSection, salir
    
    // Usar TU sistema de autenticación
    const isAuthenticated = localStorage.getItem('arcatierraAuth') === 'true';
    const userData = JSON.parse(localStorage.getItem('arcatierraUser') || '{}');
    
    if (isAuthenticated && userData.name) {
        const inicial = userData.name.charAt(0).toUpperCase();
        
        userSection.innerHTML = `
            <div class="user-menu">
                <button class="user-button" onclick="toggleUserMenu()">
                    <span class="user-avatar">${inicial}</span>
                    <span>${userData.name.split(' ')[0]}</span>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="dashboard.html">Mi Dashboard</a>
                    <a href="dashboard.html#orders">Mis Pedidos</a>
                    <a href="dashboard.html#subscriptions">Suscripciones</a>
                    <hr>
                    <a href="#" onclick="logout()">Cerrar Sesión</a>
                </div>
            </div>
        `;
    } else {
        userSection.innerHTML = `
            <a href="login.html" class="login-btn">Iniciar Sesión</a>
        `;
    }
}

// Toggle menú usuario
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Logout - COMPATIBLE CON TU SISTEMA
function logout() {
    // Limpiar TU sistema de autenticación
    localStorage.removeItem('arcatierraAuth');
    localStorage.removeItem('arcatierraUser');
    // Mantener el carrito
    window.location.href = 'index.html';
}

// FUNCIONES DEL CARRITO GLOBAL
let cart = JSON.parse(localStorage.getItem('arcaTierraCart')) || [];

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
    }
}

function updateCart() {
    cart = JSON.parse(localStorage.getItem('arcaTierraCart')) || [];
    
    const badge = document.getElementById('cartBadge');
    const itemsCount = document.getElementById('cartItemsCount');
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (!badge || !itemsCount || !cartItemsContainer) return;
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    itemsCount.textContent = totalItems;

    // Actualizar items del carrito
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p style="color: var(--arcatierra-verde-suave); margin-bottom: 1rem;">Tu carrito está vacío</p>
                <a href="productos.html" class="btn-primary" style="display: inline-block; background: var(--arcatierra-terracota-principal); color: white; padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none;">
                    Ver Productos
                </a>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-producer">${item.producer ? item.producer.split(',')[0] : ''}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-button" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-button" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <div>$${(item.price * item.quantity).toFixed(2)}</div>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--arcatierra-terracota-principal); cursor: pointer; margin-top: 0.5rem;">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Actualizar totales
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 250 ? 0 : 69;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('cartSubtotal');
    const shippingEl = document.getElementById('cartShipping');
    const totalEl = document.getElementById('cartTotal');
    
    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = total.toFixed(2);

    // Actualizar métricas de impacto
    const totalCO2 = cart.reduce((sum, item) => sum + ((item.co2 || 2) * item.quantity), 0);
    const totalWater = cart.reduce((sum, item) => sum + ((item.water || 50) * item.quantity), 0);
    const totalPlastic = cart.reduce((sum, item) => sum + ((item.plastic || 10) * item.quantity), 0);

    const co2El = document.getElementById('co2Saved');
    const waterEl = document.getElementById('waterSaved');
    const plasticEl = document.getElementById('plasticSaved');
    
    if (co2El) co2El.textContent = totalCO2.toFixed(1);
    if (waterEl) waterEl.textContent = totalWater;
    if (plasticEl) plasticEl.textContent = totalPlastic;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    updateCart();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío');
        return;
    }
    
    // Verificar si hay usuario logueado - USAR TU SISTEMA
    const isAuthenticated = localStorage.getItem('arcatierraAuth') === 'true';
    
    if (!isAuthenticated) {
        // Guardar la intención de checkout
        localStorage.setItem('arcaTierraCheckoutIntent', 'true');
        window.location.href = 'login.html';
    } else {
        window.location.href = 'checkout.html';
    }
}

// Función para agregar productos al carrito (para usar desde otras páginas)
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    updateCart();
    showToast(`${product.name} agregado al carrito`);
}

function showToast(message) {
    const existingToast = document.getElementById('toast');
    const toast = existingToast || createToast();
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function createToast() {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
    return toast;
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
    initializeHeader();
}

// Escuchar cambios en el carrito desde otras pestañas
window.addEventListener('storage', function(e) {
    if (e.key === 'arcaTierraCart') {
        updateCart();
    }
    // También escuchar cambios de autenticación
    if (e.key === 'arcatierraAuth' || e.key === 'arcatierraUser') {
        checkUserSession();
    }
});
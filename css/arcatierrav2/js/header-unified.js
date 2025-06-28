// header-unified.js - SISTEMA COMPLETO Y FUNCIONAL
// Este archivo maneja TODO el header y carrito de manera automática

document.addEventListener('DOMContentLoaded', function() {
    // Solo insertar header si no existe
    if (!document.getElementById('mainHeader')) {
        insertHeader();
    }
    initializeHeader();
});

function insertHeader() {
    // Detectar si estamos en subcarpeta
    const path = window.location.pathname;
    const isInSubfolder = path.includes('/auth/') || path.includes('/cuenta/');
    const basePath = isInSubfolder ? '../' : '';
    
    const headerHTML = `
    <header id="mainHeader" class="header">
        <nav class="nav-container">
            <div class="logo">
                <a href="${basePath}index.html">
                    <img src="${basePath}images/logos/logo-arcatierra.png" alt="Arca Tierra">
                </a>
            </div>
            
            <button class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul class="nav-links" id="navLinks">
                <li><a href="${basePath}index.html">Inicio</a></li>
                <li><a href="${basePath}tienda-canastas-con-alimentos-de-temporada-mexico.html">Tienda</a></li>
                <li><a href="${basePath}productos.html">Productos</a></li>
                <li><a href="${basePath}experiencias-turismo-rural-y-gastronomico-xochimilco.html">Experiencias</a></li>
                <li><a href="${basePath}nosotros-xochimilco-chinampa-del-sol.html">Xochimilco</a></li>
                <li><a href="${basePath}nosotros-chinampas-agricultura-campesina.html">Nosotros</a></li>
                <li><a href="${basePath}kit-de-prensa-y-medios-alimentos-artesanales-mexicanos.html">Medios</a></li>
                <li><a href="${basePath}recetas-faciles-alimentos-naturales.html">Recetas</a></li>
                <li><a href="${basePath}contacto.html">Contacto</a></li>
            </ul>
            
            <div class="user-cart-section">
                <div id="userSection"></div>
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
    
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h2>Mi Carrito</h2>
            <button class="cart-close" onclick="toggleCart()">✕</button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span>$<span id="cartTotal">0.00</span> MXN</span>
            </div>
            <button class="checkout-button" onclick="proceedToCheckout()">
                Proceder al pago
            </button>
        </div>
    </div>
    
    <div class="cart-overlay" onclick="toggleCart()"></div>`;
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function initializeHeader() {
    checkUserSession();
    markActivePage();
    initMobileMenu();
    updateCart();
}

function checkUserSession() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return;
    
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    const isInSubfolder = window.location.pathname.includes('/auth/') || 
                         window.location.pathname.includes('/cuenta/');
    const basePath = isInSubfolder ? '../' : '';
    
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            const inicial = user.name.charAt(0).toUpperCase();
            
            userSection.innerHTML = `
                <a href="${basePath}cuenta/mi-cuenta.html" class="user-account-btn">
                    <span class="user-avatar">${inicial}</span>
                    <span>Mi Cuenta</span>
                </a>
            `;
        } catch (e) {
            showLoginButton(basePath);
        }
    } else {
        showLoginButton(basePath);
    }
}

function showLoginButton(basePath = '') {
    const userSection = document.getElementById('userSection');
    if (userSection) {
        userSection.innerHTML = `
            <a href="${basePath}auth/login.html" class="login-btn">
                Iniciar Sesión
            </a>
        `;
    }
}

function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// FUNCIONES DEL CARRITO
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
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!badge || !cartItemsContainer) return;
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 2rem;">
                <p>Tu carrito está vacío</p>
                <a href="productos.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--arcatierra-terracota-principal); color: white; text-decoration: none; border-radius: 25px;">Ver Productos</a>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
                <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.25rem 0; color: var(--arcatierra-verde-principal);">${item.name}</h4>
                    <p style="margin: 0; color: var(--arcatierra-verde-suave); font-size: 0.875rem;">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--arcatierra-terracota-principal); font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
        `).join('');
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

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

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    updateCart();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío', 'warning');
        return;
    }
    
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    const isInSubfolder = window.location.pathname.includes('/auth/') || 
                         window.location.pathname.includes('/cuenta/');
    const basePath = isInSubfolder ? '../' : '';
    
    if (!currentUser) {
        window.location.href = basePath + 'auth/login.html?redirect=checkout';
    } else {
        window.location.href = basePath + 'checkout.html';
    }
}

// TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ESCUCHAR CAMBIOS EN OTRAS PESTAÑAS
window.addEventListener('storage', function(e) {
    if (e.key === 'arcaTierraCart') {
        updateCart();
    }
    if (e.key === 'arcaTierraCurrentUser') {
        checkUserSession();
    }
});

// FUNCIONES GLOBALES
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;
window.showToast = showToast;
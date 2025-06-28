// header-footer-unified.js - SISTEMA COMPLETO UNIFICADO ARCA TIERRA
// Este archivo maneja TODO: header, footer, carrito, usuario, etc.

function insertHeaderFooter() {
    // DETECTA AUTOMÁTICAMENTE SI ESTÁ EN SUBCARPETA
    const path = window.location.pathname;
    const isInSubfolder = path.includes('/auth/') || path.includes('/cuenta/');
    const basePath = isInSubfolder ? '../' : '';
}
document.addEventListener('DOMContentLoaded', function() {
    // Insertar header y footer si no existen
    if (!document.getElementById('mainHeader')) {
        insertHeaderFooter();
    }
    
    // Inicializar todas las funcionalidades
    initializeAll();
});

function insertHeaderFooter() {
    // Detectar si estamos en subcarpeta
    const path = window.location.pathname;
    const isInSubfolder = path.includes('/auth/') || path.includes('/cuenta/');
    const basePath = isInSubfolder ? '../' : '';
    
    // HEADER HTML
    const headerHTML = `
    <!-- HEADER UNIFICADO ARCA TIERRA -->
    <header id="mainHeader" class="header">
        <nav class="nav-container" role="navigation" aria-label="Navegación principal">
            <!-- LOGO -->
            <div class="logo">
                <a href="${basePath}index.html" aria-label="Inicio - Arca Tierra">
                    <img src="${basePath}images/logos/logo-arcatierra.png" 
                         alt="Arca Tierra - Agricultura regenerativa" 
                         width="150" 
                         height="50">
                </a>
            </div>
            
            <!-- MENÚ MÓVIL -->
            <button class="menu-toggle" 
                    id="menuToggle" 
                    aria-label="Abrir menú" 
                    aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <!-- NAVEGACIÓN PRINCIPAL -->
            <ul class="nav-links" id="navLinks" role="menubar">
                <li role="none"><a href="${basePath}index.html" role="menuitem">Inicio</a></li>
                <li role="none"><a href="${basePath}tienda-canastas-con-alimentos-de-temporada-mexico.html" role="menuitem">Tienda</a></li>
                <li role="none"><a href="${basePath}productos.html" role="menuitem">Productos</a></li>
                <li role="none"><a href="${basePath}experiencias-turismo-rural-y-gastronomico-xochimilco.html" role="menuitem">Experiencias</a></li>
                <li role="none"><a href="${basePath}nosotros-xochimilco-chinampa-del-sol.html" role="menuitem">Xochimilco</a></li>
                <li role="none"><a href="${basePath}nosotros-chinampas-agricultura-campesina.html" role="menuitem">Nosotros</a></li>
                <li role="none"><a href="${basePath}kit-de-prensa-y-medios-alimentos-artesanales-mexicanos.html" role="menuitem">Medios</a></li>
                <li role="none"><a href="${basePath}recetas-faciles-alimentos-naturales.html" role="menuitem">Recetas</a></li>
                <li role="none"><a href="${basePath}contacto.html" role="menuitem">Contacto</a></li>
            </ul>
            
            <!-- SECCIÓN USUARIO Y CARRITO -->
            <div class="user-cart-section">
                <div id="userSection" aria-label="Cuenta de usuario">
                    <!-- Se llena dinámicamente -->
                </div>
                
                <div class="cart-icon" aria-label="Carrito de compras">
                    <button onclick="toggleCart()" 
                            aria-label="Abrir carrito" 
                            class="cart-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-6-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M12 2v20"></path>
                        </svg>
                        <span id="cartBadge" class="cart-badge" aria-live="polite">0</span>
                    </button>
                </div>
            </div>
        </nav>
    </header>
    
    <!-- CARRITO LATERAL -->
    <aside class="cart-sidebar" id="cartSidebar" aria-label="Carrito de compras">
        <div class="cart-header">
            <h2>Mi Carrito</h2>
            <button class="cart-close" onclick="toggleCart()" aria-label="Cerrar carrito">✕</button>
        </div>
        <div class="cart-items" id="cartItems" role="region" aria-live="polite">
            <!-- Items dinámicos -->
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span aria-label="Total del carrito">$<span id="cartTotal">0.00</span> MXN</span>
            </div>
            <button class="checkout-button" onclick="proceedToCheckout()">
                Proceder al pago
            </button>
        </div>
    </aside>
    
    <!-- OVERLAY -->
    <div class="cart-overlay" onclick="toggleCart()" aria-hidden="true"></div>`;
    
    // FOOTER HTML
    const footerHTML = `
    <!-- FOOTER UNIFICADO ARCA TIERRA -->
    <footer id="mainFooter" class="footer" role="contentinfo">
        <div class="footer-container">
            <!-- SECCIÓN PRINCIPAL -->
            <div class="footer-main">
                <div class="footer-grid">
                    <!-- COLUMNA 1: SOBRE NOSOTROS -->
                    <div class="footer-column">
                        <img src="${basePath}images/logos/logo-arcatierra-blanco.png" 
                             alt="Arca Tierra" 
                             class="footer-logo"
                             width="180"
                             height="60">
                        <p class="footer-description">
                            Somos una red de agricultura regenerativa que conecta familias campesinas 
                            con consumidores conscientes, promoviendo el comercio justo y la conservación 
                            de las chinampas de Xochimilco.
                        </p>
                        <div class="social-links">
                            <a href="https://facebook.com/arcatierra" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               aria-label="Facebook Arca Tierra">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="https://instagram.com/arcatierra" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="Instagram Arca Tierra">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://wa.me/525512345678" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="WhatsApp Arca Tierra">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <!-- COLUMNA 2: ENLACES RÁPIDOS -->
                    <div class="footer-column">
                        <h3>Enlaces Rápidos</h3>
                        <ul class="footer-links">
                            <li><a href="${basePath}tienda-canastas-con-alimentos-de-temporada-mexico.html">Tienda en línea</a></li>
                            <li><a href="${basePath}productos.html">Catálogo de productos</a></li>
                            <li><a href="${basePath}experiencias-turismo-rural-y-gastronomico-xochimilco.html">Experiencias Xochimilco</a></li>
                            <li><a href="${basePath}nosotros-chinampas-agricultura-campesina.html">Nuestra historia</a></li>
                            <li><a href="${basePath}recetas-faciles-alimentos-naturales.html">Recetas saludables</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA 3: INFORMACIÓN -->
                    <div class="footer-column">
                        <h3>Información</h3>
                        <ul class="footer-links">
                            <li><a href="${basePath}nosotros-xochimilco-chinampa-del-sol.html">Chinampa del Sol</a></li>
                            <li><a href="${basePath}kit-de-prensa-y-medios-alimentos-artesanales-mexicanos.html">Prensa y medios</a></li>
                            <li><a href="${basePath}terminos-condiciones.html">Términos y condiciones</a></li>
                            <li><a href="${basePath}politica-privacidad.html">Política de privacidad</a></li>
                            <li><a href="${basePath}preguntas-frecuentes.html">Preguntas frecuentes</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA 4: CONTACTO -->
                    <div class="footer-column">
                        <h3>Contacto</h3>
                        <ul class="footer-contact">
                            <li>
                                <strong>Teléfono:</strong><br>
                                <a href="tel:+525512345678">+52 55 1234 5678</a>
                            </li>
                            <li>
                                <strong>Email:</strong><br>
                                <a href="mailto:contacto@arcatierra.com">contacto@arcatierra.com</a>
                            </li>
                            <li>
                                <strong>Ubicación:</strong><br>
                                Embarcadero Cuemanco<br>
                                Xochimilco, CDMX
                            </li>
                            <li>
                                <strong>Horario:</strong><br>
                                Lun-Vie: 9:00-18:00<br>
                                Sáb: 9:00-14:00
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- BARRA INFERIOR -->
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; 2024 Arca Tierra. Todos los derechos reservados.</p>
                    <p class="footer-credits">
                        Agricultura regenerativa • Comercio justo • Chinampas de Xochimilco
                    </p>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- TOAST NOTIFICATIONS -->
    <div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true"></div>`;
    
    // Insertar header al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Insertar footer al final del body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// INICIALIZAR TODAS LAS FUNCIONALIDADES
function initializeAll() {
    checkUserSession();
    markActivePage();
    initMobileMenu();
    updateCart();
    initScrollEffects();
}

// VERIFICAR SESIÓN DE USUARIO
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
                <a href="${basePath}cuenta/mi-cuenta.html" 
                   class="user-account-btn"
                   aria-label="Mi cuenta - ${user.name}">
                    <span class="user-avatar" aria-hidden="true">${inicial}</span>
                    <span class="user-name">Mi Cuenta</span>
                </a>
            `;
        } catch (e) {
            showLoginButton(basePath);
        }
    } else {
        showLoginButton(basePath);
    }
}

// MOSTRAR BOTÓN DE LOGIN
function showLoginButton(basePath = '') {
    const userSection = document.getElementById('userSection');
    if (userSection) {
        userSection.innerHTML = `
            <a href="${basePath}auth/login.html" 
               class="login-btn"
               aria-label="Iniciar sesión">
                Iniciar Sesión
            </a>
        `;
    }
}

// MARCAR PÁGINA ACTIVA
function markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// INICIALIZAR MENÚ MÓVIL
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevenir scroll cuando el menú está abierto
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// EFECTOS DE SCROLL
function initScrollEffects() {
    let lastScroll = 0;
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra al hacer scroll
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en móvil
        if (window.innerWidth <= 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        }
        
        lastScroll = currentScroll;
    });
}

// FUNCIONES DEL CARRITO
let cart = JSON.parse(localStorage.getItem('arcaTierraCart')) || [];

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar && overlay) {
        const isOpen = cartSidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        overlay.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        // Anunciar estado para lectores de pantalla
        const message = isOpen ? 'Carrito abierto' : 'Carrito cerrado';
        announceToScreenReader(message);
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
    badge.setAttribute('aria-label', `${totalItems} productos en el carrito`);
    
    // Actualizar items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Tu carrito está vacío</p>
                <a href="productos.html" class="btn-primary">Ver Productos</a>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <article class="cart-item" role="article">
                <img src="${item.image || 'images/placeholder.jpg'}" 
                     alt="${item.name}" 
                     loading="lazy">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" 
                        class="remove-item"
                        aria-label="Eliminar ${item.name} del carrito">×</button>
            </article>
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
    showToast(`${product.name} agregado al carrito`, 'success');
}

function removeFromCart(productId) {
    const removedItem = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    updateCart();
    
    if (removedItem) {
        showToast(`${removedItem.name} eliminado del carrito`, 'info');
    }
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
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        document.body.appendChild(toast);
    }
    
    // Agregar icono según el tipo
    const icons = {
        success: '✓',
        warning: '⚠',
        error: '✕',
        info: 'ℹ'
    };
    
    toast.innerHTML = `<span class="toast-icon">${icons[type] || ''}</span> ${message}`;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ANUNCIAR A LECTORES DE PANTALLA
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
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
/**
 * JAVASCRIPT PRINCIPAL - ARCA TIERRA
 * Funcionalidad compartida en todas las páginas
 */

// ========================================
// GESTIÓN DE SESIÓN
// ========================================

/**
 * Verifica si hay un usuario logueado y actualiza el header
 */
function checkUserSession() {
    const userSection = document.getElementById('userSection');
    if (!userSection) return;
    
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            const inicial = user.name.charAt(0).toUpperCase();
            
            userSection.innerHTML = `
                <a href="${getRelativePath()}cuenta/mi-cuenta.html" class="user-account-btn">
                    <span class="user-avatar">${inicial}</span>
                    <span>Mi Cuenta</span>
                </a>
            `;
        } catch (e) {
            console.error('Error al parsear usuario:', e);
            showLoginButton();
        }
    } else {
        showLoginButton();
    }
}

/**
 * Muestra el botón de login
 */
function showLoginButton() {
    const userSection = document.getElementById('userSection');
    if (userSection) {
        userSection.innerHTML = `
            <a href="${getRelativePath()}auth/login.html" class="login-btn">
                Iniciar Sesión
            </a>
        `;
    }
}

/**
 * Obtiene la ruta relativa según la página actual
 */
function getRelativePath() {
    const path = window.location.pathname;
    if (path.includes('/auth/') || path.includes('/cuenta/')) {
        return '../';
    }
    return '';
}

// ========================================
// NAVEGACIÓN ACTIVA
// ========================================

/**
 * Marca el enlace activo en la navegación
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// CARRITO DE COMPRAS
// ========================================

/**
 * Obtiene el carrito del localStorage
 */
function getCart() {
    const cart = localStorage.getItem('arcaTierraCart');
    return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito en localStorage
 */
function saveCart(cart) {
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    updateCartBadge();
}

/**
 * Actualiza el badge del carrito
 */
function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

/**
 * Agrega un producto al carrito
 */
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart(cart);
    showToast(`${product.name} agregado al carrito`);
}

// ========================================
// NOTIFICACIONES TOAST
// ========================================

/**
 * Muestra una notificación toast
 */
function showToast(message, type = 'success') {
    // Crear toast si no existe
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // Configurar mensaje y tipo
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// MENÚ MÓVIL
// ========================================

/**
 * Toggle del menú móvil
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// ========================================
// VALIDACIÓN DE CÓDIGO POSTAL CDMX
// ========================================

/**
 * Valida si el código postal es de CDMX
 */
function validateCDMXPostalCode(cp) {
    const cpNumber = parseInt(cp);
    return cpNumber >= 1000 && cpNumber <= 16999;
}

// ========================================
// FORMATEO DE PRECIOS
// ========================================

/**
 * Formatea un precio en pesos mexicanos
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

/**
 * Inicializa lazy loading para imágenes
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// MODO OSCURO
// ========================================

/**
 * Toggle del modo oscuro
 */
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('arcaTierraTheme', newTheme);
}

/**
 * Inicializa el tema guardado
 */
function initTheme() {
    const savedTheme = localStorage.getItem('arcaTierraTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Inicializa todas las funciones cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión de usuario
    checkUserSession();
    
    // Marcar enlace activo en navegación
    setActiveNavLink();
    
    // Actualizar badge del carrito
    updateCartBadge();
    
    // Inicializar tema
    initTheme();
    
    // Inicializar lazy loading
    initLazyLoading();
    
    // Event listeners para menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navLinks && navLinks.classList.contains('active')) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// ========================================
// MÉTRICAS DE IMPACTO AMBIENTAL
// ========================================

/**
 * Calcula las métricas de impacto ambiental
 */
function calculateEnvironmentalImpact() {
    const metrics = JSON.parse(localStorage.getItem('arcaTierraMetrics') || '{}');
    
    // Valores por defecto si no hay datos
    return {
        co2Saved: metrics.co2 || 45,
        waterSaved: metrics.water || 8350,
        plasticAvoided: metrics.plastic || 85
    };
}

/**
 * Actualiza las métricas después de una compra
 */
function updateMetricsAfterPurchase(orderTotal) {
    const metrics = JSON.parse(localStorage.getItem('arcaTierraMetrics') || '{}');
    
    // Cálculos aproximados basados en el total de la orden
    metrics.co2 = (metrics.co2 || 0) + (orderTotal * 0.05);
    metrics.water = (metrics.water || 0) + (orderTotal * 10);
    metrics.plastic = (metrics.plastic || 0) + (orderTotal * 0.1);
    
    localStorage.setItem('arcaTierraMetrics', JSON.stringify(metrics));
}

// ========================================
// EXPORTAR FUNCIONES PARA USO GLOBAL
// ========================================

window.arcaTierra = {
    showToast,
    addToCart,
    getCart,
    formatPrice,
    validateCDMXPostalCode,
    calculateEnvironmentalImpact,
    updateMetricsAfterPurchase
};
/**
 * JAVASCRIPT ESPECÍFICO - PÁGINA TIENDA
 * Funcionalidad para canastas, suscripciones y código postal
 */

// ========================================
// VERIFICACIÓN DE CÓDIGO POSTAL
// ========================================

/**
 * Verifica si el código postal es de CDMX
 */
function verificarCodigoPostal() {
    const cpInput = document.getElementById('cpInput');
    const cpMessage = document.getElementById('cpMessage');
    const cp = cpInput.value.trim();
    
    // Validar que sea un código postal válido
    if (!cp || cp.length < 4 || cp.length > 5) {
        mostrarMensajeCP('Por favor ingresa un código postal válido', 'error');
        return;
    }
    
    // Verificar si es CDMX (01000-16999)
    const cpNumber = parseInt(cp);
    const esCDMX = cpNumber >= 1000 && cpNumber <= 16999;
    
    if (esCDMX) {
        mostrarMensajeCP('¡Excelente! Hacemos entregas en tu zona 🚚', 'success');
        // Guardar el CP para futuros pedidos
        localStorage.setItem('arcaTierraCP', cp);
    } else {
        mostrarMensajeCP('Por ahora solo entregamos en CDMX. ¡Pronto llegaremos a tu zona!', 'error');
    }
}

/**
 * Muestra mensaje de código postal
 */
function mostrarMensajeCP(mensaje, tipo) {
    const cpMessage = document.getElementById('cpMessage');
    cpMessage.textContent = mensaje;
    cpMessage.className = `cp-message ${tipo}`;
    cpMessage.style.display = 'block';
}

// ========================================
// GESTIÓN DE CANASTAS
// ========================================

/**
 * Datos de las canastas disponibles
 */
const canastasData = {
    'frutas-individual': {
        id: 'frutas-individual',
        name: 'Canasta de Frutas Agroecológicas individual',
        price: 320,
        weight: '3.5 kg',
        description: 'Selección de frutas de temporada cultivadas sin agroquímicos',
        image: 'images/tienda/canasta-frutas.jpg'
    },
    'individual': {
        id: 'individual',
        name: 'Canasta individual',
        price: 280,
        weight: '3.5 kg',
        description: 'Mix de vegetales y frutas perfecta para 1-2 personas',
        image: 'images/tienda/canasta-individual.jpg'
    },
    'media': {
        id: 'media',
        name: 'Canasta media',
        price: 380,
        weight: '5 kg',
        description: 'Ideal para familias pequeñas de 2-3 personas',
        image: 'images/tienda/canasta-media.jpg'
    },
    'completa': {
        id: 'completa',
        name: 'Canasta completa',
        price: 520,
        weight: '7.5 kg',
        description: 'Perfecta para familias de 3-5 personas',
        image: 'images/tienda/compra_de_alimentos_de_temporada_arca_tierra.jpg'
    }
};

/**
 * Suscribirse a una canasta
 */
function suscribirse(tipoCanasta) {
    const canasta = canastasData[tipoCanasta];
    
    if (!canasta) {
        showToast('Error al procesar la suscripción', 'error');
        return;
    }
    
    // Verificar si hay usuario logueado
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    
    if (!currentUser) {
        // Guardar intención de suscripción
        localStorage.setItem('arcaTierraPendingSubscription', JSON.stringify(canasta));
        showToast('Por favor inicia sesión para suscribirte', 'info');
        
        // Redireccionar a login después de 2 segundos
        setTimeout(() => {
            window.location.href = 'auth/login.html';
        }, 2000);
        return;
    }
    
    // Procesar suscripción
    procesarSuscripcion(canasta);
}

/**
 * Procesar la suscripción
 */
function procesarSuscripcion(canasta) {
    // Obtener suscripciones actuales
    let suscripciones = JSON.parse(localStorage.getItem('arcaTierraSuscripciones') || '[]');
    
    // Verificar si ya tiene esta suscripción
    const suscripcionExistente = suscripciones.find(s => s.id === canasta.id);
    
    if (suscripcionExistente) {
        showToast('Ya tienes una suscripción activa para esta canasta', 'warning');
        return;
    }
    
    // Crear nueva suscripción
    const nuevaSuscripcion = {
        ...canasta,
        fechaInicio: new Date().toISOString(),
        estado: 'activa',
        proximaEntrega: calcularProximaEntrega(),
        descuento: 0.1 // 10% de descuento por suscripción
    };
    
    suscripciones.push(nuevaSuscripcion);
    localStorage.setItem('arcaTierraSuscripciones', JSON.stringify(suscripciones));
    
    showToast(`¡Suscripción exitosa! Tu ${canasta.name} llegará cada semana`, 'success');
    
    // Actualizar métricas
    if (window.arcaTierra && window.arcaTierra.updateMetricsAfterPurchase) {
        window.arcaTierra.updateMetricsAfterPurchase(canasta.price);
    }
    
    // Redireccionar a mi cuenta después de 2 segundos
    setTimeout(() => {
        window.location.href = 'cuenta/mis-suscripciones.html';
    }, 2000);
}

/**
 * Comprar canasta sin suscripción
 */
function comprarDirecto(tipoCanasta) {
    const canasta = canastasData[tipoCanasta];
    
    if (!canasta) {
        showToast('Error al procesar la compra', 'error');
        return;
    }
    
    // Verificar código postal
    const cpGuardado = localStorage.getItem('arcaTierraCP');
    if (!cpGuardado) {
        showToast('Por favor verifica tu código postal primero', 'warning');
        document.getElementById('cpInput').focus();
        return;
    }
    
    // Agregar al carrito
    const producto = {
        id: canasta.id,
        name: canasta.name,
        price: canasta.price,
        image: canasta.image,
        type: 'canasta',
        weight: canasta.weight
    };
    
    if (window.arcaTierra && window.arcaTierra.addToCart) {
        window.arcaTierra.addToCart(producto);
    } else {
        // Fallback si main.js no está cargado
        agregarAlCarritoLocal(producto);
    }
}

/**
 * Agregar al carrito (fallback local)
 */
function agregarAlCarritoLocal(producto) {
    let cart = JSON.parse(localStorage.getItem('arcaTierraCart') || '[]');
    const existingItem = cart.find(item => item.id === producto.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...producto,
            quantity: 1
        });
    }
    
    localStorage.setItem('arcaTierraCart', JSON.stringify(cart));
    actualizarBadgeCarrito();
    showToast(`${producto.name} agregada al carrito`, 'success');
}

/**
 * Actualizar badge del carrito
 */
function actualizarBadgeCarrito() {
    const cart = JSON.parse(localStorage.getItem('arcaTierraCart') || '[]');
    const badge = document.getElementById('cartBadge');
    
    if (badge) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

/**
 * Calcular próxima entrega (siguiente martes)
 */
function calcularProximaEntrega() {
    const hoy = new Date();
    const diasHastaMartes = (2 - hoy.getDay() + 7) % 7 || 7; // 2 = Martes
    const proximaEntrega = new Date(hoy);
    proximaEntrega.setDate(hoy.getDate() + diasHastaMartes);
    return proximaEntrega.toISOString();
}

// ========================================
// ANIMACIONES Y EFECTOS
// ========================================

/**
 * Animación de scroll suave para enlaces internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Animación de aparición en scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.canasta-opcion, .beneficio').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay CP guardado
    const cpGuardado = localStorage.getItem('arcaTierraCP');
    if (cpGuardado) {
        document.getElementById('cpInput').value = cpGuardado;
        verificarCodigoPostal();
    }
    
    // Verificar si hay suscripción pendiente
    const pendingSubscription = localStorage.getItem('arcaTierraPendingSubscription');
    if (pendingSubscription && localStorage.getItem('arcaTierraCurrentUser')) {
        const canasta = JSON.parse(pendingSubscription);
        localStorage.removeItem('arcaTierraPendingSubscription');
        procesarSuscripcion(canasta);
    }
    
    // Inicializar animaciones
    initSmoothScroll();
    initScrollAnimations();
    
    // Actualizar badge del carrito
    actualizarBadgeCarrito();
    
    // Event listener para Enter en código postal
    const cpInput = document.getElementById('cpInput');
    if (cpInput) {
        cpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verificarCodigoPostal();
            }
        });
    }
});

// ========================================
// UTILIDADES
// ========================================

/**
 * Mostrar toast (si main.js no está disponible)
 */
function showToast(message, type = 'success') {
    if (window.arcaTierra && window.arcaTierra.showToast) {
        window.arcaTierra.showToast(message, type);
    } else {
        // Fallback simple
        alert(message);
    }
}
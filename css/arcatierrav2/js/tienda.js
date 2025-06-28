// ========================================
// FUNCIONES DE TIENDA ARCA TIERRA
// ========================================

// Datos de canastas (temporal - luego vendrá de PostgreSQL)
const canastas = [
    {
        id: 1,
        nombre: "Canasta de Frutas Agroecológicas individual",
        peso: "3.5 kg",
        precio: 320,
        descripcion: "Selección de frutas de temporada cultivadas sin agroquímicos",
        imagen: "images/tienda/canasta-frutas.jpg",
        co2: 8,
        agua: 150,
        tipo: "frutas-individual"
    },
    {
        id: 2,
        nombre: "Canasta individual",
        peso: "3.5 kg",
        precio: 280,
        descripcion: "Mix de vegetales y frutas perfecta para 1-2 personas",
        imagen: "images/tienda/canasta-individual.jpg",
        co2: 10,
        agua: 200,
        tipo: "individual"
    },
    {
        id: 3,
        nombre: "Canasta media",
        peso: "5 kg",
        precio: 380,
        descripcion: "Ideal para familias pequeñas de 2-3 personas",
        imagen: "images/tienda/canasta-media.jpg",
        co2: 15,
        agua: 350,
        tipo: "media"
    },
    {
        id: 4,
        nombre: "Canasta completa",
        peso: "7.5 kg",
        precio: 520,
        descripcion: "Perfecta para familias de 3-5 personas",
        imagen: "images/tienda/canasta-completa.jpg",
        co2: 25,
        agua: 500,
        tipo: "completa"
    }
];

// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('arcaTierraCart')) || [];

// Verificar código postal
function verificarCodigoPostal() {
    const cp = document.getElementById('cpInput').value;
    const message = document.getElementById('cpMessage');
    
    if (cp.length !== 5) {
        message.textContent = 'Por favor ingresa un código postal de 5 dígitos';
        message.className = 'cp-message invalid';
        return;
    }
    
    const cpNum = parseInt(cp);
    if (cpNum >= 1000 && cpNum <= 16999) {
        message.textContent = '✓ ¡Sí hacemos entregas en tu zona!';
        message.className = 'cp-message valid';
    } else {
        message.textContent = '✗ Lo sentimos, solo realizamos entregas en CDMX (CP 01000-16999)';
        message.className = 'cp-message invalid';
    }
}

// FUNCIÓN CORREGIDA - Agregar al carrito
function agregarAlCarrito(id) {
    const canasta = canastas.find(c => c.id === id);
    if (!canasta) return;
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantity++;
    } else {
        // Asegurar que todos los campos necesarios estén presentes
        carrito.push({
            id: canasta.id,
            name: canasta.nombre,
            price: canasta.precio,
            producer: "Red de productores Arca Tierra",
            unit: canasta.peso,
            description: canasta.descripcion,
            image: canasta.imagen,
            co2: canasta.co2,
            water: canasta.agua,
            quantity: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`${canasta.nombre} agregada al carrito`, 'success');
    
    // Abrir carrito lateral
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
}

// Suscribirse
function suscribirse(tipo) {
    const canasta = canastas.find(c => c.tipo === tipo);
    if (!canasta) return;
    
    // Guardar tipo de suscripción
    localStorage.setItem('arcaTierraSuscripcion', JSON.stringify({
        tipo: tipo,
        canasta: canasta
    }));
    
    // Verificar si hay usuario logueado
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    if (currentUser) {
        window.location.href = 'checkout.html?tipo=suscripcion&canasta=' + tipo;
    } else {
        mostrarNotificacion('Por favor inicia sesión para suscribirte', 'info');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=suscripcion&canasta=' + tipo;
        }, 2000);
    }
}

// Toggle carrito
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) {
            overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
        }
    }
}

// Actualizar carrito
function actualizarCarrito() {
    localStorage.setItem('arcaTierraCart', JSON.stringify(carrito));
    
    // Actualizar badge
    const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    const itemsCount = document.getElementById('cartItemsCount');
    if (itemsCount) {
        itemsCount.textContent = totalItems;
    }
    
    // Actualizar items del carrito
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        } else {
            cartItemsContainer.innerHTML = carrito.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img"
                         onerror="this.src='images/productos/default.jpg'">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.unit}</p>
                        <div class="cart-item-quantity">
                            <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="eliminarDelCarrito(${item.id})" class="remove-btn">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Actualizar total
        const total = carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('cartTotal');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2);
        }
    }
}

// Cambiar cantidad
function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.quantity += cambio;
        if (item.quantity <= 0) {
            eliminarDelCarrito(id);
        } else {
            actualizarCarrito();
        }
    }
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

// Proceder al checkout
function procederAlCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'warning');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Usar la función global si existe
    if (window.arcaTierra && window.arcaTierra.showToast) {
        window.arcaTierra.showToast(mensaje, tipo);
    } else {
        // Fallback local
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        toast.textContent = mensaje;
        toast.className = `toast show ${tipo}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Estilos para el toast
const toastStyles = `
<style>
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 2rem;
    background: var(--arcatierra-verde-principal);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 3000;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

.toast.success {
    background: var(--arcatierra-verde-principal);
}

.toast.warning {
    background: var(--arcatierra-terracota-principal);
}

.toast.info {
    background: var(--arcatierra-verde-suave);
}

/* Estilos del carrito */
.cart-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--arcatierra-gris-azulado);
}

.cart-item-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
}

.cart-item-info {
    flex: 1;
}

.cart-item-info h4 {
    margin-bottom: 0.5rem;
    color: var(--arcatierra-verde-principal);
}

.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
}

.cart-item-quantity button {
    width: 30px;
    height: 30px;
    border: 1px solid var(--arcatierra-gris-azulado);
    background: white;
    border-radius: 4px;
    cursor: pointer;
}

.cart-item-price {
    text-align: right;
}

.remove-btn {
    background: none;
    border: none;
    color: var(--arcatierra-terracota-principal);
    cursor: pointer;
    font-size: 1.2rem;
    margin-top: 0.5rem;
}

.cp-message {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 4px;
}

.cp-message.valid {
    color: var(--arcatierra-verde-principal);
    background-color: rgba(51, 80, 62, 0.1);
}

.cp-message.invalid {
    color: var(--arcatierra-terracota-principal);
    background-color: rgba(177, 85, 67, 0.1);
}
</style>
`;

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar estilos del toast si no existen
    if (!document.getElementById('toast-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'toast-styles';
        styleElement.innerHTML = toastStyles;
        document.head.appendChild(styleElement.firstElementChild);
    }
    
    // Actualizar carrito al cargar
    actualizarCarrito();
    
    // Agregar listener al input de CP
    const cpInput = document.getElementById('cpInput');
    if (cpInput) {
        cpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verificarCodigoPostal();
            }
        });
    }
    
    // Cerrar carrito con overlay
    const overlay = document.querySelector('.cart-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleCart);
    }
});
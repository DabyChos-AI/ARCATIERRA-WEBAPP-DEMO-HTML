// ========================================
// FUNCIONES ESPECÍFICAS PARA CATÁLOGO
// ========================================

// Mock data expandido (temporal - luego vendrá de PostgreSQL)
const todosLosProductos = [
    // CANASTAS
    {
        id: 1,
        nombre: "Canasta de Frutas Agroecológicas individual",
        categoria: "canastas",
        peso: "3.5 kg",
        precio: 320,
        descripcion: "Selección de frutas de temporada cultivadas sin agroquímicos",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Canasta+Frutas",
        productor: "Red de productores Arca Tierra",
        origen: "xochimilco",
        co2: 8,
        agua: 150,
        badges: ["100% Orgánico"],
        popular: true
    },
    {
        id: 2,
        nombre: "Canasta individual",
        categoria: "canastas",
        peso: "3.5 kg",
        precio: 280,
        descripcion: "Mix de vegetales y frutas perfecta para 1-2 personas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Canasta+Individual",
        productor: "Red de productores Arca Tierra",
        origen: "xochimilco",
        co2: 10,
        agua: 200,
        badges: ["100% Orgánico"]
    },
    {
        id: 3,
        nombre: "Canasta media",
        categoria: "canastas",
        peso: "5 kg",
        precio: 380,
        descripcion: "Ideal para familias pequeñas de 2-3 personas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Canasta+Media",
        productor: "Red de productores Arca Tierra",
        origen: "xochimilco",
        co2: 15,
        agua: 350,
        badges: ["Más Popular", "100% Orgánico"],
        popular: true
    },
    {
        id: 4,
        nombre: "Canasta completa",
        categoria: "canastas",
        peso: "7.5 kg",
        precio: 520,
        descripcion: "Perfecta para familias de 3-5 personas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Canasta+Completa",
        productor: "Red de productores Arca Tierra",
        origen: "xochimilco",
        co2: 25,
        agua: 500,
        badges: ["Mejor Valor", "100% Orgánico"]
    },
    // VEGETALES
    {
        id: 5,
        nombre: "Lechuga Orgánica",
        categoria: "vegetales",
        peso: "300 g",
        precio: 35,
        descripcion: "Lechuga fresca cultivada en chinampas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Lechuga",
        productor: "Chinampa del Sol",
        origen: "xochimilco",
        co2: 0.5,
        agua: 10,
        badges: ["Nuevo", "100% Orgánico"]
    },
    {
        id: 6,
        nombre: "Jitomate Bola",
        categoria: "vegetales",
        peso: "1 kg",
        precio: 45,
        descripcion: "Jitomates rojos madurados en planta",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Jitomate",
        productor: "Cooperativa Huasca",
        origen: "hidalgo",
        co2: 1,
        agua: 15,
        badges: ["100% Orgánico"]
    },
    {
        id: 7,
        nombre: "Espinacas Baby",
        categoria: "vegetales",
        peso: "250 g",
        precio: 38,
        descripcion: "Espinacas tiernas perfectas para ensaladas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Espinacas",
        productor: "Familia Hernández",
        origen: "xochimilco",
        co2: 0.8,
        agua: 12,
        badges: ["100% Orgánico"]
    },
    {
        id: 8,
        nombre: "Zanahoria Orgánica",
        categoria: "vegetales",
        peso: "1 kg",
        precio: 32,
        descripcion: "Zanahorias dulces y crujientes",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Zanahoria",
        productor: "Chinampa del Sol",
        origen: "xochimilco",
        co2: 1.2,
        agua: 20,
        badges: ["100% Orgánico"]
    },
    // FRUTAS
    {
        id: 9,
        nombre: "Fresas Orgánicas",
        categoria: "frutas",
        peso: "500 g",
        precio: 85,
        descripcion: "Fresas dulces cultivadas sin pesticidas",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Fresas",
        productor: "Familia García",
        origen: "edomex",
        co2: 2,
        agua: 35,
        badges: ["Destacado", "100% Orgánico"],
        popular: true
    },
    {
        id: 10,
        nombre: "Mango Ataulfo",
        categoria: "frutas",
        peso: "1 kg",
        precio: 65,
        descripcion: "Mangos dulces y cremosos de temporada",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Mango",
        productor: "Cooperativa del Sur",
        origen: "guerrero",
        co2: 3,
        agua: 45,
        badges: ["De Temporada", "100% Orgánico"]
    },
    // HIERBAS
    {
        id: 11,
        nombre: "Cilantro Orgánico",
        categoria: "hierbas",
        peso: "100 g",
        precio: 15,
        descripcion: "Cilantro fresco y aromático",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Cilantro",
        productor: "Chinampa del Sol",
        origen: "xochimilco",
        co2: 0.2,
        agua: 5,
        badges: ["100% Orgánico"]
    },
    {
        id: 12,
        nombre: "Albahaca Fresca",
        categoria: "hierbas",
        peso: "50 g",
        precio: 20,
        descripcion: "Albahaca aromática para tus platillos",
        imagen: "https://via.placeholder.com/400x300/E3DBCB/B15543?text=Albahaca",
        productor: "Familia Morales",
        origen: "xochimilco",
        co2: 0.3,
        agua: 4,
        badges: ["100% Orgánico"]
    }
];

// Variables globales
let productosFiltrados = [...todosLosProductos];
let paginaActual = 1;
const productosPorPagina = 12;
let vistaActual = 'grid';
let carrito = JSON.parse(localStorage.getItem('arcaTierraCart')) || [];

// Inicializar catálogo
function inicializarCatalogo() {
    cargarProductos();
    actualizarContadores();
}

// Cargar productos
function cargarProductos() {
    const grid = document.getElementById('productsGrid');
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosParaMostrar = productosFiltrados.slice(inicio, fin);
    
    grid.innerHTML = productosParaMostrar.map(producto => `
        <div class="product-card" onclick="abrirModalProducto(${producto.id})">
            <div class="product-badges">
                ${producto.badges.map(badge => {
                    let badgeClass = 'badge-organic';
                    if (badge.includes('Popular')) badgeClass = 'badge-new';
                    if (badge.includes('Valor') || badge.includes('Destacado')) badgeClass = 'badge-discount';
                    return `<span class="badge ${badgeClass}">${badge}</span>`;
                }).join('')}
            </div>
            <button class="wishlist-button" onclick="toggleWishlist(${producto.id}, event)">
                ❤️
            </button>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" 
                 onerror="this.src='images/productos/default.jpg'">
            <div class="product-info">
                <div class="producer-info">
                    📍 ${producto.productor}
                </div>
                <h3 class="product-name">${producto.nombre}</h3>
                <p class="product-description">${producto.descripcion}</p>
                <div class="product-metrics">
                    <span class="metric">🌿 ${producto.co2} kg CO₂</span>
                    <span class="metric">💧 ${producto.agua}L agua</span>
                </div>
                <div class="product-footer">
                    <div>
                        <span class="product-price">$${producto.precio.toFixed(2)}</span>
                        <span class="price-unit">/ ${producto.peso}</span>
                    </div>
                    <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id}, event)">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// FUNCIÓN CORREGIDA - Agregar al carrito
function agregarAlCarrito(id, event) {
    if (event) event.stopPropagation();
    
    const producto = todosLosProductos.find(p => p.id === id);
    if (!producto) return;
    
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantity++;
    } else {
        // Mapear las propiedades del español al inglés
        carrito.push({
            id: producto.id,
            name: producto.nombre,
            price: producto.precio,
            producer: producto.productor,
            unit: producto.peso,
            description: producto.descripcion,
            image: producto.imagen,
            co2: producto.co2,
            water: producto.agua,
            quantity: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
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
    
    // Si estamos en productos.html, actualizar el sidebar del carrito
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--arcatierra-verde-suave);">Tu carrito está vacío</p>';
        } else {
            cartItemsContainer.innerHTML = carrito.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" 
                         onerror="this.src='images/productos/default.jpg'"
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-producer">Por ${item.producer.split(',')[0]}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-button" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-button" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <div>$${(item.price * item.quantity).toFixed(2)}</div>
                        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--arcatierra-terracota-principal); cursor: pointer; margin-top: 0.5rem;">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Actualizar totales
        const subtotal = carrito.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal >= 250 ? 0 : 69;
        const total = subtotal + shipping;

        document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
        document.getElementById('cartTotal').textContent = total.toFixed(2);
        document.getElementById('cartItemsCount').textContent = totalItems;

        // Actualizar métricas de impacto
        const totalCO2 = carrito.reduce((sum, item) => sum + (item.co2 * item.quantity), 0);
        const totalWater = carrito.reduce((sum, item) => sum + (item.water * item.quantity), 0);
        
        document.getElementById('co2Saved').textContent = totalCO2.toFixed(1);
        document.getElementById('waterSaved').textContent = totalWater;
        document.getElementById('plasticSaved').textContent = totalItems * 10; // 10g por producto
    }
}

// Funciones del carrito
function removeFromCart(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

function updateQuantity(productId, change) {
    const item = carrito.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            actualizarCarrito();
        }
    }
}

// Buscar productos
function buscarProductos() {
    const termino = document.getElementById('searchInput').value.toLowerCase();
    
    if (termino) {
        productosFiltrados = todosLosProductos.filter(producto => 
            producto.nombre.toLowerCase().includes(termino) ||
            producto.descripcion.toLowerCase().includes(termino) ||
            producto.productor.toLowerCase().includes(termino)
        );
    } else {
        aplicarFiltros();
    }
    
    paginaActual = 1;
    cargarProductos();
    actualizarContadores();
}

// Aplicar filtros
function aplicarFiltros() {
    productosFiltrados = todosLosProductos.filter(producto => {
        // Filtro por categoría
        const canastas = document.getElementById('canastas')?.checked;
        const vegetales = document.getElementById('vegetales')?.checked;
        const frutas = document.getElementById('frutas')?.checked;
        const hierbas = document.getElementById('hierbas')?.checked;
        
        let categoriaValida = false;
        if (canastas && producto.categoria === 'canastas') categoriaValida = true;
        if (vegetales && producto.categoria === 'vegetales') categoriaValida = true;
        if (frutas && producto.categoria === 'frutas') categoriaValida = true;
        if (hierbas && producto.categoria === 'hierbas') categoriaValida = true;
        
        if (!canastas && !vegetales && !frutas && !hierbas) categoriaValida = true;
        
        // Filtro por precio
        const maxPrecio = document.getElementById('priceRange')?.value || 1000;
        const precioValido = producto.precio <= maxPrecio;
        
        // Filtro por origen
        const xochimilco = document.getElementById('xochimilco')?.checked;
        const hidalgo = document.getElementById('hidalgo')?.checked;
        const edomex = document.getElementById('edomex')?.checked;
        
        let origenValido = false;
        if (xochimilco && producto.origen === 'xochimilco') origenValido = true;
        if (hidalgo && producto.origen === 'hidalgo') origenValido = true;
        if (edomex && producto.origen === 'edomex') origenValido = true;
        
        if (!xochimilco && !hidalgo && !edomex) origenValido = true;
        
        return categoriaValida && precioValido && origenValido;
    });
    
    paginaActual = 1;
    cargarProductos();
    actualizarContadores();
}

// Limpiar filtros
function limpiarFiltros() {
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 1000;
        actualizarPrecio();
    }
    
    productosFiltrados = [...todosLosProductos];
    cargarProductos();
    actualizarContadores();
}

// Actualizar precio
function actualizarPrecio() {
    const valor = document.getElementById('priceRange').value;
    document.getElementById('maxPrice').textContent = `$${valor}`;
    aplicarFiltros();
}

// Ordenar productos
function ordenarProductos() {
    const criterio = document.getElementById('sortSelect').value;
    
    switch(criterio) {
        case 'popular':
            productosFiltrados.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
            break;
        case 'precio-asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
    }
    
    cargarProductos();
}

// Cambiar vista
function cambiarVista(vista) {
    vistaActual = vista;
    const grid = document.getElementById('productsGrid');
    const buttons = document.querySelectorAll('.view-button');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-button').classList.add('active');
    
    if (vista === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

// Cambiar página
function cambiarPagina(direccion) {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    
    if (direccion === 'prev' && paginaActual > 1) {
        paginaActual--;
    } else if (direccion === 'next' && paginaActual < totalPaginas) {
        paginaActual++;
    } else if (typeof direccion === 'number') {
        paginaActual = direccion;
    }
    
    cargarProductos();
    actualizarPaginacion();
}

// Actualizar paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const pageNumbers = document.querySelector('.page-numbers');
    
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPaginas; i++) {
            pageNumbers.innerHTML += `
                <button class="page-number ${i === paginaActual ? 'active' : ''}" 
                        onclick="cambiarPagina(${i})">${i}</button>
            `;
        }
    }
}

// Actualizar contadores
function actualizarContadores() {
    const totalElement = document.getElementById('totalProductos');
    if (totalElement) {
        totalElement.textContent = productosFiltrados.length;
    }
    actualizarPaginacion();
}

// FUNCIÓN CORREGIDA - Abrir modal de producto
function abrirModalProducto(id) {
    const producto = todosLosProductos.find(p => p.id === id);
    if (!producto) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-images">
                <img src="${producto.imagen}" alt="${producto.nombre}" 
                     onerror="this.src='images/productos/default.jpg'">
            </div>
            <div class="modal-info">
                <h2>${producto.nombre}</h2>
                <p class="modal-producer">📍 ${producto.productor}</p>
                <p class="modal-description">${producto.descripcion}</p>
                
                <div class="modal-metrics">
                    <div class="metric-item">
                        <span class="metric-icon">🌿</span>
                        <div>
                            <strong>${producto.co2} kg CO₂</strong>
                            <small>ahorrados</small>
                        </div>
                    </div>
                    <div class="metric-item">
                        <span class="metric-icon">💧</span>
                        <div>
                            <strong>${producto.agua}L</strong>
                            <small>agua preservada</small>
                        </div>
                    </div>
                    <div class="metric-item">
                        <span class="metric-icon">📍</span>
                        <div>
                            <strong>${producto.origen}</strong>
                            <small>origen</small>
                        </div>
                    </div>
                </div>
                
                <div class="modal-price">
                    <span class="price">$${producto.precio}</span>
                    <span class="unit">/ ${producto.peso}</span>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-add-cart" onclick="agregarAlCarrito(${producto.id}); cerrarModal();">
                        Agregar al carrito
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlist(${producto.id})">
                        ❤️ Guardar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Toggle filtros móvil
function toggleFiltros() {
    const sidebar = document.getElementById('filtersSidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
    }
}

// Toggle wishlist
function toggleWishlist(id, event) {
    if (event) event.stopPropagation();
    mostrarNotificacion('Agregado a favoritos', 'success');
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Usar la función del arcaTierra global si existe
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
        toast.className = `toast ${tipo}`;
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Toggle carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        if (overlay) {
            overlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
        }
    }
}

// Proceder al checkout
function proceedToCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos
    inicializarCatalogo();
    
    // Actualizar carrito
    actualizarCarrito();
    
    // Event listener para cerrar modal
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
    
    // Enter en búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarProductos();
            }
        });
    }
    
    // Cerrar carrito con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cartSidebar = document.getElementById('cartSidebar');
            if (cartSidebar && cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        }
    });
});
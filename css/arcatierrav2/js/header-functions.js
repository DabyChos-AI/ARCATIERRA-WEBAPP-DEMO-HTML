// ========================================
// FUNCIONES DEL HEADER UNIFICADO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. MENÚ MÓVIL
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 2. PÁGINA ACTIVA
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // 3. HEADER SCROLL (opcional - hace el header más compacto)
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const header = document.getElementById('mainHeader');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // 4. BOTÓN DE SESIÓN
    const userSection = document.getElementById('userSection');
    const currentUser = localStorage.getItem('arcaTierraCurrentUser');
    
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            const inicial = user.name.charAt(0).toUpperCase();
            userSection.innerHTML = `
                <a href="cuenta/mi-cuenta.html" class="user-account-btn">
                    <span class="user-avatar">${inicial}</span>
                    <span>Mi Cuenta</span>
                </a>
            `;
        } catch (e) {
            mostrarBotonLogin();
        }
    } else {
        mostrarBotonLogin();
    }
    
    function mostrarBotonLogin() {
        userSection.innerHTML = `
            <a href="login.html" class="login-btn">
                Iniciar Sesión
            </a>
        `;
    }
});

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
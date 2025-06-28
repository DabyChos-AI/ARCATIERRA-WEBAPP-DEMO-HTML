
// ==========================================
// SISTEMA UNIFICADO DE AUTENTICACIÓN
// ==========================================

class ArcaTierraAuth {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        // Verificar sesión al cargar
        this.checkSession();
        
        // Escuchar cambios en localStorage (multi-tab)
        window.addEventListener('storage', (e) => {
            if (e.key === 'arcaTierraCurrentUser') {
                this.checkSession();
            }
        });
    }

    // VERIFICAR SESIÓN
    checkSession() {
        const savedUser = localStorage.getItem('arcaTierraCurrentUser');
        const rememberMe = localStorage.getItem('arcaTierraRememberMe') === 'true';
        
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.updateUIForAuthenticatedUser();
            } catch (e) {
                this.logout();
            }
        } else if (rememberMe && localStorage.getItem('arcaTierraRememberedEmail')) {
            // Auto-login si marcó "recuérdame"
            this.autoLogin();
        } else {
            this.updateUIForGuestUser();
        }
    }

    // LOGIN
    async login(email, password, rememberMe = false) {
        try {
            // Simulación - en producción esto sería una llamada API
            const user = await this.authenticateUser(email, password);
            
            if (user) {
                this.currentUser = user;
                this.isAuthenticated = true;
                
                // Guardar en localStorage
                localStorage.setItem('arcaTierraCurrentUser', JSON.stringify(user));
                
                if (rememberMe) {
                    localStorage.setItem('arcaTierraRememberMe', 'true');
                    localStorage.setItem('arcaTierraRememberedEmail', email);
                }
                
                this.updateUIForAuthenticatedUser();
                this.showToast('¡Bienvenido ' + user.name + '!', 'success');
                
                // Redirigir según contexto
                this.handlePostLoginRedirect();
                
                return true;
            }
        } catch (error) {
            this.showToast('Error al iniciar sesión', 'error');
            return false;
        }
    }

    // LOGOUT
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Limpiar localStorage (mantener carrito y preferencias)
        localStorage.removeItem('arcaTierraCurrentUser');
        
        // Mantener "recuérdame" si estaba activo
        if (localStorage.getItem('arcaTierraRememberMe') !== 'true') {
            localStorage.removeItem('arcaTierraRememberedEmail');
        }
        
        this.updateUIForGuestUser();
        this.showToast('Sesión cerrada correctamente', 'info');
        
        // Redirigir a inicio
        if (window.location.pathname.includes('dashboard') || 
            window.location.pathname.includes('checkout')) {
            window.location.href = '/index.html';
        }
    }

    // ACTUALIZAR UI PARA USUARIO AUTENTICADO
    updateUIForAuthenticatedUser() {
        const userSection = document.getElementById('userSection');
        if (!userSection) return;
        
        userSection.innerHTML = `
            

                
                    ${this.getUserInitial()}
                    ${this.currentUser.name.split(' ')[0]}
                    
                
                
                

                    
                        
                        Mi Dashboard
                    
                    
                        
                        Mis Pedidos
                    
                    
                        
                        Suscripciones
                    
                    

                    
                        
                        Cerrar Sesión
                    
                

            

        `;
        
        // Actualizar otros elementos que dependan del estado de auth
        this.updateCheckoutUI();
        this.updateCartUI();
    }

    // ACTUALIZAR UI PARA INVITADO
    updateUIForGuestUser() {
        const userSection = document.getElementById('userSection');
        if (!userSection) return;
        
        userSection.innerHTML = `
            
                
                Iniciar Sesión
            
        `;
    }

    // OBTENER INICIAL DEL USUARIO
    getUserInitial() {
        if (!this.currentUser || !this.currentUser.name) return 'U';
        return this.currentUser.name.charAt(0).toUpperCase();
    }

    // MANEJAR REDIRECCIÓN POST-LOGIN
    handlePostLoginRedirect() {
        const returnUrl = sessionStorage.getItem('arcaTierraReturnUrl');
        
        if (returnUrl) {
            sessionStorage.removeItem('arcaTierraReturnUrl');
            window.location.href = returnUrl;
        } else if (window.location.pathname.includes('login')) {
            window.location.href = '/dashboard.html';
        }
    }

    // VERIFICAR SI PUEDE ACCEDER A CHECKOUT
    canAccessCheckout() {
        const cart = JSON.parse(localStorage.getItem('arcaTierraCart') || '[]');
        
        if (cart.length === 0) {
            this.showToast('Tu carrito está vacío', 'warning');
            return false;
        }
        
        // Permitir checkout como invitado o autenticado
        return true;
    }

    // MOSTRAR TOAST
    showToast(message, type = 'info') {
        // Crear toast si no existe
        let toast = document.getElementById('authToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'authToast';
            toast.className = 'auth-toast';
            document.body.appendChild(toast);
        }
        
        // Configurar y mostrar
        toast.textContent = message;
        toast.className = `auth-toast show ${type}`;
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // SIMULAR AUTENTICACIÓN (en producción sería una API)
    async authenticateUser(email, password) {
        // Simulación de delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Base de datos simulada
        const users = [
            { id: 1, email: 'demo@arcatierra.com', password: 'demo123', name: 'Usuario Demo' },
            { id: 2, email: 'juan@gmail.com', password: 'juan123', name: 'Juan Pérez' }
        ];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Retornar usuario sin contraseña
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        
        throw new Error('Credenciales inválidas');
    }

    // AUTO-LOGIN CON EMAIL RECORDADO
    async autoLogin() {
        const rememberedEmail = localStorage.getItem('arcaTierraRememberedEmail');
        if (rememberedEmail) {
            // En producción, esto verificaría un token guardado
            console.log('Auto-login disponible para:', rememberedEmail);
        }
    }

    // ACTUALIZAR UI DEL CHECKOUT
    updateCheckoutUI() {
        if (window.location.pathname.includes('checkout')) {
            const emailField = document.getElementById('email');
            const nameField = document.getElementById('firstName');
            
            if (this.isAuthenticated && this.currentUser) {
                if (emailField) emailField.value = this.currentUser.email;
                if (nameField) nameField.value = this.currentUser.name;
            }
        }
    }

    // ACTUALIZAR UI DEL CARRITO
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('arcaTierraCart') || '[]');
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
        }
    }
}

// INICIALIZAR SISTEMA DE AUTENTICACIÓN
const arcaTierraAuth = new ArcaTierraAuth();

// FUNCIONES GLOBALES PARA EL HTML
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu-container')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }
});

// PROTEGER RUTAS PRIVADAS
function protectRoute() {
    const protectedPaths = ['/dashboard.html', '/mis-pedidos.html', '/mis-suscripciones.html'];
    const currentPath = window.location.pathname;
    
    if (protectedPaths.some(path => currentPath.includes(path))) {
        if (!arcaTierraAuth.isAuthenticated) {
            // Guardar URL de retorno
            sessionStorage.setItem('arcaTierraReturnUrl', window.location.href);
            
            // Redirigir a login
            window.location.href = '/login.html';
        }
    }
}

// Ejecutar protección de rutas al cargar
document.addEventListener('DOMContentLoaded', protectRoute);
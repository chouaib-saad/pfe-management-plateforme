// Theme Toggle and Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    // Add theme toggle to the page
    addThemeToggle();
    
    // Setup language switcher
    setupLanguageSwitcher();
});

/*

// Add theme toggle to the page
function addThemeToggle() {
    // Create theme toggle element if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <div class="theme-toggle-button active" id="lightModeBtn">
                <i class="fas fa-sun"></i>
            </div>
            <div class="theme-toggle-button" id="darkModeBtn">
                <i class="fas fa-moon"></i>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(themeToggle);
    }
    
    // Add event listeners
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    if (lightModeBtn && darkModeBtn) {
        lightModeBtn.addEventListener('click', function() {
            document.body.classList.remove('dark-mode');
            lightModeBtn.classList.add('active');
            darkModeBtn.classList.remove('active');
            localStorage.setItem('theme', 'light');
        });
        
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.add('dark-mode');
            darkModeBtn.classList.add('active');
            lightModeBtn.classList.remove('active');
            localStorage.setItem('theme', 'dark');
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeBtn.classList.add('active');
            lightModeBtn.classList.remove('active');
        }
    }
}


*/


// Setup language switcher
function setupLanguageSwitcher() {
    const languageOptions = document.querySelectorAll('.language-option');
    if (!languageOptions.length) return;
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            languageOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get selected language
            const lang = this.getAttribute('data-lang');
            
            // Save language preference
            localStorage.setItem('language', lang);
            
            // Show notification
            showNotification({
                title: `Langue changée en ${this.textContent}`,
                body: 'La traduction est en cours...',
                type: 'info'
            });
            
            // In a real application, you would use a translation library or API
            console.log(`Translating page to ${lang}`);
        });
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        // Find and click the corresponding language option
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === savedLanguage) {
                option.click();
            }
        });
    }
}

// Show notification
function showNotification(options) {
    const { title, body, type = 'info', duration = 5000 } = options;
    
    // Create notifications container if it doesn't exist
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notiglow"></div>
        <div class="notiborderglow"></div>
        <div class="notititle">${title}</div>
        <div class="notibody">${body}</div>
    `;
    
    // Set notification color based on type
    let gradient, color;
    switch (type) {
        case 'success':
            gradient = 'linear-gradient(to bottom, #2ecd71, #1faa53, #19873f)';
            color = '#2ecd71';
            break;
        case 'error':
            gradient = 'linear-gradient(to bottom, #e74c3c, #c0392b, #962d22)';
            color = '#e74c3c';
            break;
        case 'warning':
            gradient = 'linear-gradient(to bottom, #f39c12, #e67e22, #d35400)';
            color = '#f39c12';
            break;
        case 'info':
        default:
            gradient = 'linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff)';
            color = '#32a6ff';
    }
    
    notification.style.setProperty('--gradient', gradient);
    notification.style.setProperty('--color', color);
    
    // Add notification to container
    container.appendChild(notification);
    
    // Add mouse position tracking for glow effect
    notification.addEventListener('mousemove', function(e) {
        const glow = notification.querySelector('.notiglow');
        const borderGlow = notification.querySelector('.notiborderglow');
        
        const x = e.offsetX;
        const y = e.offsetY;
        
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        
        borderGlow.style.left = `${x}px`;
        borderGlow.style.top = `${y}px`;
    });
    
    // Remove notification after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Setup CRUD menu
function setupCrudMenu(triggerElement) {
    // Create CRUD menu
    const crudMenu = document.createElement('div');
    crudMenu.className = 'card';
    crudMenu.innerHTML = `
        <ul class="list">
            <li class="element">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#7e8590" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                    <path d="m15 5 4 4"></path>
                </svg>
                <p class="label">Rename</p>
            </li>
            <li class="element">
                <svg class="lucide lucide-user-round-plus" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                    <circle r="5" cy="8" cx="10"></circle>
                    <path d="M19 16v6"></path>
                    <path d="M22 19h-6"></path>
                </svg>
                <p class="label">Add Member</p>
            </li>
        </ul>
        <div class="separator"></div>
        <ul class="list">
            <li class="element">
                <svg class="lucide lucide-settings" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle r="3" cy="12" cx="12"></circle>
                </svg>
                <p class="label">Settings</p>
            </li>
            <li class="element delete">
                <svg class="lucide lucide-trash-2" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line y2="17" y1="11" x2="10" x1="10"></line>
                    <line y2="17" y1="11" x2="14" x1="14"></line>
                </svg>
                <p class="label">Delete</p>
            </li>
        </ul>
        <div class="separator"></div>
        <ul class="list">
            <li class="element">
                <svg class="lucide lucide-users-round" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 21a8 8 0 0 0-16 0"></path>
                    <circle r="5" cy="8" cx="10"></circle>
                    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                </svg>
                <p class="label">Team Access</p>
            </li>
        </ul>
    `;
    
    // Position menu next to trigger
    const rect = triggerElement.getBoundingClientRect();
    crudMenu.style.position = 'absolute';
    crudMenu.style.top = `${rect.bottom + window.scrollY}px`;
    crudMenu.style.left = `${rect.left + window.scrollX}px`;
    crudMenu.style.zIndex = '1000';
    
    // Append to body
    document.body.appendChild(crudMenu);
    
    // Add event listeners to menu items
    crudMenu.querySelectorAll('.element').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.querySelector('.label').textContent;
            const itemId = triggerElement.dataset.id || 'unknown';
            
            // Show notification
            showNotification({
                title: 'Action effectuée',
                body: `Action "${action}" effectuée sur l'élément #${itemId}`,
                type: 'success'
            });
            
            // Remove menu
            document.body.removeChild(crudMenu);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!crudMenu.contains(e.target) && !triggerElement.contains(e.target)) {
            if (crudMenu.parentNode) {
                document.body.removeChild(crudMenu);
            }
            document.removeEventListener('click', closeMenu);
        }
    });
    
    return crudMenu;
}

// Initialize CRUD menu triggers
document.addEventListener('DOMContentLoaded', function() {
    // Setup CRUD menu triggers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.crud-trigger')) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove any existing CRUD menus
            const existingMenus = document.querySelectorAll('.card');
            existingMenus.forEach(menu => {
                if (menu.parentNode) {
                    menu.parentNode.removeChild(menu);
                }
            });
            
            // Setup new CRUD menu
            setupCrudMenu(e.target.closest('.crud-trigger'));
        }
    });
});

/*

// Add complaint form functionality
function setupComplaintForm() {
    // Create complaint button if it doesn't exist
    if (!document.querySelector('.complaint-btn')) {
        const complaintBtn = document.createElement('button');
        complaintBtn.className = 'btn btn-outline-secondary complaint-btn';
        complaintBtn.innerHTML = '<i class="fas fa-comment-alt"></i> Réclamation';
        
        // Find a suitable place to add the button
        const headerElement = document.querySelector('.hero-buttons');
        if (headerElement) {
            headerElement.appendChild(complaintBtn);
        }
    }



    
    // Create complaint modal if it doesn't exist
    if (!document.getElementById('complaintModal')) {
        const complaintModal = document.createElement('div');
        complaintModal.className = 'complaint-modal';
        complaintModal.id = 'complaintModal';
        complaintModal.innerHTML = `
            <div class="complaint-modal-content">
                <button class="complaint-modal-close" id="complaintModalClose">
                    <i class="fas fa-times"></i>
                </button>
                <div class="complaint-form">
                    <h3>Soumettre une réclamation</h3>
                    <form id="complaintForm">
                        <div class="form-group">
                            <label for="complaintName">Nom complet</label>
                            <input type="text" id="complaintName" required>
                        </div>
                        <div class="form-group">
                            <label for="complaintEmail">Email</label>
                            <input type="email" id="complaintEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="complaintType">Type de réclamation</label>
                            <select id="complaintType" required>
                                <option value="">Sélectionner un type</option>
                                <option value="technical">Problème technique</option>
                                <option value="account">Problème de compte</option>
                                <option value="jury">Problème de jury</option>
                                <option value="schedule">Problème de planification</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="complaintMessage">Description détaillée</label>
                            <textarea id="complaintMessage" required></textarea>
                        </div>
                        <button type="submit" class="btn-submit">Soumettre</button>
                    </form>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(complaintModal);
        
        // Add event listeners
        const complaintBtn = document.querySelector('.complaint-btn');
        if (complaintBtn) {
            complaintBtn.addEventListener('click', function() {
                complaintModal.style.opacity = '1';
                complaintModal.style.visibility = 'visible';
            });
        }
        
        const closeBtn = document.getElementById('complaintModalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                complaintModal.style.opacity = '0';
                complaintModal.style.visibility = 'hidden';
            });
        }
        
        const form = document.getElementById('complaintForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success notification
                showNotification({
                    title: 'Réclamation soumise',
                    body: 'Votre réclamation a été soumise avec succès. Nous vous contacterons bientôt.',
                    type: 'success'
                });
                
                // Close modal and reset form
                complaintModal.style.opacity = '0';
                complaintModal.style.visibility = 'hidden';
                this.reset();
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add theme toggle
    addThemeToggle();
    
    // Setup language switcher
    setupLanguageSwitcher();
    
    // Setup complaint form
    setupComplaintForm();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification({
            title: 'Bienvenue sur la plateforme PFE',
            body: 'Découvrez toutes les fonctionnalités pour gérer vos projets de fin d\'études.',
            type: 'info'
        });
    }, 2000);
});

*/

// Dark/Light Mode Toggle and Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    // Add theme toggle to the page
    addThemeToggle();
    
    // Add language switcher functionality
    setupLanguageSwitcher();
    
    // Add complaint modal functionality
    setupComplaintModal();
    
    // Add notification system
    setupNotificationSystem();
    
    // Setup CRUD menu functionality
    setupCrudMenus();
});

/*

// Add theme toggle to the page
function addThemeToggle() {
    // Create theme toggle element
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
    
    // Add event listeners
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    
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

*/

// Setup language switcher functionality
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
            const lang = this.textContent;
            
            // Save language preference
            localStorage.setItem('language', lang);
            
            // Translate page content (simplified implementation)
            translatePage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        // Find and click the corresponding language option
        languageOptions.forEach(option => {
            if (option.textContent === savedLanguage) {
                option.click();
            }
        });
    }
}

// Translate page content (simplified implementation)
function translatePage(lang) {
    // This is a simplified implementation
    // In a real application, you would use a translation library or API
    console.log(`Translating page to ${lang}`);
    
    // Show notification about translation
    showNotification({
        title: `Langue changée en ${lang}`,
        body: 'La traduction est en cours...',
        type: 'info'
    });
}

/*

// Setup complaint modal functionality
function setupComplaintModal() {
    // Create complaint button
    const complaintBtn = document.createElement('button');
    complaintBtn.className = 'btn btn-outline-secondary complaint-btn';
    complaintBtn.innerHTML = '<i class="fas fa-comment-alt"></i> Réclamation';
    
    // Find a suitable place to add the button (e.g., in the header or navigation)
    const headerElement = document.querySelector('.hero-buttons');
    if (headerElement) {
        headerElement.appendChild(complaintBtn);
    }


    /*
    
    // Create complaint modal
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
    complaintBtn.addEventListener('click', function() {
        complaintModal.classList.add('active');
    });
    
    document.getElementById('complaintModalClose').addEventListener('click', function() {
        complaintModal.classList.remove('active');
    });
    
    document.getElementById('complaintForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('complaintName').value;
        const email = document.getElementById('complaintEmail').value;
        const type = document.getElementById('complaintType').value;
        const message = document.getElementById('complaintMessage').value;
        
        // In a real application, you would send this data to a server
        console.log('Complaint submitted:', { name, email, type, message });
        
        // Show success notification
        showNotification({
            title: 'Réclamation soumise',
            body: 'Votre réclamation a été soumise avec succès. Nous vous contacterons bientôt.',
            type: 'success'
        });
        
        // Close modal and reset form
        complaintModal.classList.remove('active');
        this.reset();
    });
}

*/


// Setup notification system
function setupNotificationSystem() {
    // Create notifications container
    const notificationsContainer = document.createElement('div');
    notificationsContainer.className = 'notifications-container';
    
    // Append to body
    document.body.appendChild(notificationsContainer);
    
    // Add some sample notifications (for demo purposes)
    setTimeout(() => {
        showNotification({
            title: 'Bienvenue sur la plateforme PFE',
            body: 'Découvrez toutes les fonctionnalités pour gérer vos projets de fin d\'études.',
            type: 'info'
        });
    }, 3000);
}

// Show notification
function showNotification(options) {
    const { title, body, type = 'info', duration = 5000 } = options;
    
    // Get notifications container
    const container = document.querySelector('.notifications-container');
    if (!container) return;
    
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

// Setup CRUD menu functionality
function setupCrudMenus() {
    // Add CRUD menu to elements with .crud-trigger class
    document.addEventListener('click', function(e) {
        // Close any open CRUD menus first
        const openMenus = document.querySelectorAll('.crud-card');
        openMenus.forEach(menu => {
            if (menu.parentNode) {
                menu.parentNode.removeChild(menu);
            }
        });
        
        // Check if clicked element has crud-trigger class
        if (e.target.closest('.crud-trigger')) {
            const trigger = e.target.closest('.crud-trigger');
            
            // Create CRUD menu
            const crudMenu = document.createElement('div');
            crudMenu.className = 'crud-card';
            crudMenu.innerHTML = `
                <ul class="list">
                    <li class="element">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#7e8590" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                            <path d="m15 5 4 4"></path>
                        </svg>
                        <p class="label">Modifier</p>
                    </li>
                    <li class="element">
                        <svg class="lucide lucide-user-round-plus" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                            <circle r="5" cy="8" cx="10"></circle>
                            <path d="M19 16v6"></path>
                            <path d="M22 19h-6"></path>
                        </svg>
                        <p class="label">Ajouter</p>
                    </li>
                </ul>
                <div class="separator"></div>
                <ul class="list">
                    <li class="element">
                        <svg class="lucide lucide-settings" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                            <circle r="3" cy="12" cx="12"></circle>
                        </svg>
                        <p class="label">Paramètres</p>
                    </li>
                    <li class="element delete">
                        <svg class="lucide lucide-trash-2" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#7e8590" fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line y2="17" y1="11" x2="10" x1="10"></line>
                            <line y2="17" y1="11" x2="14" x1="14"></line>
                        </svg>
                        <p class="label">Supprimer</p>
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
                        <p class="label">Accès équipe</p>
                    </li>
                </ul>
            `;
            
            // Position menu next to trigger
            const rect = trigger.getBoundingClientRect();
            crudMenu.style.top = `${rect.bottom + window.scrollY}px`;
            crudMenu.style.left = `${rect.left + window.scrollX}px`;
            
            // Append to body
            document.body.appendChild(crudMenu);
            
            // Add event listeners to menu items
            crudMenu.querySelectorAll('.element').forEach(item => {
                item.addEventListener('click', function() {
                    const action = this.querySelector('.label').textContent;
                    const itemId = trigger.dataset.id;
                    
                    // In a real application, you would perform the action
                    console.log(`Action: ${action}, Item ID: ${itemId}`);
                    
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
                if (!crudMenu.contains(e.target) && !trigger.contains(e.target)) {
                    if (crudMenu.parentNode) {
                        document.body.removeChild(crudMenu);
                    }
                    document.removeEventListener('click', closeMenu);
                }
            });
            
            // Prevent event propagation
            e.stopPropagation();
        }
    });
}

// Add laptop element to search section
function addLaptopElement() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;
    
    // Create row for search and laptop
    const row = document.createElement('div');
    row.className = 'row align-items-center';
    
    // Move search form to left column
    const searchForm = searchContainer.querySelector('.search-form');
    const searchTags = searchContainer.querySelector('.search-tags');
    
    if (searchForm && searchTags) {
        const leftCol = document.createElement('div');
        leftCol.className = 'col-md-6';
        leftCol.appendChild(searchForm.cloneNode(true));
        leftCol.appendChild(searchTags.cloneNode(true));
        
        // Create right column with laptop
        const rightCol = document.createElement('div');
        rightCol.className = 'col-md-6 d-flex justify-content-center';
        rightCol.innerHTML = `
            <div class="laptop">
                <div class="screen">
                    <div class="header"></div>
                    <div class="text">Recherche PFE</div>
                </div>
                <div class="keyboard"></div>
            </div>
        `;
        
        // Add columns to row
        row.appendChild(leftCol);
        row.appendChild(rightCol);
        
        // Replace original content
        searchContainer.innerHTML = '';
        searchContainer.appendChild(document.createElement('h2')).className = 'search-title';
        searchContainer.querySelector('.search-title').textContent = 'Rechercher un PFE';
        searchContainer.appendChild(row);
        
        // Re-initialize search functionality
        const newSearchInput = searchContainer.querySelector('.search-input');
        const newVoiceSearchBtn = searchContainer.querySelector('.voice-search-button');
        const newSearchBtn = searchContainer.querySelector('.search-button');
        
        if (newSearchInput && newSearchBtn) {
            newSearchBtn.addEventListener('click', function() {
                if (newSearchInput.value.trim() !== '') {
                    // Show search results
                    showSearchResults();
                }
            });
            
            newSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    // Show search results
                    showSearchResults();
                }
            });
        }
        
        if (newVoiceSearchBtn) {
            newVoiceSearchBtn.addEventListener('click', function() {
                if ('webkitSpeechRecognition' in window) {
                    const recognition = new webkitSpeechRecognition();
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    recognition.lang = 'fr-FR';
                    
                    recognition.onstart = function() {
                        newVoiceSearchBtn.classList.add('listening');
                    };
                    
                    recognition.onresult = function(event) {
                        const transcript = event.results[0][0].transcript;
                        newSearchInput.value = transcript;
                        
                        // Show search results
                        showSearchResults();
                    };
                    
                    recognition.onend = function() {
                        newVoiceSearchBtn.classList.remove('listening');
                    };
                    
                    recognition.start();
                }
            });
        }
        
        // Add event listeners to search tags
        const newSearchTags = searchContainer.querySelectorAll('.search-tag');
        newSearchTags.forEach(tag => {
            tag.addEventListener('click', function() {
                newSearchInput.value = this.textContent;
                showSearchResults();
            });
        });
    }
}

// Show search results
function showSearchResults() {
    // Check if search results container exists
    let searchResults = document.getElementById('searchResults');
    
    // If not, create it
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.id = 'searchResults';
        searchResults.className = 'search-results';
        
        // Add sample results
        searchResults.innerHTML = `
            <div class="search-result-item">
                <h4 class="search-result-title">Développement d'une application mobile pour la gestion des stocks</h4>
                <div class="search-result-info">
                    <span><i class="fas fa-user-graduate"></i> Ahmed Ben Ali</span>
                    <span><i class="fas fa-user-tie"></i> Dr. Kamel Hamrouni</span>
                    <span><i class="fas fa-calendar-alt"></i> 15/06/2025</span>
                </div>
                <p class="search-result-description">
                    Ce projet vise à développer une application mobile pour la gestion des stocks en utilisant React Native et Firebase.
                </p>
                <div class="search-result-tags">
                    <div class="search-result-tag">Mobile</div>
                    <div class="search-result-tag">React Native</div>
                    <div class="search-result-tag">Firebase</div>
                </div>
            </div>
            
            <div class="search-result-item">
                <h4 class="search-result-title">Implémentation d'un système de recommandation basé sur l'IA</h4>
                <div class="search-result-info">
                    <span><i class="fas fa-user-graduate"></i> Sarra Mejri</span>
                    <span><i class="fas fa-user-tie"></i> Dr. Sana Fakhfakh</span>
                    <span><i class="fas fa-calendar-alt"></i> 15/06/2025</span>
                </div>
                <p class="search-result-description">
                    Ce projet consiste à implémenter un système de recommandation basé sur l'intelligence artificielle pour une plateforme e-commerce.
                </p>
                <div class="search-result-tags">
                    <div class="search-result-tag">Intelligence artificielle</div>
                    <div class="search-result-tag">Machine Learning</div>
                    <div class="search-result-tag">Python</div>
                </div>
            </div>
            
            <div class="search-result-item">
                <h4 class="search-result-title">Conception d'un réseau de neurones pour la détection d'objets</h4>
                <div class="search-result-info">
                    <span><i class="fas fa-user-graduate"></i> Mohamed Trabelsi</span>
                    <span><i class="fas fa-user-tie"></i> Dr. Nabil Tabbane</span>
                    <span><i class="fas fa-calendar-alt"></i> 16/06/2025</span>
                </div>
                <p class="search-result-description">
                    Ce projet porte sur la conception et l'implémentation d'un réseau de neurones pour la détection d'objets en temps réel.
                </p>
                <div class="search-result-tags">
                    <div class="search-result-tag">Intelligence artificielle</div>
                    <div class="search-result-tag">Deep Learning</div>
                    <div class="search-result-tag">Computer Vision</div>
                </div>
            </div>
        `;
        
        // Add to search container
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.appendChild(searchResults);
        }
    }
    
    // Show search results
    searchResults.style.display = 'block';
    
    // Show notification
    showNotification({
        title: 'Recherche effectuée',
        body: 'Résultats de recherche affichés',
        type: 'info'
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add laptop element to search section
    setTimeout(addLaptopElement, 500);
    
    // Replace default buttons with sparkle buttons
    replaceWithSparkleButtons();
});

// Replace default buttons with sparkle buttons
function replaceWithSparkleButtons() {
    // Find buttons to replace
    const buttons = document.querySelectorAll('.btn-decouvrir, .btn-en-savoir-plus');
    
    buttons.forEach(button => {
        // Get button text
        const buttonText = button.textContent.trim();
        
        // Create sparkle button
        const sparkleButton = document.createElement('button');
        sparkleButton.className = 'button';
        sparkleButton.innerHTML = `
            <div class="dots_border"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="sparkle">
                <path class="path" stroke-linejoin="round" stroke-linecap="round" stroke="black" fill="black" d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"></path>
                <path class="path" stroke-linejoin="round" stroke-linecap="round" stroke="black" fill="black" d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"></path>
                <path class="path" stroke-linejoin="round" stroke-linecap="round" stroke="black" fill="black" d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"></path>
            </svg>
            <span class="text_button">${buttonText}</span>
        `;
        
        // Replace original button
        button.parentNode.replaceChild(sparkleButton, button);
        
        // Copy event listeners (simplified)
        if (button.onclick) {
            sparkleButton.onclick = button.onclick;
        }
        
        // Copy href if button was a link
        if (button.tagName === 'A' && button.href) {
            sparkleButton.addEventListener('click', function() {
                window.location.href = button.href;
            });
        }
    });
}

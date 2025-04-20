/**
 * Advanced AI Chatbot for PFE Management Platform
 * Features:
 * - Sophisticated animations and transitions
 * - Intelligent response system with context awareness
 * - Theme support (light/dark)
 * - Voice input and text-to-speech
 * - Quick suggestions and guided conversations
 * - Comprehensive knowledge base for PFE-related queries
 */

// Chatbot Knowledge Base
const pfeKnowledgeBase = {
    general: {
        about: `<b>PFE Platform</b> est un système de gestion complet pour les Projets de Fin d'Études 🎓

🔹 <b>Objectif:</b> Simplifier la gestion des PFE pour les départements et les enseignants
🔹 <b>Fonctionnalités:</b> Import Excel, gestion des jurys, planification des soutenances
🔹 <b>Utilisateurs:</b> Administrateurs, chefs de département, enseignants
🔹 <b>Avantages:</b> Gain de temps, réduction des erreurs, meilleure organisation

Notre plateforme transforme la gestion des PFE en un processus fluide et efficace! 🚀`,

        features: `<b>Fonctionnalités principales de la plateforme PFE:</b> ✨

1. <b>Import Excel</b> - Importation et validation des données PFE
2. <b>Gestion des Jurys</b> - Attribution automatique selon la règle des 3x
3. <b>Planification</b> - Organisation des soutenances avec calendrier interactif
4. <b>Tableaux de bord</b> - Visualisation des statistiques et de l'avancement
5. <b>Notifications</b> - Alertes pour les événements importants

Tout ce dont vous avez besoin pour gérer efficacement les PFE! 💯`,

        benefits: `<b>Avantages de notre plateforme PFE:</b> 🌟

• <b>Efficacité</b> - Automatisation des tâches répétitives
• <b>Précision</b> - Réduction des erreurs humaines
• <b>Transparence</b> - Visibilité complète du processus
• <b>Accessibilité</b> - Interface intuitive et responsive
• <b>Collaboration</b> - Facilite la communication entre les parties prenantes

Une solution complète pour transformer votre gestion des PFE! 🏆`
    },

    users: {
        admin: `<b>Rôle de l'Administrateur:</b> 👨‍💼

1. <b>Gestion des utilisateurs</b> - Création et modification des comptes
2. <b>Gestion des départements</b> - Configuration des départements
3. <b>Supervision globale</b> - Surveillance de toutes les activités
4. <b>Paramètres système</b> - Configuration de la plateforme
5. <b>Support technique</b> - Assistance aux utilisateurs

L'administrateur a un accès complet à toutes les fonctionnalités! 🔑`,

        department: `<b>Rôle du Chef de Département:</b> 👩‍🏫

1. <b>Import des données PFE</b> - Chargement des fichiers Excel
2. <b>Gestion des enseignants</b> - Attribution des encadrants
3. <b>Planification des soutenances</b> - Organisation du calendrier
4. <b>Gestion des jurys</b> - Composition des jurys d'évaluation
5. <b>Suivi des PFE</b> - Surveillance de l'avancement des projets

Le chef de département gère tout le processus PFE de son département! 📊`,

        teacher: `<b>Rôle de l'Enseignant:</b> 👨‍🏫

1. <b>Encadrement</b> - Suivi des étudiants assignés
2. <b>Participation aux jurys</b> - Évaluation des soutenances
3. <b>Disponibilités</b> - Indication des créneaux disponibles
4. <b>Notifications</b> - Réception des alertes de planification
5. <b>Évaluation</b> - Attribution des notes aux étudiants

Les enseignants peuvent facilement gérer leurs responsabilités PFE! 📝`
    },

    excel: {
        import: `<b>Processus d'importation Excel:</b> 📊

1. <b>Préparation</b> - Organisez votre fichier Excel avec les colonnes requises
2. <b>Téléchargement</b> - Glissez-déposez ou sélectionnez votre fichier
3. <b>Mappage</b> - Associez les colonnes Excel aux champs de la plateforme
4. <b>Validation</b> - Vérifiez et corrigez les erreurs potentielles
5. <b>Importation</b> - Finalisez le processus d'importation

Notre assistant d'importation vous guide à chaque étape! 🧙‍♂️`,

        format: `<b>Format du fichier Excel:</b> 📋

Les colonnes requises sont:
• <b>ID_PROJECT</b> - Identifiant unique du projet
• <b>Étudiant</b> - Nom complet de l'étudiant
• <b>Email</b> - Adresse email de l'étudiant
• <b>Titre PFE</b> - Intitulé du projet
• <b>Encadrant</b> - Nom de l'enseignant encadrant

Colonnes recommandées (optionnelles):
• Président Jury
• Rapporteur
• Date/Heure
• Salle

Formats acceptés: .xlsx, .xls (max 10MB) 📁`,

        tips: `<b>Conseils pour l'importation Excel:</b> 💡

• Vérifiez l'exactitude des données avant l'importation
• Utilisez des en-têtes clairs et descriptifs
• Évitez les cellules fusionnées ou les formules complexes
• Assurez-vous que les emails sont au format valide
• Préparez les données dans un format tabulaire simple

Ces bonnes pratiques garantissent une importation réussie! ✅`
    },

    jury: {
        assignment: `<b>Attribution des jurys:</b> 👥

Notre système attribue automatiquement les jurys selon la règle des 3x:
• Chaque enseignant participe à 3 fois plus de soutenances qu'il n'encadre de projets
• Équilibre de la charge entre les enseignants
• Respect des contraintes de disponibilité
• Évitement des conflits d'intérêt

L'algorithme optimise les attributions pour une répartition équitable! ⚖️`,

        composition: `<b>Composition d'un jury:</b> 🧑‍⚖️

Chaque jury est composé de:
1. <b>Président</b> - Supervise la soutenance
2. <b>Rapporteur</b> - Évalue le rapport écrit
3. <b>Encadrant</b> - Suit le projet depuis le début

Tous les membres évaluent la présentation et posent des questions.
Le système s'assure que chaque jury est complet et équilibré! 👍`,

        management: `<b>Gestion des jurys:</b> 📝

1. <b>Création automatique</b> - Génération initiale par l'algorithme
2. <b>Ajustement manuel</b> - Possibilité de modifications si nécessaire
3. <b>Validation</b> - Confirmation des compositions finales
4. <b>Notification</b> - Information des enseignants concernés
5. <b>Suivi</b> - Tableau de bord des attributions

Une gestion flexible et efficace des jurys d'évaluation! 🎯`
    },

    calendar: {
        sessions: `<b>Sessions de soutenance:</b> 🕒

Notre plateforme utilise 6 créneaux horaires standards:
• <b>S1:</b> 08H30 - 10H00
• <b>S2:</b> 10H10 - 11H40
• <b>S3:</b> 11H50 - 13H20
• <b>S4:</b> 13H50 - 15H20
• <b>S5:</b> 15H30 - 17H00
• <b>S6:</b> 17H10 - 18H40

Ces créneaux optimisent l'organisation des soutenances sur la journée! ⏱️`,

        planning: `<b>Planification des soutenances:</b> 📅

1. <b>Définition de la période</b> - Dates des soutenances
2. <b>Allocation des salles</b> - Attribution des espaces disponibles
3. <b>Programmation des créneaux</b> - Selon disponibilités des jurys
4. <b>Résolution des conflits</b> - Gestion des chevauchements
5. <b>Publication du calendrier</b> - Diffusion aux parties prenantes

Notre calendrier interactif facilite la visualisation et la gestion! 🗓️`,

        conflicts: `<b>Gestion des conflits d'horaire:</b> ⚠️

Le système détecte automatiquement:
• Enseignants programmés dans deux jurys simultanément
• Salles réservées pour plusieurs soutenances
• Créneaux en dehors des heures disponibles
• Temps insuffisant entre deux soutenances

Des alertes vous aident à résoudre ces conflits rapidement! 🚨`
    },

    statistics: {
        dashboard: `<b>Tableau de bord statistique:</b> 📊

Visualisez en temps réel:
• Nombre total de PFE par département
• Répartition des projets par encadrant
• Taux de participation aux jurys
• Occupation des salles
• Progression des soutenances

Des graphiques interactifs pour une vision claire de la situation! 📈`,

        reports: `<b>Rapports disponibles:</b> 📑

1. <b>Synthèse départementale</b> - Vue d'ensemble par département
2. <b>Charge enseignante</b> - Encadrement et jurys par enseignant
3. <b>Planification</b> - Calendrier complet des soutenances
4. <b>Utilisation des salles</b> - Taux d'occupation des espaces
5. <b>Évaluation</b> - Statistiques des notes attribuées

Exportez ces rapports en PDF ou Excel pour vos archives! 💾`,

        insights: `<b>Analyses et tendances:</b> 🔍

Notre plateforme vous aide à identifier:
• Les sujets de PFE les plus populaires
• Les encadrants les plus sollicités
• Les périodes de forte activité
• Les salles les plus utilisées
• Les tendances d'évaluation

Ces insights vous aident à améliorer le processus PFE année après année! 📊`
    },

    troubleshooting: {
        excel: `<b>Problèmes d'importation Excel:</b> 🛠️

Solutions aux problèmes courants:
• <b>Fichier non reconnu</b> - Vérifiez le format (.xlsx ou .xls)
• <b>Erreurs de mappage</b> - Assurez-vous que les en-têtes sont corrects
• <b>Données invalides</b> - Corrigez les erreurs signalées en rouge
• <b>Fichier trop volumineux</b> - Limitez à 10MB maximum
• <b>Timeout</b> - Divisez les grands fichiers en plusieurs parties

Contactez l'administrateur si le problème persiste! 🆘`,

        access: `<b>Problèmes d'accès:</b> 🔒

Si vous rencontrez des difficultés de connexion:
• Vérifiez vos identifiants (email/mot de passe)
• Assurez-vous que votre compte est activé
• Effacez le cache de votre navigateur
• Utilisez un navigateur récent (Chrome, Firefox, Edge)
• Vérifiez votre connexion internet

La fonction "Mot de passe oublié" peut vous aider à réinitialiser votre accès! 🔑`,

        planning: `<b>Problèmes de planification:</b> 📅

Solutions pour les difficultés de calendrier:
• <b>Conflits d'horaire</b> - Utilisez la détection automatique
• <b>Enseignant indisponible</b> - Mettez à jour les disponibilités
• <b>Salle occupée</b> - Vérifiez le planning des salles
• <b>Chevauchements</b> - Ajustez les créneaux manuellement
• <b>Notifications manquantes</b> - Vérifiez les paramètres d'alerte

Notre système vous aide à identifier et résoudre ces problèmes! 🔧`
    }
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

// Chatbot initialization
function initChatbot() {
    // DOM elements
    const chatToggle = document.getElementById('chatbotToggle');
    const chatWidget = document.getElementById('chatbotContainer');
    const chatClose = document.getElementById('chatbotClose');
    const chatBody = document.getElementById('chatbotBody');
    const chatInput = document.getElementById('chatbotInput');
    const chatSend = document.getElementById('chatbotSend');
    const voiceButton = document.getElementById('chatbotVoice');
    const themeToggle = document.getElementById('themeToggle');

    // Toggle chatbot visibility
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.add('active');
            chatToggle.style.display = 'none';
            
            // Add entrance animation
            chatWidget.style.animation = 'chatbotEnter 0.5s forwards';
            
            // Focus on input after animation
            setTimeout(() => {
                chatInput.focus();
            }, 500);
        });
    }

    // Close chatbot
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            // Add exit animation
            chatWidget.style.animation = 'chatbotExit 0.5s forwards';
            
            // Remove active class and show toggle after animation
            setTimeout(() => {
                chatWidget.classList.remove('active');
                chatToggle.style.display = 'flex';
            }, 500);
        });
    }

    // Send message on button click
    if (chatSend) {
        chatSend.addEventListener('click', () => {
            sendMessage();
        });
    }

    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Add input animation
        chatInput.addEventListener('focus', () => {
            chatInput.parentElement.classList.add('focused');
        });

        chatInput.addEventListener('blur', () => {
            if (chatInput.value.length === 0) {
                chatInput.parentElement.classList.remove('focused');
            }
        });
    }

    // Voice input
    if (voiceButton && 'webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'fr-FR';
        
        voiceButton.addEventListener('click', () => {
            recognition.start();
            voiceButton.classList.add('listening');
            
            // Add pulsing animation
            voiceButton.style.animation = 'pulse 1.5s infinite';
        });
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            voiceButton.classList.remove('listening');
            voiceButton.style.animation = '';
            
            // Trigger send after a short delay
            setTimeout(() => {
                sendMessage();
            }, 500);
        };
        
        recognition.onend = () => {
            voiceButton.classList.remove('listening');
            voiceButton.style.animation = '';
        };
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            
            // Update icon with animation
            themeToggle.style.animation = 'rotate 0.5s forwards';
            setTimeout(() => {
                themeToggle.innerHTML = isDark
                    ? '<i class="fas fa-moon"></i>'
                    : '<i class="fas fa-sun"></i>';
                themeToggle.style.animation = '';
            }, 250);
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    // Add initial welcome message
    addMessage(generateWelcomeMessage(), false);

    // Add event listeners to initial quick suggestions
    document.querySelectorAll('.chatbot-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', handleSuggestion);
    });
}

// Send message function
function sendMessage() {
    const chatInput = document.getElementById('chatbotInput');
    const message = chatInput.value.trim();
    
    if (message.length === 0) return;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input
    chatInput.value = '';
    
    // Generate and add response
    const response = generateResponse(message);
    addMessage(response, false);
}

// Add message to chat with animations
function addMessage(message, isUser = false) {
    const chatBody = document.getElementById('chatbotBody');
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
    
    if (isUser) {
        // User message - simple display
        messageDiv.textContent = message;
        messageDiv.style.animation = 'messageSlideIn 0.3s forwards';
        chatBody.appendChild(messageDiv);
    } else {
        // Bot message - typing indicator first
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatBody.appendChild(typingIndicator);
        
        // Scroll to see typing indicator
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Simulate typing delay based on message length
        const typingDelay = Math.min(1000, Math.max(500, message.length * 10));
        
        setTimeout(() => {
            // Remove typing indicator
            chatBody.removeChild(typingIndicator);
            
            // Create message container for typewriter effect
            const messageContainer = document.createElement('div');
            messageDiv.appendChild(messageContainer);
            chatBody.appendChild(messageDiv);
            
            // Format message for HTML
            const formattedMessage = message.replace(/\n/g, '<br>');
            
            // Typewriter effect
            let i = 0;
            const speed = 10; // typing speed
            messageDiv.style.animation = 'messageSlideIn 0.3s forwards';
            
            function typeWriter() {
                if (i < formattedMessage.length) {
                    // Handle HTML tags properly
                    if (formattedMessage.substring(i).startsWith('<b>')) {
                        const endTagIndex = formattedMessage.indexOf('</b>', i);
                        if (endTagIndex !== -1) {
                            messageContainer.innerHTML += formattedMessage.substring(i, endTagIndex + 4);
                            i = endTagIndex + 4;
                        } else {
                            messageContainer.innerHTML += formattedMessage.charAt(i);
                            i++;
                        }
                    } else if (formattedMessage.substring(i).startsWith('<br>')) {
                        messageContainer.innerHTML += '<br>';
                        i += 4;
                    } else {
                        messageContainer.innerHTML += formattedMessage.charAt(i);
                        i++;
                    }
                    
                    // Continue typing
                    setTimeout(typeWriter, speed);
                } else {
                    // Typing complete, add suggestions if appropriate
                    if (message.includes('?') || message.includes('Voici') || message.includes('aide')) {
                        addSuggestions(messageDiv);
                    }
                    
                    // Add text-to-speech button for accessibility
                    addTextToSpeechButton(messageDiv, message);
                }
                
                // Scroll to bottom during typing
                chatBody.scrollTop = chatBody.scrollHeight;
            }
            
            // Start typewriter effect
            typeWriter();
            
        }, typingDelay);
    }
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Add quick suggestions to bot message
function addSuggestions(messageDiv) {
    // Create suggestions container
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'chatbot-suggestions';
    
    // Add relevant suggestions based on context
    // This could be more sophisticated with context awareness
    const suggestions = [
        { text: 'Import Excel', query: 'Comment importer un fichier Excel?' },
        { text: 'Gestion des jurys', query: 'Comment fonctionne l\'attribution des jurys?' },
        { text: 'Sessions de soutenance', query: 'Quels sont les créneaux horaires disponibles?' },
        { text: 'Aide', query: 'J\'ai besoin d\'aide' }
    ];
    
    // Create suggestion elements with animation delay
    suggestions.forEach((suggestion, index) => {
        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'chatbot-suggestion';
        suggestionEl.textContent = suggestion.text;
        suggestionEl.setAttribute('data-query', suggestion.query);
        suggestionEl.style.animationDelay = `${index * 0.1}s`;
        
        // Add click event
        suggestionEl.addEventListener('click', handleSuggestion);
        
        suggestionsDiv.appendChild(suggestionEl);
    });
    
    // Add suggestions to message
    messageDiv.appendChild(suggestionsDiv);
}

// Handle suggestion click
function handleSuggestion(e) {
    const query = e.target.getAttribute('data-query');
    const chatInput = document.getElementById('chatbotInput');
    
    // Set input value to suggestion
    chatInput.value = query;
    
    // Trigger send
    sendMessage();
}

// Add text-to-speech button for accessibility
function addTextToSpeechButton(messageDiv, message) {
    // Only add if speech synthesis is available
    if ('speechSynthesis' in window) {
        const speakButton = document.createElement('button');
        speakButton.className = 'speak-button';
        speakButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        speakButton.title = 'Écouter ce message';
        
        // Clean message for speech (remove HTML tags)
        const cleanMessage = message.replace(/<[^>]*>/g, '');
        
        speakButton.addEventListener('click', () => {
            // Create utterance
            const utterance = new SpeechSynthesisUtterance(cleanMessage);
            utterance.lang = 'fr-FR';
            
            // Add animation while speaking
            speakButton.classList.add('speaking');
            
            // Handle end of speech
            utterance.onend = () => {
                speakButton.classList.remove('speaking');
            };
            
            // Speak
            window.speechSynthesis.speak(utterance);
        });
        
        messageDiv.appendChild(speakButton);
    }
}

// Generate welcome message
function generateWelcomeMessage() {
    // Get time of day for personalized greeting
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Bonjour';
    } else if (hour < 18) {
        greeting = 'Bon après-midi';
    } else {
        greeting = 'Bonsoir';
    }
    
    return `${greeting} ! 👋 Je suis l'assistant virtuel de la plateforme PFE.

Je peux vous aider avec:
• L'importation de fichiers Excel 📊
• La gestion des jurys et des soutenances 👥
• La planification du calendrier 📅
• Les statistiques et rapports 📈
• Et bien plus encore!

Comment puis-je vous aider aujourd'hui?`;
}

// Generate response based on user input
function generateResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Track conversation context for more natural responses
    if (!window.chatbotContext) {
        window.chatbotContext = {
            lastTopic: null,
            mentionedTopics: new Set(),
            questionCount: 0
        };
    }
    
    // Increment question counter
    window.chatbotContext.questionCount++;
    
    // Check for greetings
    if (/^(bonjour|salut|hello|hi|hey|coucou|bonsoir)/i.test(lowerMessage)) {
        return generateWelcomeMessage();
    }
    
    // Check for thanks
    if (/merci|thanks|thank you|je vous remercie/i.test(lowerMessage)) {
        return `Je vous en prie! 😊 C'est un plaisir de vous aider.

Avez-vous d'autres questions sur la plateforme PFE?`;
    }
    
    // Check for goodbye
    if (/au revoir|bye|à bientôt|adieu|à plus tard/i.test(lowerMessage)) {
        return `Au revoir! 👋 N'hésitez pas à revenir si vous avez d'autres questions sur la plateforme PFE.

Bonne journée!`;
    }
    
    // About the platform
    if (/plateforme|système|outil|application|à propos|about|qu['e]est.ce que/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'about';
        window.chatbotContext.mentionedTopics.add('about');
        return pfeKnowledgeBase.general.about;
    }
    
    // Features
    if (/fonctionnalit[ée]s|features|capacit[ée]s|peut faire|permet de faire/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'features';
        window.chatbotContext.mentionedTopics.add('features');
        return pfeKnowledgeBase.general.features;
    }
    
    // Benefits
    if (/avantages|b[ée]n[ée]fices|int[ée]r[êe]ts|pourquoi utiliser|benefits/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'benefits';
        window.chatbotContext.mentionedTopics.add('benefits');
        return pfeKnowledgeBase.general.benefits;
    }
    
    // Admin role
    if (/admin|administrateur|r[ôo]le.*admin|admin.*fait|admin.*r[ôo]le/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'admin';
        window.chatbotContext.mentionedTopics.add('admin');
        return pfeKnowledgeBase.users.admin;
    }
    
    // Department head role
    if (/chef|d[ée]partement|r[ôo]le.*chef|chef.*fait|chef.*r[ôo]le|head/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'department';
        window.chatbotContext.mentionedTopics.add('department');
        return pfeKnowledgeBase.users.department;
    }
    
    // Teacher role
    if (/enseignant|prof|professeur|r[ôo]le.*enseignant|enseignant.*fait|teacher/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'teacher';
        window.chatbotContext.mentionedTopics.add('teacher');
        return pfeKnowledgeBase.users.teacher;
    }
    
    // Excel import
    if (/import|excel|fichier|upload|t[ée]l[ée]charg|importer/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'excel';
        window.chatbotContext.mentionedTopics.add('excel');
        return pfeKnowledgeBase.excel.import;
    }
    
    // Excel format
    if (/format|structure|colonnes|champs|donn[ée]es|fichier/i.test(lowerMessage) && 
        /excel|xls|xlsx/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'excel_format';
        window.chatbotContext.mentionedTopics.add('excel_format');
        return pfeKnowledgeBase.excel.format;
    }
    
    // Excel tips
    if (/conseils|tips|astuces|recommandations|best practices/i.test(lowerMessage) && 
        /excel|import|fichier/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'excel_tips';
        window.chatbotContext.mentionedTopics.add('excel_tips');
        return pfeKnowledgeBase.excel.tips;
    }
    
    // Jury assignment
    if (/jury|attribution|assign|affect|r[èe]gle des 3x|trois fois/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'jury_assignment';
        window.chatbotContext.mentionedTopics.add('jury_assignment');
        return pfeKnowledgeBase.jury.assignment;
    }
    
    // Jury composition
    if (/composition|membres|pr[ée]sident|rapporteur|encadrant/i.test(lowerMessage) && 
        /jury|commission/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'jury_composition';
        window.chatbotContext.mentionedTopics.add('jury_composition');
        return pfeKnowledgeBase.jury.composition;
    }
    
    // Jury management
    if (/gestion|management|g[ée]rer|organiser/i.test(lowerMessage) && 
        /jury|commission/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'jury_management';
        window.chatbotContext.mentionedTopics.add('jury_management');
        return pfeKnowledgeBase.jury.management;
    }
    
    // Calendar sessions
    if (/sessions|cr[ée]neaux|horaires|heures|s1|s2|s3|s4|s5|s6/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'calendar_sessions';
        window.chatbotContext.mentionedTopics.add('calendar_sessions');
        return pfeKnowledgeBase.calendar.sessions;
    }
    
    // Calendar planning
    if (/planning|planification|organiser|programmer|calendrier/i.test(lowerMessage) && 
        /soutenance|pr[ée]sentation|pfe/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'calendar_planning';
        window.chatbotContext.mentionedTopics.add('calendar_planning');
        return pfeKnowledgeBase.calendar.planning;
    }
    
    // Calendar conflicts
    if (/conflit|chevauchement|collision|probl[èe]me/i.test(lowerMessage) && 
        /horaire|planning|calendrier|soutenance/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'calendar_conflicts';
        window.chatbotContext.mentionedTopics.add('calendar_conflicts');
        return pfeKnowledgeBase.calendar.conflicts;
    }
    
    // Statistics dashboard
    if (/tableau|dashboard|statistiques|stats|graphiques|charts/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'statistics_dashboard';
        window.chatbotContext.mentionedTopics.add('statistics_dashboard');
        return pfeKnowledgeBase.statistics.dashboard;
    }
    
    // Statistics reports
    if (/rapport|report|export|pdf|excel/i.test(lowerMessage) && 
        /statistiques|donn[ée]es|information/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'statistics_reports';
        window.chatbotContext.mentionedTopics.add('statistics_reports');
        return pfeKnowledgeBase.statistics.reports;
    }
    
    // Statistics insights
    if (/analyse|tendance|trend|insight|comprendre/i.test(lowerMessage) && 
        /donn[ée]es|statistiques|information/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'statistics_insights';
        window.chatbotContext.mentionedTopics.add('statistics_insights');
        return pfeKnowledgeBase.statistics.insights;
    }
    
    // Troubleshooting excel
    if (/probl[èe]me|erreur|difficult[ée]|bug|ne fonctionne pas/i.test(lowerMessage) && 
        /excel|import|fichier/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'troubleshooting_excel';
        window.chatbotContext.mentionedTopics.add('troubleshooting_excel');
        return pfeKnowledgeBase.troubleshooting.excel;
    }
    
    // Troubleshooting access
    if (/probl[èe]me|erreur|difficult[ée]|bug|ne fonctionne pas/i.test(lowerMessage) && 
        /acc[èe]s|connexion|login|authentification/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'troubleshooting_access';
        window.chatbotContext.mentionedTopics.add('troubleshooting_access');
        return pfeKnowledgeBase.troubleshooting.access;
    }
    
    // Troubleshooting planning
    if (/probl[èe]me|erreur|difficult[ée]|bug|ne fonctionne pas/i.test(lowerMessage) && 
        /planning|calendrier|horaire|soutenance/i.test(lowerMessage)) {
        window.chatbotContext.lastTopic = 'troubleshooting_planning';
        window.chatbotContext.mentionedTopics.add('troubleshooting_planning');
        return pfeKnowledgeBase.troubleshooting.planning;
    }
    
    // Help request
    if (/aide|help|besoin d'aide|assistance|support/i.test(lowerMessage)) {
        return `Je suis là pour vous aider! 🤗 Voici les principaux sujets sur lesquels je peux vous renseigner:

1. <b>Informations générales</b> sur la plateforme PFE
2. <b>Rôles des utilisateurs</b> (admin, chef de département, enseignant)
3. <b>Importation Excel</b> et gestion des données
4. <b>Attribution des jurys</b> et règle des 3x
5. <b>Planification des soutenances</b> et gestion du calendrier
6. <b>Statistiques et rapports</b> disponibles
7. <b>Résolution des problèmes</b> courants

Sur quel sujet puis-je vous donner plus d'informations?`;
    }
    
    // If no specific match, use context for more natural conversation
    if (window.chatbotContext.lastTopic) {
        // Follow-up based on last topic
        const lastTopic = window.chatbotContext.lastTopic;
        
        if (lastTopic === 'about' || lastTopic === 'features' || lastTopic === 'benefits') {
            return pfeKnowledgeBase.general.features;
        }
        
        if (lastTopic.startsWith('excel')) {
            return pfeKnowledgeBase.excel.tips;
        }
        
        if (lastTopic.startsWith('jury')) {
            return pfeKnowledgeBase.jury.composition;
        }
        
        if (lastTopic.startsWith('calendar')) {
            return pfeKnowledgeBase.calendar.planning;
        }
        
        if (lastTopic.startsWith('statistics')) {
            return pfeKnowledgeBase.statistics.reports;
        }
        
        if (lastTopic.startsWith('troubleshooting')) {
            return `Avez-vous essayé de rafraîchir la page ou de vous déconnecter puis reconnecter? Ces actions résolvent souvent les problèmes les plus courants.

Si le problème persiste, n'hésitez pas à contacter l'administrateur système via le formulaire de contact.`;
        }
    }
    
    // Default response if no match and no context
    return `Je ne suis pas sûr de comprendre votre question. 🤔

Voici les sujets sur lesquels je peux vous aider:
• Fonctionnalités de la plateforme PFE
• Importation et gestion des données Excel
• Attribution et gestion des jurys
• Planification des soutenances
• Statistiques et rapports
• Résolution des problèmes courants

Pourriez-vous reformuler votre question ou choisir l'un de ces sujets?`;
}

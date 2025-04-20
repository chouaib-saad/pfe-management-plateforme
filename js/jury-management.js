// Jury Management CRUD Operations
// This script handles the complete CRUD functionality for jury management

// Global variables
let juryData = [];
let currentJuryId = null;
let currentPage = 1;
const itemsPerPage = 10;

// Initialize the jury management system
function initJuryManagement() {
    // Load jury data from storage or API
    loadJuryData();
    
    // Set up event listeners
    document.getElementById('createJuryBtn').addEventListener('click', showCreateJuryModal);
    document.getElementById('saveJuryBtn').addEventListener('click', saveJury);
    document.getElementById('cancelJuryBtn').addEventListener('click', closeJuryModal);
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeleteJury);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('searchJury').addEventListener('input', searchJuries);
    document.getElementById('juryStatusFilter').addEventListener('change', filterJuries);
    document.getElementById('juryDateFilter').addEventListener('change', filterJuries);
    
    // Initialize tooltips and popovers
    initializeTooltips();
    
    // Set up auto-assignment functionality
    document.getElementById('autoAssignBtn').addEventListener('click', showAutoAssignModal);
    document.getElementById('confirmAutoAssignBtn').addEventListener('click', performAutoAssignment);
    document.getElementById('cancelAutoAssignBtn').addEventListener('click', closeAutoAssignModal);
    
    // Set up batch operations
    document.getElementById('selectAllJuries').addEventListener('change', toggleSelectAllJuries);
    document.getElementById('batchDeleteBtn').addEventListener('click', showBatchDeleteModal);
    document.getElementById('confirmBatchDeleteBtn').addEventListener('click', performBatchDelete);
    document.getElementById('cancelBatchDeleteBtn').addEventListener('click', closeBatchDeleteModal);
    
    // Set up drag and drop for jury members
    setupDragAndDrop();
}

// Load jury data from storage or API
function loadJuryData() {
    // For demo purposes, we'll check localStorage first
    const storedData = localStorage.getItem('juryData');
    
    if (storedData) {
        juryData = JSON.parse(storedData);
    } else {
        // If no stored data, use sample data
        juryData = generateSampleJuryData();
        // Save to localStorage
        localStorage.setItem('juryData', JSON.stringify(juryData));
    }
    
    // Render the jury table
    renderJuryTable();
}

// Generate sample jury data for demonstration
function generateSampleJuryData() {
    const sampleData = [];
    
    // Get imported PFE data if available
    const pfeData = localStorage.getItem('importedPfeData');
    let projects = [];
    
    if (pfeData) {
        projects = JSON.parse(pfeData);
    } else {
        // Sample projects if no imported data
        projects = [
            { 'ID_PROJECT': 'PFE-2025-001', 'Étudiant': 'Ahmed Ben Ali', 'Titre PFE': 'Développement d\'une application mobile pour la gestion des stocks', 'Encadrant': 'Dr. Kamel Hamrouni', 'Date': '2025-06-15', 'Session': 'S1 (08H30-10H00)', 'Salle': 'A104' },
            { 'ID_PROJECT': 'PFE-2025-002', 'Étudiant': 'Sarra Mejri', 'Titre PFE': 'Implémentation d\'un système de recommandation basé sur l\'IA', 'Encadrant': 'Dr. Sana Fakhfakh', 'Date': '2025-06-15', 'Session': 'S2 (10H10-11H40)', 'Salle': 'A104' },
            { 'ID_PROJECT': 'PFE-2025-003', 'Étudiant': 'Mohamed Trabelsi', 'Titre PFE': 'Conception d\'un réseau de neurones pour la détection d\'objets', 'Encadrant': 'Dr. Nabil Tabbane', 'Date': '2025-06-16', 'Session': 'S1 (08H30-10H00)', 'Salle': 'B205' },
            { 'ID_PROJECT': 'PFE-2025-004', 'Étudiant': 'Ines Khelifi', 'Titre PFE': 'Développement d\'une plateforme e-learning avec React', 'Encadrant': 'Dr. Lamia Ben Amor', 'Date': '2025-06-16', 'Session': 'S2 (10H10-11H40)', 'Salle': 'B205' },
            { 'ID_PROJECT': 'PFE-2025-005', 'Étudiant': 'Yassine Bouazizi', 'Titre PFE': 'Implémentation d\'un système de sécurité IoT', 'Encadrant': 'Dr. Faouzi Benzarti', 'Date': '2025-06-17', 'Session': 'S1 (08H30-10H00)', 'Salle': 'C306' }
        ];
    }
    
    // Create jury data from projects
    projects.forEach((project, index) => {
        // Generate jury members based on the 3x rule
        const president = getRandomTeacher(project['Encadrant']);
        const rapporteur = getRandomTeacher([project['Encadrant'], president]);
        
        sampleData.push({
            id: index + 1,
            projectId: project['ID_PROJECT'],
            student: project['Étudiant'],
            title: project['Titre PFE'],
            supervisor: project['Encadrant'],
            president: president,
            rapporteur: rapporteur,
            date: project['Date'],
            session: project['Session'],
            room: project['Salle'],
            status: getRandomStatus(),
            notes: '',
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
        });
    });
    
    return sampleData;
}

// Get a random teacher excluding those in the excludeList
function getRandomTeacher(excludeList) {
    const teachers = [
        'Dr. Kamel Hamrouni',
        'Dr. Sana Fakhfakh',
        'Dr. Nabil Tabbane',
        'Dr. Lamia Ben Amor',
        'Dr. Faouzi Benzarti',
        'Dr. Hanen Idoudi',
        'Dr. Lamia Chaari',
        'Dr. Mohamed Jmaiel',
        'Dr. Rim Haddad',
        'Dr. Sami Tabbane'
    ];
    
    // Filter out excluded teachers
    const availableTeachers = teachers.filter(teacher => 
        !Array.isArray(excludeList) 
            ? teacher !== excludeList 
            : !excludeList.includes(teacher)
    );
    
    // Return a random teacher from available ones
    return availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
}

// Get a random status for sample data
function getRandomStatus() {
    const statuses = ['Planifié', 'Confirmé', 'Terminé', 'Reporté'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Render the jury table with current data
function renderJuryTable() {
    const tableBody = document.getElementById('juryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Apply filters and search
    const filteredData = filterJuryData();
    
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    
    if (paginatedData.length === 0) {
        // No data message
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `
            <td colspan="8" class="text-center py-4">
                <div class="empty-state">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5>Aucun jury trouvé</h5>
                    <p class="text-muted">Aucun jury ne correspond à vos critères de recherche ou aucun jury n'a été créé.</p>
                    <button class="btn btn-primary mt-3" id="createFirstJuryBtn">
                        <i class="fas fa-plus"></i> Créer un jury
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(noDataRow);
        
        // Add event listener to the create button
        document.getElementById('createFirstJuryBtn').addEventListener('click', showCreateJuryModal);
    } else {
        // Render each jury row
        paginatedData.forEach(jury => {
            const row = document.createElement('tr');
            row.dataset.juryId = jury.id;
            
            row.innerHTML = `
                <td>
                    <label class="custom-checkbox">
                        <input type="checkbox" class="jury-checkbox" data-jury-id="${jury.id}">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="ms-3">
                            <div class="fw-bold">${jury.projectId}</div>
                            <div class="text-muted small">${jury.student}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="fw-medium text-truncate" style="max-width: 200px;" title="${jury.title}">${jury.title}</div>
                </td>
                <td>
                    <div class="jury-members">
                        <div class="jury-member">
                            <span class="jury-role">Encadrant:</span>
                            <span class="jury-name">${jury.supervisor}</span>
                        </div>
                        <div class="jury-member">
                            <span class="jury-role">Président:</span>
                            <span class="jury-name">${jury.president}</span>
                        </div>
                        <div class="jury-member">
                            <span class="jury-role">Rapporteur:</span>
                            <span class="jury-name">${jury.rapporteur}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-column">
                        <span>${formatDate(jury.date)}</span>
                        <span class="text-muted small">${jury.session}</span>
                        <span class="text-muted small">Salle: ${jury.room}</span>
                    </div>
                </td>
                <td>
                    <span class="badge ${getStatusBadgeClass(jury.status)}">${jury.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-icon-primary view-jury-btn" data-jury-id="${jury.id}" title="Voir les détails">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-icon-success edit-jury-btn" data-jury-id="${jury.id}" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-icon-danger delete-jury-btn" data-jury-id="${jury.id}" title="Supprimer">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to the buttons
        document.querySelectorAll('.view-jury-btn').forEach(btn => {
            btn.addEventListener('click', () => viewJury(btn.dataset.juryId));
        });
        
        document.querySelectorAll('.edit-jury-btn').forEach(btn => {
            btn.addEventListener('click', () => editJury(btn.dataset.juryId));
        });
        
        document.querySelectorAll('.delete-jury-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteJury(btn.dataset.juryId));
        });
    }
    
    // Update pagination
    updatePagination(filteredData.length);
    
    // Update jury count
    updateJuryCount(filteredData.length);
}

// Filter jury data based on search and filters
function filterJuryData() {
    const searchTerm = document.getElementById('searchJury').value.toLowerCase();
    const statusFilter = document.getElementById('juryStatusFilter').value;
    const dateFilter = document.getElementById('juryDateFilter').value;
    
    return juryData.filter(jury => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            jury.projectId.toLowerCase().includes(searchTerm) ||
            jury.student.toLowerCase().includes(searchTerm) ||
            jury.title.toLowerCase().includes(searchTerm) ||
            jury.supervisor.toLowerCase().includes(searchTerm) ||
            jury.president.toLowerCase().includes(searchTerm) ||
            jury.rapporteur.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = statusFilter === '' || jury.status === statusFilter;
        
        // Date filter
        let matchesDate = true;
        if (dateFilter !== '') {
            const today = new Date();
            const juryDate = new Date(jury.date);
            
            switch (dateFilter) {
                case 'today':
                    matchesDate = isSameDay(juryDate, today);
                    break;
                case 'tomorrow':
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    matchesDate = isSameDay(juryDate, tomorrow);
                    break;
                case 'thisWeek':
                    matchesDate = isInThisWeek(juryDate);
                    break;
                case 'nextWeek':
                    matchesDate = isInNextWeek(juryDate);
                    break;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
    });
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Check if a date is in the current week
function isInThisWeek(date) {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    const day = today.getDay() || 7; // Convert Sunday (0) to 7
    firstDayOfWeek.setDate(today.getDate() - day + 1); // Monday
    
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Sunday
    
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

// Check if a date is in the next week
function isInNextWeek(date) {
    const today = new Date();
    const firstDayOfNextWeek = new Date(today);
    const day = today.getDay() || 7; // Convert Sunday (0) to 7
    firstDayOfNextWeek.setDate(today.getDate() - day + 8); // Next Monday
    
    const lastDayOfNextWeek = new Date(firstDayOfNextWeek);
    lastDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 6); // Next Sunday
    
    return date >= firstDayOfNextWeek && date <= lastDayOfNextWeek;
}

// Update pagination controls
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('juryPagination');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('div');
    prevButton.className = `pagination-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    if (currentPage > 1) {
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderJuryTable();
        });
    }
    paginationContainer.appendChild(prevButton);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('div');
        pageButton.className = `pagination-item ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderJuryTable();
        });
        paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('div');
    nextButton.className = `pagination-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    if (currentPage < totalPages) {
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderJuryTable();
        });
    }
    paginationContainer.appendChild(nextButton);
}

// Update jury count display
function updateJuryCount(count) {
    const countElement = document.getElementById('juryCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Format date for display
function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

// Get badge class based on status
function getStatusBadgeClass(status) {
    switch (status) {
        case 'Planifié':
            return 'badge-info';
        case 'Confirmé':
            return 'badge-primary';
        case 'Terminé':
            return 'badge-success';
        case 'Reporté':
            return 'badge-warning';
        case 'Annulé':
            return 'badge-danger';
        default:
            return 'badge-secondary';
    }
}

// Show create jury modal
function showCreateJuryModal() {
    // Reset form
    document.getElementById('juryForm').reset();
    
    // Set modal title
    document.getElementById('juryModalTitle').textContent = 'Créer un nouveau jury';
    
    // Clear current jury ID
    currentJuryId = null;
    
    // Show modal
    document.getElementById('juryModal').classList.add('active');
    
    // Set date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('juryDate').value = today;
    
    // Populate project select
    populateProjectSelect();
    
    // Populate teacher selects
    populateTeacherSelects();
}

// Show edit jury modal
function editJury(juryId) {
    // Find jury by ID
    const jury = juryData.find(j => j.id == juryId);
    if (!jury) return;
    
    // Set current jury ID
    currentJuryId = juryId;
    
    // Set modal title
    document.getElementById('juryModalTitle').textContent = 'Modifier le jury';
    
    // Populate form with jury data
    document.getElementById('juryProjectId').value = jury.projectId;
    document.getElementById('juryStudent').value = jury.student;
    document.getElementById('juryTitle').value = jury.title;
    document.getElementById('jurySupervisor').value = jury.supervisor;
    document.getElementById('juryPresident').value = jury.president;
    document.getElementById('juryRapporteur').value = jury.rapporteur;
    document.getElementById('juryDate').value = jury.date;
    document.getElementById('jurySession').value = jury.session;
    document.getElementById('juryRoom').value = jury.room;
    document.getElementById('juryStatus').value = jury.status;
    document.getElementById('juryNotes').value = jury.notes || '';
    
    // Show modal
    document.getElementById('juryModal').classList.add('active');
}

// View jury details
function viewJury(juryId) {
    // Find jury by ID
    const jury = juryData.find(j => j.id == juryId);
    if (!jury) return;
    
    // Create and show the view modal
    const viewModal = document.createElement('div');
    viewModal.className = 'modal active';
    viewModal.id = 'viewJuryModal';
    
    viewModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Détails du jury</h3>
                <button class="modal-close" id="closeViewJuryModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="jury-detail-header">
                    <div class="jury-project-info">
                        <h4>${jury.projectId}</h4>
                        <div class="jury-project-title">${jury.title}</div>
                        <div class="jury-student-name">
                            <i class="fas fa-user-graduate"></i> ${jury.student}
                        </div>
                    </div>
                    <div class="jury-status">
                        <span class="badge ${getStatusBadgeClass(jury.status)}">${jury.status}</span>
                    </div>
                </div>
                
                <div class="jury-detail-section">
                    <h5>Membres du jury</h5>
                    <div class="jury-members-detail">
                        <div class="jury-member-card">
                            <div class="jury-member-role">Encadrant</div>
                            <div class="jury-member-avatar">${getInitials(jury.supervisor)}</div>
                            <div class="jury-member-name">${jury.supervisor}</div>
                        </div>
                        <div class="jury-member-card">
                            <div class="jury-member-role">Président</div>
                            <div class="jury-member-avatar">${getInitials(jury.president)}</div>
                            <div class="jury-member-name">${jury.president}</div>
                        </div>
                        <div class="jury-member-card">
                            <div class="jury-member-role">Rapporteur</div>
                            <div class="jury-member-avatar">${getInitials(jury.rapporteur)}</div>
                            <div class="jury-member-name">${jury.rapporteur}</div>
                        </div>
                    </div>
                </div>
                
                <div class="jury-detail-section">
                    <h5>Informations de la soutenance</h5>
                    <div class="jury-info-grid">
                        <div class="jury-info-item">
                            <div class="jury-info-label">Date</div>
                            <div class="jury-info-value">
                                <i class="fas fa-calendar-alt"></i> ${formatDate(jury.date)}
                            </div>
                        </div>
                        <div class="jury-info-item">
                            <div class="jury-info-label">Session</div>
                            <div class="jury-info-value">
                                <i class="fas fa-clock"></i> ${jury.session}
                            </div>
                        </div>
                        <div class="jury-info-item">
                            <div class="jury-info-label">Salle</div>
                            <div class="jury-info-value">
                                <i class="fas fa-door-open"></i> ${jury.room}
                            </div>
                        </div>
                    </div>
                </div>
                
                ${jury.notes ? `
                <div class="jury-detail-section">
                    <h5>Notes</h5>
                    <div class="jury-notes">
                        ${jury.notes}
                    </div>
                </div>
                ` : ''}
                
                <div class="jury-detail-section">
                    <h5>Historique</h5>
                    <div class="jury-history">
                        <div class="jury-history-item">
                            <div class="jury-history-icon">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <div class="jury-history-content">
                                <div class="jury-history-title">Création du jury</div>
                                <div class="jury-history-date">${formatDateTime(jury.created)}</div>
                            </div>
                        </div>
                        <div class="jury-history-item">
                            <div class="jury-history-icon">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="jury-history-content">
                                <div class="jury-history-title">Dernière modification</div>
                                <div class="jury-history-date">${formatDateTime(jury.lastModified)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-outline-secondary" id="closeViewBtn">Fermer</button>
                <button class="btn btn-primary" id="editFromViewBtn">
                    <i class="fas fa-edit"></i> Modifier
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(viewModal);
    
    // Add event listeners
    document.getElementById('closeViewJuryModal').addEventListener('click', () => {
        document.body.removeChild(viewModal);
    });
    
    document.getElementById('closeViewBtn').addEventListener('click', () => {
        document.body.removeChild(viewModal);
    });
    
    document.getElementById('editFromViewBtn').addEventListener('click', () => {
        document.body.removeChild(viewModal);
        editJury(juryId);
    });
}

// Get initials from name
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// Format date and time for display
function formatDateTime(dateTimeStr) {
    try {
        const date = new Date(dateTimeStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return dateTimeStr;
    }
}

// Delete jury
function deleteJury(juryId) {
    // Set current jury ID
    currentJuryId = juryId;
    
    // Show delete confirmation modal
    document.getElementById('deleteJuryModal').classList.add('active');
}

// Confirm delete jury
function confirmDeleteJury() {
    if (!currentJuryId) return;
    
    // Find jury index
    const juryIndex = juryData.findIndex(j => j.id == currentJuryId);
    if (juryIndex === -1) return;
    
    // Remove jury from array
    juryData.splice(juryIndex, 1);
    
    // Save to localStorage
    localStorage.setItem('juryData', JSON.stringify(juryData));
    
    // Close modal
    closeDeleteModal();
    
    // Show success message
    showNotification('Jury supprimé avec succès', 'success');
    
    // Refresh table
    renderJuryTable();
}

// Close jury modal
function closeJuryModal() {
    document.getElementById('juryModal').classList.remove('active');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteJuryModal').classList.remove('active');
}

// Save jury (create or update)
function saveJury() {
    // Get form data
    const projectId = document.getElementById('juryProjectId').value;
    const student = document.getElementById('juryStudent').value;
    const title = document.getElementById('juryTitle').value;
    const supervisor = document.getElementById('jurySupervisor').value;
    const president = document.getElementById('juryPresident').value;
    const rapporteur = document.getElementById('juryRapporteur').value;
    const date = document.getElementById('juryDate').value;
    const session = document.getElementById('jurySession').value;
    const room = document.getElementById('juryRoom').value;
    const status = document.getElementById('juryStatus').value;
    const notes = document.getElementById('juryNotes').value;
    
    // Validate form
    if (!projectId || !student || !title || !supervisor || !president || !rapporteur || !date || !session || !room || !status) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Check if supervisor, president and rapporteur are different
    if (supervisor === president || supervisor === rapporteur || president === rapporteur) {
        showNotification('L\'encadrant, le président et le rapporteur doivent être différents', 'error');
        return;
    }
    
    // Create jury object
    const jury = {
        projectId,
        student,
        title,
        supervisor,
        president,
        rapporteur,
        date,
        session,
        room,
        status,
        notes,
        lastModified: new Date().toISOString()
    };
    
    if (currentJuryId) {
        // Update existing jury
        const juryIndex = juryData.findIndex(j => j.id == currentJuryId);
        if (juryIndex !== -1) {
            // Preserve id and created date
            jury.id = currentJuryId;
            jury.created = juryData[juryIndex].created;
            
            // Update jury
            juryData[juryIndex] = jury;
            
            showNotification('Jury mis à jour avec succès', 'success');
        }
    } else {
        // Create new jury
        jury.id = getNextJuryId();
        jury.created = new Date().toISOString();
        
        // Add to array
        juryData.push(jury);
        
        showNotification('Jury créé avec succès', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('juryData', JSON.stringify(juryData));
    
    // Close modal
    closeJuryModal();
    
    // Refresh table
    renderJuryTable();
}

// Get next jury ID
function getNextJuryId() {
    if (juryData.length === 0) return 1;
    
    // Find max ID
    const maxId = Math.max(...juryData.map(j => j.id));
    return maxId + 1;
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'times-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-content">
            ${message}
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('notification-hiding');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notificationContainer.contains(notification)) {
            notification.classList.add('notification-hiding');
            setTimeout(() => {
                if (notificationContainer.contains(notification)) {
                    notificationContainer.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 10);
}

// Search juries
function searchJuries() {
    currentPage = 1; // Reset to first page
    renderJuryTable();
}

// Filter juries
function filterJuries() {
    currentPage = 1; // Reset to first page
    renderJuryTable();
}

// Populate project select
function populateProjectSelect() {
    const projectSelect = document.getElementById('juryProjectSelect');
    if (!projectSelect) return;
    
    // Clear options
    projectSelect.innerHTML = '<option value="">Sélectionner un projet</option>';
    
    // Get imported PFE data if available
    const pfeData = localStorage.getItem('importedPfeData');
    let projects = [];
    
    if (pfeData) {
        projects = JSON.parse(pfeData);
        
        // Add options for each project
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project['ID_PROJECT'];
            option.textContent = `${project['ID_PROJECT']} - ${project['Étudiant']}`;
            projectSelect.appendChild(option);
        });
    }
    
    // Add event listener
    projectSelect.addEventListener('change', function() {
        const selectedProject = this.value;
        if (selectedProject) {
            // Find project data
            const project = projects.find(p => p['ID_PROJECT'] === selectedProject);
            if (project) {
                // Fill form fields
                document.getElementById('juryProjectId').value = project['ID_PROJECT'];
                document.getElementById('juryStudent').value = project['Étudiant'];
                document.getElementById('juryTitle').value = project['Titre PFE'];
                document.getElementById('jurySupervisor').value = project['Encadrant'];
                
                // Auto-suggest president and rapporteur
                suggestJuryMembers(project['Encadrant']);
            }
        }
    });
}

// Suggest jury members based on supervisor
function suggestJuryMembers(supervisor) {
    // Get all teachers
    const teachers = [
        'Dr. Kamel Hamrouni',
        'Dr. Sana Fakhfakh',
        'Dr. Nabil Tabbane',
        'Dr. Lamia Ben Amor',
        'Dr. Faouzi Benzarti',
        'Dr. Hanen Idoudi',
        'Dr. Lamia Chaari',
        'Dr. Mohamed Jmaiel',
        'Dr. Rim Haddad',
        'Dr. Sami Tabbane'
    ];
    
    // Filter out supervisor
    const availableTeachers = teachers.filter(teacher => teacher !== supervisor);
    
    // Get two random teachers
    const randomTeachers = getRandomElements(availableTeachers, 2);
    
    // Set president and rapporteur
    document.getElementById('juryPresident').value = randomTeachers[0] || '';
    document.getElementById('juryRapporteur').value = randomTeachers[1] || '';
}

// Get random elements from array
function getRandomElements(array, count) {
    const result = [];
    const arrayCopy = [...array];
    
    for (let i = 0; i < count && arrayCopy.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);
        result.push(arrayCopy[randomIndex]);
        arrayCopy.splice(randomIndex, 1);
    }
    
    return result;
}

// Populate teacher selects
function populateTeacherSelects() {
    const supervisorSelect = document.getElementById('jurySupervisor');
    const presidentSelect = document.getElementById('juryPresident');
    const rapporteurSelect = document.getElementById('juryRapporteur');
    
    if (!supervisorSelect || !presidentSelect || !rapporteurSelect) return;
    
    // Get all teachers
    const teachers = [
        'Dr. Kamel Hamrouni',
        'Dr. Sana Fakhfakh',
        'Dr. Nabil Tabbane',
        'Dr. Lamia Ben Amor',
        'Dr. Faouzi Benzarti',
        'Dr. Hanen Idoudi',
        'Dr. Lamia Chaari',
        'Dr. Mohamed Jmaiel',
        'Dr. Rim Haddad',
        'Dr. Sami Tabbane'
    ];
    
    // Clear options
    supervisorSelect.innerHTML = '';
    presidentSelect.innerHTML = '';
    rapporteurSelect.innerHTML = '';
    
    // Add empty option
    supervisorSelect.innerHTML += '<option value="">Sélectionner un encadrant</option>';
    presidentSelect.innerHTML += '<option value="">Sélectionner un président</option>';
    rapporteurSelect.innerHTML += '<option value="">Sélectionner un rapporteur</option>';
    
    // Add options for each teacher
    teachers.forEach(teacher => {
        supervisorSelect.innerHTML += `<option value="${teacher}">${teacher}</option>`;
        presidentSelect.innerHTML += `<option value="${teacher}">${teacher}</option>`;
        rapporteurSelect.innerHTML += `<option value="${teacher}">${teacher}</option>`;
    });
}

// Initialize tooltips
function initializeTooltips() {
    // This would typically use a library like Bootstrap or Tippy.js
    // For simplicity, we'll use a custom implementation
    
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('title');
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 10 + 'px';
            
            // Add to body
            document.body.appendChild(tooltip);
            
            // Store reference
            this.tooltip = tooltip;
            
            // Animate in
            setTimeout(() => {
                tooltip.classList.add('tooltip-show');
            }, 10);
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.classList.remove('tooltip-show');
                
                setTimeout(() => {
                    if (this.tooltip && this.tooltip.parentNode) {
                        this.tooltip.parentNode.removeChild(this.tooltip);
                        this.tooltip = null;
                    }
                }, 300);
            }
        });
    });
}

// Show auto-assign modal
function showAutoAssignModal() {
    document.getElementById('autoAssignModal').classList.add('active');
}

// Close auto-assign modal
function closeAutoAssignModal() {
    document.getElementById('autoAssignModal').classList.remove('active');
}

// Perform auto-assignment of jury members
function performAutoAssignment() {
    // Get assignment parameters
    const assignmentRule = document.getElementById('assignmentRule').value;
    const respectSpeciality = document.getElementById('respectSpeciality').checked;
    const balanceWorkload = document.getElementById('balanceWorkload').checked;
    
    // Show loading indicator
    document.getElementById('autoAssignLoadingIndicator').style.display = 'flex';
    
    // Simulate processing delay
    setTimeout(() => {
        // Get all juries
        const juries = [...juryData];
        
        // Get all teachers
        const teachers = [
            'Dr. Kamel Hamrouni',
            'Dr. Sana Fakhfakh',
            'Dr. Nabil Tabbane',
            'Dr. Lamia Ben Amor',
            'Dr. Faouzi Benzarti',
            'Dr. Hanen Idoudi',
            'Dr. Lamia Chaari',
            'Dr. Mohamed Jmaiel',
            'Dr. Rim Haddad',
            'Dr. Sami Tabbane'
        ];
        
        // Count current assignments
        const teacherAssignments = {};
        teachers.forEach(teacher => {
            teacherAssignments[teacher] = {
                supervisor: 0,
                president: 0,
                rapporteur: 0,
                total: 0
            };
        });
        
        // Count current assignments
        juries.forEach(jury => {
            if (teacherAssignments[jury.supervisor]) {
                teacherAssignments[jury.supervisor].supervisor++;
                teacherAssignments[jury.supervisor].total++;
            }
            
            if (teacherAssignments[jury.president]) {
                teacherAssignments[jury.president].president++;
                teacherAssignments[jury.president].total++;
            }
            
            if (teacherAssignments[jury.rapporteur]) {
                teacherAssignments[jury.rapporteur].rapporteur++;
                teacherAssignments[jury.rapporteur].total++;
            }
        });
        
        // Assign jury members
        juries.forEach(jury => {
            // Skip if already has president and rapporteur
            if (jury.president && jury.rapporteur) return;
            
            // Get supervisor
            const supervisor = jury.supervisor;
            
            // Get available teachers (excluding supervisor)
            const availableTeachers = teachers.filter(teacher => teacher !== supervisor);
            
            // Sort by workload if balancing is enabled
            if (balanceWorkload) {
                availableTeachers.sort((a, b) => 
                    teacherAssignments[a].total - teacherAssignments[b].total);
            }
            
            // Assign president if needed
            if (!jury.president) {
                const president = availableTeachers[0];
                jury.president = president;
                
                // Update counts
                teacherAssignments[president].president++;
                teacherAssignments[president].total++;
                
                // Remove from available teachers
                const presidentIndex = availableTeachers.indexOf(president);
                if (presidentIndex !== -1) {
                    availableTeachers.splice(presidentIndex, 1);
                }
            }
            
            // Assign rapporteur if needed
            if (!jury.rapporteur) {
                // Re-sort if balancing is enabled
                if (balanceWorkload) {
                    availableTeachers.sort((a, b) => 
                        teacherAssignments[a].total - teacherAssignments[b].total);
                }
                
                const rapporteur = availableTeachers[0];
                jury.rapporteur = rapporteur;
                
                // Update counts
                teacherAssignments[rapporteur].rapporteur++;
                teacherAssignments[rapporteur].total++;
            }
            
            // Update lastModified
            jury.lastModified = new Date().toISOString();
        });
        
        // Save to localStorage
        localStorage.setItem('juryData', JSON.stringify(juries));
        
        // Hide loading indicator
        document.getElementById('autoAssignLoadingIndicator').style.display = 'none';
        
        // Close modal
        closeAutoAssignModal();
        
        // Show success message
        showNotification('Attribution automatique des jurys terminée avec succès', 'success');
        
        // Refresh table
        renderJuryTable();
    }, 2000);
}

// Toggle select all juries
function toggleSelectAllJuries() {
    const selectAllCheckbox = document.getElementById('selectAllJuries');
    const juryCheckboxes = document.querySelectorAll('.jury-checkbox');
    
    juryCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    // Update batch actions visibility
    updateBatchActionsVisibility();
}

// Update batch actions visibility
function updateBatchActionsVisibility() {
    const batchActionsContainer = document.getElementById('batchActionsContainer');
    const selectedCount = document.querySelectorAll('.jury-checkbox:checked').length;
    
    if (selectedCount > 0) {
        batchActionsContainer.style.display = 'flex';
        document.getElementById('selectedCount').textContent = selectedCount;
    } else {
        batchActionsContainer.style.display = 'none';
    }
}

// Show batch delete modal
function showBatchDeleteModal() {
    const selectedCount = document.querySelectorAll('.jury-checkbox:checked').length;
    
    if (selectedCount === 0) return;
    
    // Update modal text
    document.getElementById('batchDeleteCount').textContent = selectedCount;
    
    // Show modal
    document.getElementById('batchDeleteModal').classList.add('active');
}

// Close batch delete modal
function closeBatchDeleteModal() {
    document.getElementById('batchDeleteModal').classList.remove('active');
}

// Perform batch delete
function performBatchDelete() {
    const selectedCheckboxes = document.querySelectorAll('.jury-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.juryId);
    
    if (selectedIds.length === 0) return;
    
    // Filter out selected juries
    juryData = juryData.filter(jury => !selectedIds.includes(jury.id.toString()));
    
    // Save to localStorage
    localStorage.setItem('juryData', JSON.stringify(juryData));
    
    // Close modal
    closeBatchDeleteModal();
    
    // Show success message
    showNotification(`${selectedIds.length} jurys supprimés avec succès`, 'success');
    
    // Refresh table
    renderJuryTable();
}

// Set up drag and drop for jury members
function setupDragAndDrop() {
    // This would be implemented with a library like SortableJS
    // For simplicity, we'll just log a message
    console.log('Drag and drop functionality would be set up here');
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initJuryManagement);

// Excel Processor with AI Mapping
// This script handles Excel file processing with intelligent column mapping

// Configuration
const config = {
    requiredFields: [
        { name: 'ID_PROJECT', aliases: ['id', 'project_id', 'id_projet', 'numero', 'code', 'reference'] },
        { name: 'Étudiant', aliases: ['student', 'nom_etudiant', 'etudiant', 'nom_complet', 'nom et prenom', 'fullname'] },
        { name: 'Email', aliases: ['email_etudiant', 'courriel', 'mail', 'adresse_email', 'e-mail'] },
        { name: 'Titre PFE', aliases: ['titre', 'sujet', 'title', 'project_title', 'sujet_pfe', 'theme'] },
        { name: 'Encadrant', aliases: ['superviseur', 'supervisor', 'encadreur', 'prof', 'enseignant', 'teacher'] },
        { name: 'Président Jury', aliases: ['president', 'jury_president', 'chef_jury', 'head_jury', 'president_jury'] },
        { name: 'Rapporteur', aliases: ['rapporteur', 'reporter', 'examinateur', 'examiner'] },
        { name: 'Date', aliases: ['date_soutenance', 'defense_date', 'jour', 'day', 'date_presentation'] },
        { name: 'Session', aliases: ['creneau', 'time_slot', 'horaire', 'periode', 'heure', 'time'] },
        { name: 'Salle', aliases: ['room', 'local', 'classe', 'class', 'location', 'lieu'] }
    ],
    sessionMapping: {
        's1': 'S1 (08H30-10H00)',
        's2': 'S2 (10H10-11H40)',
        's3': 'S3 (11H50-13H20)',
        's4': 'S4 (13H50-15H20)',
        's5': 'S5 (15H30-17H00)',
        's6': 'S6 (17H10-18H40)',
        '1': 'S1 (08H30-10H00)',
        '2': 'S2 (10H10-11H40)',
        '3': 'S3 (11H50-13H20)',
        '4': 'S4 (13H50-15H20)',
        '5': 'S5 (15H30-17H00)',
        '6': 'S6 (17H10-18H40)',
        'matin': 'S1 (08H30-10H00)',
        'morning': 'S1 (08H30-10H00)',
        'midi': 'S3 (11H50-13H20)',
        'noon': 'S3 (11H50-13H20)',
        'après-midi': 'S4 (13H50-15H20)',
        'afternoon': 'S4 (13H50-15H20)',
        'soir': 'S6 (17H10-18H40)',
        'evening': 'S6 (17H10-18H40)'
    }
};

// Global variables
let excelData = null;
let mappedColumns = {};
let currentStep = 1;
let validationErrors = [];
let processedData = [];

// Initialize the Excel processor
function initExcelProcessor() {
    // Set up event listeners
    document.getElementById('excelFileInput').addEventListener('change', handleFileSelect);
    document.getElementById('dropArea').addEventListener('dragover', handleDragOver);
    document.getElementById('dropArea').addEventListener('drop', handleFileDrop);
    document.getElementById('nextBtn').addEventListener('click', handleNextStep);
    document.getElementById('prevBtn').addEventListener('click', handlePrevStep);
    document.getElementById('mapAutomaticallyBtn').addEventListener('click', mapColumnsAutomatically);
    document.getElementById('validateDataBtn').addEventListener('click', validateData);
    document.getElementById('importDataBtn').addEventListener('click', importData);
    
    // Initialize the stepper
    updateStepperState();
}

// Handle file selection via input
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processExcelFile(file);
    }
}

// Handle drag over event
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('dropArea').classList.add('drag-over');
}

// Handle file drop
function handleFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('dropArea').classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file) {
        processExcelFile(file);
    }
}

// Process the Excel file
function processExcelFile(file) {
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'flex';
    
    // Check if file is Excel
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
        showError("Le fichier doit être au format Excel (.xlsx, .xls) ou CSV (.csv)");
        document.getElementById('loadingIndicator').style.display = 'none';
        return;
    }
    
    // Update UI to show selected file
    document.getElementById('selectedFileName').textContent = file.name;
    document.getElementById('fileSelected').style.display = 'block';
    
    // Read the file
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert to JSON
            excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Hide loading indicator
            document.getElementById('loadingIndicator').style.display = 'none';
            
            // Enable next button
            document.getElementById('nextBtn').disabled = false;
            
            // Show success message
            showSuccess("Fichier chargé avec succès!");
            
            // Log the data for debugging
            console.log("Excel data loaded:", excelData);
            
            // Automatically map columns using AI
            if (document.getElementById('autoMapToggle').checked) {
                setTimeout(() => {
                    handleNextStep(); // Move to mapping step
                    mapColumnsAutomatically(); // Auto-map columns
                }, 1000);
            }
        } catch (error) {
            console.error("Error processing Excel file:", error);
            showError("Erreur lors du traitement du fichier Excel. Veuillez vérifier le format du fichier.");
            document.getElementById('loadingIndicator').style.display = 'none';
        }
    };
    
    reader.onerror = function() {
        showError("Erreur lors de la lecture du fichier.");
        document.getElementById('loadingIndicator').style.display = 'none';
    };
    
    reader.readAsArrayBuffer(file);
}

// Handle next step button click
function handleNextStep() {
    if (currentStep < 4) {
        currentStep++;
        updateStepperState();
        
        // Perform step-specific actions
        switch(currentStep) {
            case 2: // Mapping step
                renderMappingInterface();
                break;
            case 3: // Validation step
                validateData();
                break;
            case 4: // Import step
                prepareImportSummary();
                break;
        }
    }
}

// Handle previous step button click
function handlePrevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepperState();
    }
}

// Update the stepper UI based on current step
function updateStepperState() {
    // Update stepper circles
    for (let i = 1; i <= 4; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (i < currentStep) {
            stepElement.classList.add('completed');
            stepElement.classList.remove('active');
        } else if (i === currentStep) {
            stepElement.classList.add('active');
            stepElement.classList.remove('completed');
        } else {
            stepElement.classList.remove('active', 'completed');
        }
    }
    
    // Update step content visibility
    for (let i = 1; i <= 4; i++) {
        const contentElement = document.getElementById(`step${i}Content`);
        contentElement.style.display = i === currentStep ? 'block' : 'none';
    }
    
    // Update buttons
    document.getElementById('prevBtn').disabled = currentStep === 1;
    document.getElementById('nextBtn').disabled = currentStep === 4 || (currentStep === 1 && !excelData);
    document.getElementById('nextBtn').style.display = currentStep < 4 ? 'inline-block' : 'none';
    document.getElementById('importDataBtn').style.display = currentStep === 4 ? 'inline-block' : 'none';
}

// Render the mapping interface
function renderMappingInterface() {
    if (!excelData || excelData.length < 2) {
        showError("Les données Excel sont invalides ou vides.");
        return;
    }
    
    const headers = excelData[0];
    const mappingContainer = document.getElementById('columnMappingContainer');
    mappingContainer.innerHTML = '';
    
    // Create mapping UI for each required field
    config.requiredFields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'mapping-item';
        
        const fieldLabel = document.createElement('div');
        fieldLabel.className = 'mapping-field';
        fieldLabel.textContent = field.name;
        
        const mappingSelect = document.createElement('select');
        mappingSelect.className = 'form-select mapping-select';
        mappingSelect.id = `mapping_${field.name}`;
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Sélectionner une colonne';
        mappingSelect.appendChild(emptyOption);
        
        // Add options for each header
        headers.forEach((header, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = header || `Colonne ${index + 1}`;
            mappingSelect.appendChild(option);
        });
        
        // Add preview button
        const previewButton = document.createElement('button');
        previewButton.className = 'btn btn-outline-secondary btn-sm preview-btn';
        previewButton.innerHTML = '<i class="fas fa-eye"></i>';
        previewButton.addEventListener('click', () => previewColumn(mappingSelect.value));
        
        fieldContainer.appendChild(fieldLabel);
        fieldContainer.appendChild(mappingSelect);
        fieldContainer.appendChild(previewButton);
        
        mappingContainer.appendChild(fieldContainer);
    });
    
    // Show the mapping container
    document.getElementById('columnMappingSection').style.display = 'block';
}

// Map columns automatically using AI
function mapColumnsAutomatically() {
    if (!excelData || excelData.length < 2) {
        showError("Les données Excel sont invalides ou vides.");
        return;
    }
    
    // Show loading indicator
    document.getElementById('aiMappingLoader').style.display = 'inline-block';
    
    // Get headers
    const headers = excelData[0];
    
    // Reset mapped columns
    mappedColumns = {};
    
    // Simulate AI processing delay
    setTimeout(() => {
        // For each required field, find the best matching header
        config.requiredFields.forEach(field => {
            let bestMatchIndex = -1;
            let bestMatchScore = 0;
            
            // Check each header for a match
            headers.forEach((header, index) => {
                if (!header) return; // Skip empty headers
                
                const headerStr = header.toString().toLowerCase();
                
                // Check for exact match with field name
                if (headerStr === field.name.toLowerCase()) {
                    bestMatchIndex = index;
                    bestMatchScore = 1;
                    return;
                }
                
                // Check for match with aliases
                for (const alias of field.aliases) {
                    if (headerStr === alias.toLowerCase()) {
                        bestMatchIndex = index;
                        bestMatchScore = 0.9;
                        return;
                    }
                }
                
                // Check for partial matches
                if (bestMatchScore < 0.8) {
                    // Check if header contains field name
                    if (headerStr.includes(field.name.toLowerCase())) {
                        bestMatchIndex = index;
                        bestMatchScore = 0.8;
                        return;
                    }
                    
                    // Check if header contains any alias
                    for (const alias of field.aliases) {
                        if (headerStr.includes(alias.toLowerCase())) {
                            bestMatchIndex = index;
                            bestMatchScore = 0.7;
                            return;
                        }
                    }
                    
                    // Check if field name contains header
                    if (field.name.toLowerCase().includes(headerStr)) {
                        bestMatchIndex = index;
                        bestMatchScore = 0.6;
                        return;
                    }
                    
                    // Check if any alias contains header
                    for (const alias of field.aliases) {
                        if (alias.toLowerCase().includes(headerStr)) {
                            bestMatchIndex = index;
                            bestMatchScore = 0.5;
                            return;
                        }
                    }
                    
                    // Check for similarity using Levenshtein distance
                    const similarity = calculateSimilarity(headerStr, field.name.toLowerCase());
                    if (similarity > 0.6 && similarity > bestMatchScore) {
                        bestMatchIndex = index;
                        bestMatchScore = similarity;
                    }
                    
                    // Check similarity with aliases
                    for (const alias of field.aliases) {
                        const aliasSimilarity = calculateSimilarity(headerStr, alias.toLowerCase());
                        if (aliasSimilarity > 0.6 && aliasSimilarity > bestMatchScore) {
                            bestMatchIndex = index;
                            bestMatchScore = aliasSimilarity;
                        }
                    }
                }
            });
            
            // If a match was found, update the select element
            if (bestMatchIndex >= 0) {
                const selectElement = document.getElementById(`mapping_${field.name}`);
                if (selectElement) {
                    selectElement.value = bestMatchIndex;
                    mappedColumns[field.name] = bestMatchIndex;
                }
            }
        });
        
        // Hide loading indicator
        document.getElementById('aiMappingLoader').style.display = 'none';
        
        // Show success message
        showSuccess("Mappage automatique terminé! Veuillez vérifier les associations.");
        
        // Log the mapped columns
        console.log("AI mapped columns:", mappedColumns);
        
        // Check if all required fields are mapped
        const allMapped = config.requiredFields.every(field => 
            document.getElementById(`mapping_${field.name}`).value !== '');
            
        if (allMapped) {
            document.getElementById('nextBtn').disabled = false;
        } else {
            // Highlight unmapped fields
            config.requiredFields.forEach(field => {
                const selectElement = document.getElementById(`mapping_${field.name}`);
                if (selectElement && selectElement.value === '') {
                    selectElement.classList.add('border-danger');
                } else if (selectElement) {
                    selectElement.classList.remove('border-danger');
                }
            });
            
            showWarning("Certains champs n'ont pas pu être mappés automatiquement. Veuillez les mapper manuellement.");
        }
    }, 1500); // Simulate AI processing time
}

// Calculate similarity between two strings (simplified Levenshtein distance)
function calculateSimilarity(str1, str2) {
    if (str1 === str2) return 1.0;
    
    const len1 = str1.length;
    const len2 = str2.length;
    
    if (len1 === 0 || len2 === 0) return 0.0;
    
    // Simple character-based similarity
    let matches = 0;
    const maxLen = Math.max(len1, len2);
    
    for (let i = 0; i < Math.min(len1, len2); i++) {
        if (str1[i] === str2[i]) matches++;
    }
    
    return matches / maxLen;
}

// Preview column data
function previewColumn(columnIndex) {
    if (!excelData || columnIndex === '') return;
    
    const index = parseInt(columnIndex);
    const previewData = [];
    
    // Get up to 5 sample values from the column
    for (let i = 1; i < Math.min(excelData.length, 6); i++) {
        if (excelData[i] && excelData[i][index] !== undefined) {
            previewData.push(excelData[i][index]);
        }
    }
    
    // Show preview modal
    const previewModal = new bootstrap.Modal(document.getElementById('columnPreviewModal'));
    document.getElementById('previewColumnName').textContent = excelData[0][index] || `Colonne ${index + 1}`;
    
    const previewList = document.getElementById('previewDataList');
    previewList.innerHTML = '';
    
    previewData.forEach(value => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = value;
        previewList.appendChild(listItem);
    });
    
    previewModal.show();
}

// Validate the data based on mappings
function validateData() {
    if (!excelData || excelData.length < 2) {
        showError("Les données Excel sont invalides ou vides.");
        return;
    }
    
    // Collect mappings from UI
    mappedColumns = {};
    config.requiredFields.forEach(field => {
        const selectElement = document.getElementById(`mapping_${field.name}`);
        if (selectElement && selectElement.value !== '') {
            mappedColumns[field.name] = parseInt(selectElement.value);
        }
    });
    
    // Check if all required fields are mapped
    const missingMappings = config.requiredFields.filter(field => 
        mappedColumns[field.name] === undefined).map(field => field.name);
        
    if (missingMappings.length > 0) {
        showError(`Veuillez mapper tous les champs requis. Champs manquants: ${missingMappings.join(', ')}`);
        return;
    }
    
    // Reset validation errors
    validationErrors = [];
    processedData = [];
    
    // Process and validate each row
    for (let i = 1; i < excelData.length; i++) {
        const row = excelData[i];
        const processedRow = {};
        let rowHasError = false;
        
        // Process each field
        for (const field of config.requiredFields) {
            const columnIndex = mappedColumns[field.name];
            const value = row[columnIndex];
            
            // Check for missing required values
            if (value === undefined || value === null || value === '') {
                validationErrors.push({
                    row: i,
                    field: field.name,
                    value: value,
                    error: `Valeur manquante pour ${field.name} à la ligne ${i}`
                });
                rowHasError = true;
            } else {
                // Process specific fields
                if (field.name === 'Session') {
                    // Normalize session value
                    const sessionValue = value.toString().toLowerCase().trim();
                    const normalizedSession = normalizeSession(sessionValue);
                    
                    if (!normalizedSession) {
                        validationErrors.push({
                            row: i,
                            field: field.name,
                            value: value,
                            error: `Session invalide "${value}" à la ligne ${i}. Utilisez S1-S6 ou un format reconnu.`
                        });
                        rowHasError = true;
                    } else {
                        processedRow[field.name] = normalizedSession;
                    }
                } else if (field.name === 'Date') {
                    // Validate and normalize date
                    const dateValue = value.toString().trim();
                    const normalizedDate = normalizeDate(dateValue);
                    
                    if (!normalizedDate) {
                        validationErrors.push({
                            row: i,
                            field: field.name,
                            value: value,
                            error: `Date invalide "${value}" à la ligne ${i}. Utilisez un format de date reconnu.`
                        });
                        rowHasError = true;
                    } else {
                        processedRow[field.name] = normalizedDate;
                    }
                } else if (field.name === 'Email') {
                    // Validate email format
                    if (!validateEmail(value.toString().trim())) {
                        validationErrors.push({
                            row: i,
                            field: field.name,
                            value: value,
                            error: `Email invalide "${value}" à la ligne ${i}`
                        });
                        rowHasError = true;
                    } else {
                        processedRow[field.name] = value.toString().trim();
                    }
                } else {
                    // Store other fields as is
                    processedRow[field.name] = value;
                }
            }
        }
        
        // Add row to processed data if no errors
        if (!rowHasError) {
            processedData.push(processedRow);
        }
    }
    
    // Render validation results
    renderValidationResults();
}

// Normalize session value
function normalizeSession(sessionValue) {
    // Check direct mapping
    if (config.sessionMapping[sessionValue]) {
        return config.sessionMapping[sessionValue];
    }
    
    // Check for S1-S6 format
    if (/^s[1-6]$/i.test(sessionValue)) {
        const sessionNumber = sessionValue.charAt(1);
        return config.sessionMapping[sessionNumber];
    }
    
    // Check for time ranges
    if (sessionValue.includes('8') || sessionValue.includes('9') || sessionValue.includes('08') || sessionValue.includes('09')) {
        return config.sessionMapping['1'];
    } else if (sessionValue.includes('10') || sessionValue.includes('11')) {
        return config.sessionMapping['2'];
    } else if (sessionValue.includes('12') || sessionValue.includes('13')) {
        return config.sessionMapping['3'];
    } else if (sessionValue.includes('14') || sessionValue.includes('15')) {
        return config.sessionMapping['4'];
    } else if (sessionValue.includes('16') || sessionValue.includes('17')) {
        return config.sessionMapping['5'];
    } else if (sessionValue.includes('18') || sessionValue.includes('19')) {
        return config.sessionMapping['6'];
    }
    
    // If no match found
    return null;
}

// Normalize date value
function normalizeDate(dateValue) {
    // Try parsing with Date object
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
    
    // Try common date formats
    const formats = [
        /(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/, // DD/MM/YYYY or DD-MM-YYYY
        /(\d{2,4})[-/.](\d{1,2})[-/.](\d{1,2})/, // YYYY/MM/DD or YYYY-MM-DD
    ];
    
    for (const format of formats) {
        const match = dateValue.match(format);
        if (match) {
            let day, month, year;
            
            if (match[1].length === 4) {
                // YYYY/MM/DD format
                year = parseInt(match[1]);
                month = parseInt(match[2]);
                day = parseInt(match[3]);
            } else {
                // DD/MM/YYYY format
                day = parseInt(match[1]);
                month = parseInt(match[2]);
                year = parseInt(match[3]);
                
                // Handle 2-digit years
                if (year < 100) {
                    year += 2000;
                }
            }
            
            // Validate date components
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                continue;
            }
            
            // Create date string in YYYY-MM-DD format
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        }
    }
    
    // If no match found
    return null;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Render validation results
function renderValidationResults() {
    const validationContainer = document.getElementById('validationResultsContainer');
    validationContainer.innerHTML = '';
    
    // Show validation summary
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'validation-summary';
    
    if (validationErrors.length === 0) {
        summaryDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                Toutes les données sont valides! ${processedData.length} lignes prêtes à être importées.
            </div>
        `;
        document.getElementById('nextBtn').disabled = false;
    } else {
        summaryDiv.innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle"></i>
                ${validationErrors.length} erreurs trouvées. ${processedData.length} lignes valides sur ${excelData.length - 1} total.
            </div>
        `;
        document.getElementById('nextBtn').disabled = validationErrors.length > 0 && processedData.length === 0;
    }
    
    validationContainer.appendChild(summaryDiv);
    
    // Show errors if any
    if (validationErrors.length > 0) {
        const errorsDiv = document.createElement('div');
        errorsDiv.className = 'validation-errors';
        
        const errorsTable = document.createElement('table');
        errorsTable.className = 'table table-striped table-bordered';
        errorsTable.innerHTML = `
            <thead>
                <tr>
                    <th>Ligne</th>
                    <th>Champ</th>
                    <th>Valeur</th>
                    <th>Erreur</th>
                </tr>
            </thead>
            <tbody id="errorsTableBody"></tbody>
        `;
        
        errorsDiv.appendChild(errorsTable);
        validationContainer.appendChild(errorsDiv);
        
        const errorsTableBody = document.getElementById('errorsTableBody');
        
        // Add error rows
        validationErrors.forEach(error => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${error.row}</td>
                <td>${error.field}</td>
                <td>${error.value !== undefined ? error.value : '(vide)'}</td>
                <td>${error.error}</td>
            `;
            errorsTableBody.appendChild(row);
        });
    }
    
    // Show preview of valid data
    if (processedData.length > 0) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'data-preview mt-4';
        previewDiv.innerHTML = `
            <h4>Aperçu des données valides</h4>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr id="previewTableHeader"></tr>
                    </thead>
                    <tbody id="previewTableBody"></tbody>
                </table>
            </div>
        `;
        
        validationContainer.appendChild(previewDiv);
        
        const previewTableHeader = document.getElementById('previewTableHeader');
        const previewTableBody = document.getElementById('previewTableBody');
        
        // Add header row
        config.requiredFields.forEach(field => {
            const th = document.createElement('th');
            th.textContent = field.name;
            previewTableHeader.appendChild(th);
        });
        
        // Add data rows (up to 5)
        for (let i = 0; i < Math.min(processedData.length, 5); i++) {
            const row = document.createElement('tr');
            
            config.requiredFields.forEach(field => {
                const td = document.createElement('td');
                td.textContent = processedData[i][field.name] || '';
                row.appendChild(td);
            });
            
            previewTableBody.appendChild(row);
        }
        
        // Add message if showing partial data
        if (processedData.length > 5) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'text-muted mt-2';
            messageDiv.textContent = `Affichage de 5 lignes sur ${processedData.length} total.`;
            previewDiv.appendChild(messageDiv);
        }
    }
}

// Prepare import summary
function prepareImportSummary() {
    const summaryContainer = document.getElementById('importSummaryContainer');
    
    // Create summary content
    summaryContainer.innerHTML = `
        <div class="import-summary">
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                Résumé de l'importation
            </div>
            
            <div class="summary-stats">
                <div class="summary-stat-item">
                    <div class="summary-stat-value">${processedData.length}</div>
                    <div class="summary-stat-label">Projets PFE</div>
                </div>
                
                <div class="summary-stat-item">
                    <div class="summary-stat-value">${countUniqueValues('Étudiant')}</div>
                    <div class="summary-stat-label">Étudiants</div>
                </div>
                
                <div class="summary-stat-item">
                    <div class="summary-stat-value">${countUniqueValues('Encadrant')}</div>
                    <div class="summary-stat-label">Encadrants</div>
                </div>
                
                <div class="summary-stat-item">
                    <div class="summary-stat-value">${countUniqueValues('Salle')}</div>
                    <div class="summary-stat-label">Salles</div>
                </div>
            </div>
            
            <div class="import-details mt-4">
                <h4>Détails de l'importation</h4>
                
                <div class="import-detail-item">
                    <div class="import-detail-label">Projets par session</div>
                    <div class="import-detail-value">
                        <ul class="list-unstyled">
                            ${generateSessionDistribution()}
                        </ul>
                    </div>
                </div>
                
                <div class="import-detail-item">
                    <div class="import-detail-label">Projets par date</div>
                    <div class="import-detail-value">
                        <ul class="list-unstyled">
                            ${generateDateDistribution()}
                        </ul>
                    </div>
                </div>
                
                <div class="import-detail-item">
                    <div class="import-detail-label">Top encadrants</div>
                    <div class="import-detail-value">
                        <ul class="list-unstyled">
                            ${generateTopSupervisors()}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="alert alert-warning mt-4">
                <i class="fas fa-exclamation-triangle"></i>
                Cette action va importer ${processedData.length} projets PFE dans la base de données.
                Assurez-vous que les données sont correctes avant de continuer.
            </div>
        </div>
    `;
}

// Count unique values in a field
function countUniqueValues(fieldName) {
    const uniqueValues = new Set();
    
    processedData.forEach(row => {
        if (row[fieldName]) {
            uniqueValues.add(row[fieldName].toString().toLowerCase());
        }
    });
    
    return uniqueValues.size;
}

// Generate session distribution HTML
function generateSessionDistribution() {
    const sessionCounts = {};
    
    processedData.forEach(row => {
        const session = row['Session'];
        if (session) {
            sessionCounts[session] = (sessionCounts[session] || 0) + 1;
        }
    });
    
    let html = '';
    Object.entries(sessionCounts).forEach(([session, count]) => {
        html += `<li><strong>${session}</strong>: ${count} projets</li>`;
    });
    
    return html || '<li>Aucune donnée disponible</li>';
}

// Generate date distribution HTML
function generateDateDistribution() {
    const dateCounts = {};
    
    processedData.forEach(row => {
        const date = row['Date'];
        if (date) {
            dateCounts[date] = (dateCounts[date] || 0) + 1;
        }
    });
    
    let html = '';
    Object.entries(dateCounts).forEach(([date, count]) => {
        // Format date for display
        const displayDate = formatDate(date);
        html += `<li><strong>${displayDate}</strong>: ${count} projets</li>`;
    });
    
    return html || '<li>Aucune donnée disponible</li>';
}

// Generate top supervisors HTML
function generateTopSupervisors() {
    const supervisorCounts = {};
    
    processedData.forEach(row => {
        const supervisor = row['Encadrant'];
        if (supervisor) {
            supervisorCounts[supervisor] = (supervisorCounts[supervisor] || 0) + 1;
        }
    });
    
    // Sort supervisors by count
    const sortedSupervisors = Object.entries(supervisorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Top 5
    
    let html = '';
    sortedSupervisors.forEach(([supervisor, count]) => {
        html += `<li><strong>${supervisor}</strong>: ${count} projets</li>`;
    });
    
    return html || '<li>Aucune donnée disponible</li>';
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

// Import the data
function importData() {
    // Show loading indicator
    document.getElementById('importLoadingIndicator').style.display = 'flex';
    
    // Simulate import process
    setTimeout(() => {
        // Hide loading indicator
        document.getElementById('importLoadingIndicator').style.display = 'none';
        
        // Show success message
        document.getElementById('importSuccessMessage').style.display = 'block';
        
        // Disable import button
        document.getElementById('importDataBtn').disabled = true;
        
        // Log the imported data
        console.log("Imported data:", processedData);
        
        // In a real application, this would send the data to the server
        // For demo purposes, we'll just store it in localStorage
        localStorage.setItem('importedPfeData', JSON.stringify(processedData));
        
        // Add view data button
        const viewDataBtn = document.createElement('button');
        viewDataBtn.className = 'btn btn-outline-primary mt-3';
        viewDataBtn.innerHTML = '<i class="fas fa-table"></i> Voir les données importées';
        viewDataBtn.addEventListener('click', () => {
            window.location.href = 'pfe-management.html';
        });
        
        document.getElementById('importSuccessMessage').appendChild(viewDataBtn);
    }, 2000);
}

// Show error message
function showError(message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-times-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Show success message
function showSuccess(message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Show warning message
function showWarning(message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initExcelProcessor);

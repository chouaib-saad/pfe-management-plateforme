

//<!-- JavaScript -->
    // Language Switcher
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            // Here you would implement the actual language change
            console.log('Language changed to: ' + this.getAttribute('data-lang'));
        });
    });
    
    // Voice Search
    const voiceSearchButton = document.querySelector('.voice-search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (voiceSearchButton && searchInput) {
        voiceSearchButton.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.lang = 'fr-FR';
                
                voiceSearchButton.classList.add('listening');
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    searchInput.value = transcript;
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.onerror = function() {
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.onend = function() {
                    voiceSearchButton.classList.remove('listening');
                };
                
                recognition.start();
            } else {
                alert('La reconnaissance vocale n\'est pas prise en charge par votre navigateur.');
            }
        });
    }
    
    // Search tags
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.search-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            searchInput.value = this.textContent;
        });
    });
    
    // Parallax Effect
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed') || 0.05);
            const offsetX = (x - 0.5) * speed * 100;
            const offsetY = (y - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
// Main title typing effect
const mainTitles = [
"Gérez vos projets de fin d'études avec excellence",
"Optimisez votre gestion académique", 
"Simplifiez le suivi des PFE"
];
let mainTitleIndex = 0;
let mainTitleCharIndex = 0;
let isMainDeleting = false;
const typingSpeed = 100;
const pauseBetween = 2000;

function typeMainTitle() {
const currentTitle = mainTitles[mainTitleIndex];
const mainTitleElement = document.getElementById('main-title');
const containerWidth = mainTitleElement.parentElement.offsetWidth;

// Calculate when to break to new line (at 50% of container width)
const maxCharsPerLine = Math.floor(containerWidth / (parseInt(getComputedStyle(mainTitleElement).fontSize) * 0.6));

if (isMainDeleting) {
mainTitleElement.textContent = currentTitle.substring(0, mainTitleCharIndex - 1);
mainTitleCharIndex--;
} else {
let displayText = currentTitle.substring(0, mainTitleCharIndex + 1);

// Insert line breaks when needed
if (mainTitleCharIndex > maxCharsPerLine) {
  const lastSpace = displayText.lastIndexOf(' ', maxCharsPerLine);
  if (lastSpace > 0) {
    displayText = displayText.substring(0, lastSpace) + '\n' + displayText.substring(lastSpace + 1);
  }
}

mainTitleElement.textContent = displayText;
mainTitleCharIndex++;
}

if (!isMainDeleting && mainTitleCharIndex === currentTitle.length) {
isMainDeleting = true;
setTimeout(typeMainTitle, pauseBetween);
} else if (isMainDeleting && mainTitleCharIndex === 0) {
isMainDeleting = false;
mainTitleIndex = (mainTitleIndex + 1) % mainTitles.length;
setTimeout(typeMainTitle, typingSpeed/2);
} else {
setTimeout(typeMainTitle, isMainDeleting ? typingSpeed/2 : typingSpeed);
}
}

// Initialize effects when DOM loads
document.addEventListener('DOMContentLoaded', () => {
// Make sure CSS is set up for wrapping
const style = document.createElement('style');
style.textContent = `
#main-title {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
`;
document.head.appendChild(style);

// Start typing effect
setTimeout(typeMainTitle, 1000);

// Make spline interactive
const splineIframe = document.querySelector('.spline-background');
splineIframe.style.pointerEvents = 'auto';

// Add click handler for réclamation button
document.querySelector('.btn-reclamation').addEventListener('click', function() {
console.log('Réclamation button clicked');
});

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
slidesPerView: 1,
spaceBetween: 30,
pagination: {
  el: ".swiper-pagination",
  clickable: true,
},
breakpoints: {
  768: {
    slidesPerView: 2,
  },
  992: {
    slidesPerView: 3,
  }
}
});
});







// Reclamation Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const complaintModal = document.getElementById('complaintModal');
    const btnReclamation = document.querySelector('.btn-reclamation');
    const complaintModalClose = document.getElementById('complaintModalClose');
    const complaintForm = document.getElementById('complaintForm');

    // Open modal when reclamation button is clicked
    btnReclamation.addEventListener('click', function(e) {
        e.preventDefault();
        complaintModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when X button is clicked
    complaintModalClose.addEventListener('click', function() {
        complaintModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the modal content
    complaintModal.addEventListener('click', function(e) {
        if (e.target === complaintModal) {
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('complaintName').value;
            const email = document.getElementById('complaintEmail').value;
            const type = document.getElementById('complaintType').value;
            const message = document.getElementById('complaintMessage').value;
            
            // Here you would typically send the data to a server
            console.log('Reclamation submitted:', { name, email, type, message });
            
            // Show success message (you can customize this)
            alert('Votre réclamation a été soumise avec succès!');
            
            // Close the modal
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset the form
            complaintForm.reset();
        });
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && complaintModal.style.display === 'flex') {
            complaintModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});




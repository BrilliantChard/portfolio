document.addEventListener('DOMContentLoaded', function() {
    // =====================
    //  GENERAL UTILITIES
    // =====================
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // =====================
    //  THEME TOGGLE
    // =====================
    
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    const icon = themeToggle.querySelector('i');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set initial icon
    if (currentTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme and save preference
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // =====================
    //  SMOOTH SCROLLING
    // =====================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================
    //  SKILLS RENDERING
    // =====================
    
    const skillsData = {
        "Networking & Security": [
            { name: "Computer Networking", level: 90 },
            { name: "Network Configuration", level: 85 },
            { name: "Port Security", level: 80 }
        ],
        "Electrical Machines": [
            { name: "Motor Systems", level: 88 },
            { name: "Transformers", level: 85 },
            { name: "Generators", level: 82 }
        ],
        "Programming": [
            { name: "Python", level: 90 },
            { name: "Java", level: 75 },
            { name: "C", level: 70 }
        ],
        "Web Development": [
            { name: "HTML/CSS", level: 95 },
            { name: "JavaScript", level: 85 },
            { name: "Django", level: 80 }
        ],
        "Geothermal Power": [
            { name: "Plant Operations", level: 85 },
            { name: "Turbine Systems", level: 80 }
        ],
        "Switchgear": [
            { name: "Circuit Breakers", level: 88 },
            { name: "Motor Control Centers", level: 85 }
        ],
        "Embedded Systems": [
            { name: "Arduino", level: 80 },
            { name: "Raspberry Pi", level: 75 }
        ]
    };

    function renderSkills() {
        const container = document.querySelector('.skills-container');
        
        // Clear any existing content
        container.innerHTML = '';
        
        // Create skill categories
        for (const [category, skills] of Object.entries(skillsData)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            
            const heading = document.createElement('h3');
            heading.textContent = category;
            categoryDiv.appendChild(heading);
            
            // Add skills to category
            skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item';
                
                skillItem.innerHTML = `
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-level" style="width: ${skill.level}%"></div>
                    </div>
                `;
                
                categoryDiv.appendChild(skillItem);
            });
            
            container.appendChild(categoryDiv);
        }
    }

    // =====================
    //  EXPERIENCE TIMELINE
    // =====================
    
    const experienceData = [
        {
            date: "2022 - Present",
            title: "Telecom Engineer",
            company: "ABC Telecom",
            description: "Designed and implemented network solutions for enterprise clients."
        },
        {
            date: "2020 - 2022",
            title: "Network Specialist",
            company: "XYZ Networks",
            description: "Managed network infrastructure and security systems."
        },
        {
            date: "2018 - 2020",
            title: "Junior Engineer",
            company: "Tech Solutions Inc.",
            description: "Assisted in maintaining telecom and electrical systems."
        }
    ];

    function renderExperience() {
        const timeline = document.querySelector('.timeline');
        
        experienceData.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            item.innerHTML = `
                <div class="timeline-date">${exp.date}</div>
                <div class="timeline-content">
                    <h3>${exp.title}</h3>
                    <p class="company">${exp.company}</p>
                    <p>${exp.description}</p>
                </div>
            `;
            
            timeline.appendChild(item);
        });
    }

    // =====================
    //  FORM HANDLING
    // =====================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // =====================
    //  ACTIVE NAV LINK
    // =====================
    
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // =====================
    //  INITIALIZE ALL COMPONENTS
    // =====================
    
    renderSkills();
    renderExperience();
});
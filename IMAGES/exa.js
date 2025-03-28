document.addEventListener('DOMContentLoaded', function() {
    // ==================== UTILITY FUNCTIONS ====================
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Debounce function for scroll events
    const debounce = (func, wait = 100) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Check if element exists
    const elementExists = (selector) => document.querySelector(selector) !== null;

    // ==================== THEME TOGGLE ====================
    if (elementExists('.theme-toggle')) {
        const themeToggle = document.querySelector('.theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // ==================== NAVIGATION ====================
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (elementExists('#menu-toggle')) {
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            if (navMenu) {
                navMenu.classList.toggle('active');
                this.classList.toggle('open');
            }
        });
    }

    // ==================== DATA STRUCTURES ====================
    const academicsData = [
        {
            institution: "Dedan Kimathi University",
            program: "BSc Telecom Engineering",
            period: "2020 - Present",
            highlights: [
                "Specialized in RF and Microwave Communications",
                "Key courses: Digital Signal Processing, Network Design",
                "GPA: 3.8/4.0"
            ],
            achievements: [
                "Dean's List 2021-2023",
                "Best Telecom Project Award 2022"
            ],
            skillsGained: ["Network Design", "RF Engineering", "DSP"]
        },
        {
            institution: "Kokwanyo Secondary",
            program: "KCSE",
            period: "2016 - 2019",
            highlights: [
                "Grade: B Plain (62 points)",
                "Top 5% in National Exams",
                "Mathematics Club President"
            ],
            achievements: [
                "Best Math Student Award",
                "Science Fair Regional Champion"
            ],
            skillsGained: ["Problem Solving", "Leadership", "Research"]
        }
    ];

    const experienceData = [
        {
            company: "Kenya Broadcasting Corp",
            position: "Telecom Engineer Intern",
            period: "Jan 2025 - Present",
            highlights: [
                "RF Signal monitoring, Antenna Systems",
                "DVB-T Transmission Systems",
                "IP-based broadcasting systems"
            ],
            skills: ["RF Engineering", "Networking", "Broadcast Systems"]
        },
        {
            company: "KenGen",
            position: "Electrical Engineer Intern",
            period: "May 2023 - Aug 2023",
            highlights: [
                "Electrical systems maintenance",
                "Motor and generator connections",
                "Instrumentation and control"
            ],
            skills: ["Electrical Machines", "Maintenance", "Control Systems"]
        }
    ];

    const skillsData = {
        "Telecommunications": [
            { name: "Network Configuration", level: 90 },
            { name: "RF Engineering", level: 85 },
            { name: "Antenna Design", level: 88 }
        ],
        "Software Development": [
            { name: "Python", level: 85 },
            { name: "JavaScript", level: 80 },
            { name: "Java", level: 75 }
        ],
        "Electrical Engineering": [
            { name: "Motor Systems", level: 88 },
            { name: "Transformers", level: 85 }
        ]
    };

    // ==================== RENDER FUNCTIONS ====================
    function createAcademicCard(academic) {
        const card = document.createElement('div');
        card.className = 'academic-item';
        
        const highlightsHTML = academic.highlights ? 
            `<div class="academic-highlights">
                <h4>Key Highlights:</h4>
                <ul>${academic.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
            </div>` : '';
        
        const achievementsHTML = academic.achievements ? 
            `<div class="academic-achievements">
                <h4>Achievements:</h4>
                <ul>${academic.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>` : '';
        
        const skillsHTML = academic.skillsGained ? 
            `<div class="academic-skills">
                <h4>Skills Gained:</h4>
                <div class="skills-tags">
                    ${academic.skillsGained.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>` : '';
        
        card.innerHTML = `
            <div class="academic-header">
                <h3>${academic.institution}</h3>
                <p class="academic-program">${academic.program} (${academic.period})</p>
            </div>
            ${highlightsHTML}
            ${achievementsHTML}
            ${skillsHTML}
            <div class="academic-footer"></div>
        `;
        return card;
    }

    function renderAcademicPreview() {
        const container = document.querySelector('.academics-preview');
        if (!container) return;
        
        academicsData.slice(0, 2).forEach(academic => {
            const card = createAcademicCard(academic);
            // Simplify for preview
            card.querySelectorAll('.academic-achievements, .academic-skills').forEach(el => el.remove());
            container.appendChild(card);
        });
    }

    function renderFullAcademicSection() {
        const container = document.querySelector('.academics-section');
        if (!container) return;
        
        academicsData.forEach(academic => {
            container.appendChild(createAcademicCard(academic));
        });
    }

    // ==================== INTERACTIVE FEATURES ====================
    function setupAcademicInteractions() {
        if (!elementExists('.academic-item')) return;

        // Add click to expand/collapse for academic items
        document.querySelectorAll('.academic-header').forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const academicItem = this.closest('.academic-item');
                academicItem.classList.toggle('expanded');
                
                const details = academicItem.querySelector('.academic-highlights, .academic-achievements, .academic-skills');
                if (details) {
                    details.style.maxHeight = details.style.maxHeight ? null : `${details.scrollHeight}px`;
                }
            });
        });

        // Animate academic items on scroll
        const academicObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    academicObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.academic-item').forEach(item => {
            academicObserver.observe(item);
        });
    }

    function setupExperienceInteractions() {
        if (!elementExists('.experience-item')) return;

        // Animate experience bars on scroll
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.experience-level');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 150);
                    });
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.experience-item').forEach(item => {
            experienceObserver.observe(item);
        });
    }

    // ==================== FORM HANDLING ====================
    if (elementExists('#contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ==================== ACTIVE NAV LINK ====================
    const updateActiveNavLink = debounce(() => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, 50);

    window.addEventListener('scroll', updateActiveNavLink);

    // ==================== INITIALIZE ====================
    renderAcademicPreview();
    renderFullAcademicSection();
    setupAcademicInteractions();
    setupExperienceInteractions();

    // Add dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        .academic-item {
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }
        .academic-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .academic-item.expanded {
            background-color: rgba(52, 152, 219, 0.05);
        }
        .academic-highlights,
        .academic-achievements,
        .academic-skills {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .skill-tag {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            margin: 0.25rem;
            font-size: 0.8rem;
        }
    `;
    document.head.appendChild(style);
});
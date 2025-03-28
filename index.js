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

    // ==================== THEME TOGGLE ====================
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
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
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            if (navMenu) {
                navMenu.classList.toggle('active');
                this.classList.toggle('open');
            }
        });
    }

    // ==================== DATA ====================
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

    const academicsData = [
        {
            institution: "Dedan Kimathi University",
            program: "BSc Telecom Engineering",
            period: "2020 - Present",
            highlight: "Aiming for First Class Honours"
        },
        {
            institution: "Kokwanyo Secondary",
            program: "KCSE",
            period: "2016 - 2019",
            highlight: "Grade: B Plain (62 points)"
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

    // ==================== RENDER FUNCTIONS ====================
    function createCard(type, data) {
        const card = document.createElement('div');
        card.className = `${type}-item`;
        
        let highlightsHTML = '';
        if (data.highlights) {
            highlightsHTML = `<ul>${data.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`;
        }
        
        card.innerHTML = `
            <h3>${data.position || data.institution || ''}</h3>
            <p><strong>${data.company || data.program || ''}</strong> (${data.period})</p>
            ${data.highlight ? `<p>${data.highlight}</p>` : highlightsHTML}
            <hr>
        `;
        return card;
    }

    function renderPreview(containerClass, data, type) {
        const container = document.querySelector(`.${containerClass}`);
        if (!container) return;
        
        data.slice(0, 2).forEach(item => {
            container.appendChild(createCard(type, item));
        });
    }

    function renderSkills() {
        const container = document.querySelector('.skills-preview');
        if (!container) return;
        
        Object.entries(skillsData).slice(0, 2).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-preview-category';
            categoryDiv.innerHTML = `<h3>${category}</h3>`;
            
            skills.slice(0, 2).forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill-preview-item';
                skillDiv.innerHTML = `
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-level" style="width: ${skill.level}%"></div>
                    </div>
                `;
                categoryDiv.appendChild(skillDiv);
            });
            container.appendChild(categoryDiv);
        });
    }

    // ==================== EXPERIENCE PAGE FUNCTIONALITY ====================
    const setupExperiencePage = () => {
        const experienceSection = document.querySelector('.experience-section');
        if (!experienceSection) return;

        // Animate experience bars on scroll
        const animateExperienceBars = () => {
            const experienceBars = document.querySelectorAll('.experience-level');
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 150);
                        observer.unobserve(bar);
                    }
                });
            }, observerOptions);

            experienceBars.forEach(bar => {
                observer.observe(bar);
            });
        };

        // Make experience items interactive
        const setupExperienceInteractions = () => {
            document.querySelectorAll('.experience-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    const bar = this.querySelector('.experience-bar');
                    if (bar) {
                        bar.style.transform = 'scaleY(1.1)';
                        bar.style.transition = 'transform 0.2s ease';
                    }
                });

                item.addEventListener('mouseleave', function() {
                    const bar = this.querySelector('.experience-bar');
                    if (bar) {
                        bar.style.transform = 'scaleY(1)';
                    }
                });
            });
        };

        animateExperienceBars();
        setupExperienceInteractions();
    };

    // ==================== FORM HANDLING ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
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

    // ==================== INITIALIZE ALL FUNCTIONALITY ====================
    renderPreview('academics-preview', academicsData, 'academic');
    renderPreview('experience-preview', experienceData, 'experience');
    renderSkills();
    setupExperiencePage();
});
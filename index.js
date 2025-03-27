document.addEventListener('DOMContentLoaded', function() {
    // ==================== UTILITY FUNCTIONS ====================
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==================== THEME TOGGLE ====================
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

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==================== DATA ====================
    const skillsData = {
        "Telecommunications": [
            { name: "Network Configuration", level: 90 },
            { name: "RF Engineering", level: 85 }
        ],
        "Software Development": [
            { name: "Python", level: 85 },
            { name: "JavaScript", level: 80 }
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
            highlight: "RF Signal monitoring, DVB-T Systems"
        },
        {
            company: "KenGen",
            position: "Electrical Engineer Intern",
            period: "May 2023 - Aug 2023",
            highlight: "Electrical systems maintenance"
        }
    ];

    // ==================== RENDER FUNCTIONS ====================
    function createCard(type, data) {
        const card = document.createElement('div');
        card.className = `${type}-item`;
        
        card.innerHTML = `
            <h3>${data.position || data.institution || ''}</h3>
            <p><strong>${data.company || data.program || ''}</strong> (${data.period})</p>
            <p>${data.highlight}</p>
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
    window.addEventListener('scroll', function() {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // ==================== INITIALIZE ====================
    renderPreview('academics-preview', academicsData, 'academic');
    renderPreview('experience-preview', experienceData, 'experience');
    renderSkills();
});
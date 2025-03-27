document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set initial icon based on theme
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Skills Data
    const skillsData = {
        "Telecommunications": [
            { name: "Network Configuration", level: 90 },
            { name: "RF Engineering", level: 85 },
            { name: "Fiber Optics", level: 80 },
            { name: "5G Technologies", level: 75 },
            { name: "VoIP Systems", level: 70 }
        ],
        "Software Development": [
            { name: "Python", level: 85 },
            { name: "JavaScript", level: 80 },
            { name: "Java", level: 75 },
            { name: "C/C++", level: 70 }
        ],
        "Web Development": [
            { name: "HTML5/CSS3", level: 90 },
            { name: "React", level: 75 },
            { name: "Node.js", level: 60 },
            { name: "Django", level: 80 }
        ],
        "Embedded Systems": [
            { name: "Arduino", level: 80 },
            { name: "Raspberry Pi", level: 75 },
            { name: "IoT Protocols", level: 70 }
        ],
        "Electrical Engineering": [
            { name: "Circuit Design", level: 90 },
            { name: "PCB Design", level: 90 },
            { name: "Motor Control", level: 95 }
        ]
    };

    // Render Skills Function
    function renderSkills() {
        const skillsContainer = document.querySelector('.skills-container');
        
        for (const [category, skills] of Object.entries(skillsData)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            
            const heading = document.createElement('h3');
            heading.textContent = category;
            categoryDiv.appendChild(heading);
            
            skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill-item';
                
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
            
            skillsContainer.appendChild(categoryDiv);
        }
    }

    // Experience Data
    const experienceData = [
        {
            date: "Jan 2025 - Present",
            title: "Telecom Engineer Intern",
            description: "Worked on Telecom equipments leveraging my wide knowledge to ensure efficiency"
        },
        {
            date: "May 2023 - Aug 2023",
            title: "Electrical Engineer Intern",
            description: "Worked on electrical systems and equipments."

        },
        {
            date: "May 2022 - Aug 2022",
            title: "Telecom Engineer Trainee",
            description: "Assisted in maintaining and troubleshooting telecom equipment."
        }
    ];

    // Render Experience Timeline
    function renderExperience() {
        const timeline = document.querySelector('.timeline');
        
        experienceData.forEach((exp, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            const timelineDate = document.createElement('div');
            timelineDate.className = 'timeline-date';
            timelineDate.textContent = exp.date;
            
            const timelineContent = document.createElement('div');
            timelineContent.className = 'timeline-content';
            
            const title = document.createElement('h3');
            title.textContent = exp.title;
            
            const description = document.createElement('p');
            description.textContent = exp.description;
            
            timelineContent.appendChild(title);
            timelineContent.appendChild(description);
            timelineItem.appendChild(timelineDate);
            timelineItem.appendChild(timelineContent);
            timeline.appendChild(timelineItem);
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize all components
    renderSkills();
    renderExperience();
});
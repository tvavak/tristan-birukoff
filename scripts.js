// Gestion de la navbar
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menu mobile
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    navToggle.addEventListener('click', toggleMenu);

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fermer le menu lors du clic sur l'overlay
    overlay.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fermer le menu mobile lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && !overlay.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des cartes d'expérience
    const observeExperienceCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.experience-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Animation des cartes de compétences
    const observeSkillCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animer les barres de progression
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = targetWidth + '%';
                        }, 200);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Animation des cartes de formation
    const observeEducationCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.education-card').forEach(card => {
            observer.observe(card);
        });
    };

    // Animation des éléments de formation
    const observeFormationItems = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.formation-item').forEach(item => {
            observer.observe(item);
        });
    };

    // Timeline de formation
    const createEducationTimeline = () => {
        const formationSection = document.querySelector('#formation');
        if (!formationSection || window.innerWidth < 992) return;

        const timeline = document.createElement('div');
        timeline.className = 'education-timeline';
        formationSection.appendChild(timeline);
    };

    // Mise à jour de la timeline au redimensionnement
    window.addEventListener('resize', () => {
        const existingTimeline = document.querySelector('.education-timeline');
        if (existingTimeline) {
            existingTimeline.remove();
        }
        createEducationTimeline();
    });

    // Timeline animation
    const createExperienceTimeline = () => {
        const experienceSection = document.querySelector('#experience');
        if (!experienceSection) return;

        const timeline = document.createElement('div');
        timeline.className = 'experience-timeline';
        experienceSection.appendChild(timeline);
    };

    // Animation des barres de progression des compétences
    const animateSkillBars = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.progress-fill').forEach(bar => {
            observer.observe(bar);
        });
    };

    // Animation de la timeline de formation
    const animateFormationTimeline = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.formation-item').forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 200); // Délai progressif pour chaque item
        });
    };

    // Animation des passions
    function togglePassion(header) {
        const content = header.nextElementSibling;
        const passionBox = header.closest('.passion-box');
        const allContents = document.querySelectorAll('.passion-content');
        const allHeaders = document.querySelectorAll('.passion-header');

        // Ferme toutes les autres passions
        allContents.forEach(item => {
            if (item !== content) {
                item.classList.remove('active');
                item.style.maxHeight = null;
            }
        });

        allHeaders.forEach(item => {
            if (item !== header) {
                item.classList.remove('active');
            }
        });

        // Toggle la passion actuelle
        header.classList.toggle('active');
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            
            // Scroll automatique pour montrer tout le contenu
            setTimeout(() => {
                const boxRect = passionBox.getBoundingClientRect();
                const contentRect = content.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const totalHeight = contentRect.height + boxRect.top + window.pageYOffset;
                const margin = 100; // Marge plus grande pour s'assurer que tout est visible

                // Calcule la position de défilement nécessaire pour voir tout le contenu
                const scrollTo = totalHeight - windowHeight + margin;

                window.scrollTo({
                    top: Math.max(scrollTo, 0),
                    behavior: 'smooth'
                });
            }, 350); // Délai légèrement plus long pour s'assurer que l'animation est terminée
        } else {
            content.style.maxHeight = null;
        }
    }

    // Animation à l'apparition des passions
    const observePassions = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        document.querySelectorAll('.passion-box').forEach((box, index) => {
            box.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(box);
        });
    };

    // Ajouter les écouteurs d'événements pour les passions
    document.querySelectorAll('.passion-header').forEach(header => {
        header.addEventListener('click', () => togglePassion(header));
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Animation du bouton pendant l'envoi
        submitButton.innerHTML = `
            <span>Envoi en cours...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitButton.disabled = true;
        
        // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Succès
            submitButton.innerHTML = `
                <span>Message envoyé !</span>
                <i class="fas fa-check"></i>
            `;
            submitButton.style.background = '#28a745';
            
            // Reset du formulaire
            contactForm.reset();
            
            // Retour à l'état initial après 3 secondes
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Erreur
            submitButton.innerHTML = `
                <span>Erreur d'envoi</span>
                <i class="fas fa-times"></i>
            `;
            submitButton.style.background = '#dc3545';
            
            // Retour à l'état initial après 3 secondes
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });

    observePassions();
    animateFormationTimeline();
    animateSkillBars();
    observeExperienceCards();
    observeSkillCards();
    observeEducationCards();
    observeFormationItems();
    createExperienceTimeline();
    createEducationTimeline();
});

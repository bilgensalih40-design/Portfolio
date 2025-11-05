// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For now, we'll just show a success message
        alert('Mesajınız gönderildi! (Bu bir demo, gerçekte backend entegrasyonu gerekir)');
        
        // Reset form
        contactForm.reset();
    });
}

// -----------------------------
// Skills: Data + Render + Animations
// Yeni yetenek eklemek için: aşağıdaki skillsData dizisine bir nesne ekleyin
// { name, percent(0-60), group: 'Programlama|Veritabanı|Web|Araçlar', note, icon }
const skillsData = [
  { name: "C#", percent: 55, group: "Programlama", note: "WinForms temelleri, küçük projeler", icon: "🧩" },
  { name: "OOP (NYP)", percent: 50, group: "Programlama", note: "Sınıf, nesne, constructor, encapsulation", icon: "🏷" },
  { name: "Java", percent: 45, group: "Programlama", note: "Döngüler, diziler, temel sınıflar", icon: "☕" },
  { name: "SQL", percent: 60, group: "Veritabanı", note: "CRUD, JOIN, ilişkisel model", icon: "🗄" },
  { name: "Entity Framework", percent: 50, group: "Veritabanı", note: "LINQ, Code-First temel ilişkiler", icon: "🧠" },
  { name: "HTML/CSS", percent: 60, group: "Web", note: "Responsive düzen, animasyon temelleri", icon: "🎨" },
  { name: "JavaScript", percent: 45, group: "Web", note: "DOM, event, IntersectionObserver", icon: "⚙" },
  { name: "Git & GitHub", percent: 55, group: "Araçlar", note: "Versiyon kontrol, Pages deploy", icon: "🔧" },
  { name: "Azure Fundamentals", percent: 40, group: "Araçlar", note: "Bulut temelleri, maliyetlendirme", icon: "☁" },
  { name: "Unity (2D)", percent: 30, group: "Araçlar", note: "Sprite, sahne, temel build", icon: "🎮" }
];

function getTier(percent) {
  if (percent < 30) return 'Beginner';
  if (percent < 45) return 'Beginner+';
  if (percent < 60) return 'Intermediate-';
  return 'Intermediate';
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  const groups = ["Programlama", "Veritabanı", "Web", "Araçlar"];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = currentLang || 'tr';

  groups.forEach(group => {
    const groupHeader = document.createElement('h3');
    const translatedGroup = translations[lang]?.skills?.groups?.[group] || group;
    groupHeader.textContent = translatedGroup;
    groupHeader.setAttribute('data-i18n-group', group);
    groupHeader.style.opacity = '0.85';
    groupHeader.style.fontSize = '0.95rem';
    groupHeader.style.fontWeight = '600';
    groupHeader.style.margin = '8px 4px';
    grid.appendChild(groupHeader);

    skillsData.filter(s => s.group === group).forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-item';
      item.dataset.skill = skill.name;
      item.setAttribute('data-reveal', '');

      const head = document.createElement('div');
      head.className = 'skill-head';
      const badge = document.createElement('div');
      badge.className = 'skill-badge';
      badge.setAttribute('aria-hidden', 'true');
      badge.textContent = skill.icon;
      const title = document.createElement('div');
      title.className = 'skill-title';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = `${skill.name} · ${skill.percent}%`;
      title.appendChild(nameSpan);
      head.appendChild(badge);
      head.appendChild(title);

      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      
      const wrap = document.createElement('div');
      wrap.className = 'progress-wrap';
      wrap.setAttribute('role', 'progressbar');
      wrap.setAttribute('aria-valuemin', '0');
      wrap.setAttribute('aria-valuemax', '100');
      wrap.setAttribute('aria-valuenow', String(skill.percent));
      wrap.setAttribute('aria-label', `${skill.name} seviyesi`);
      
      const bar = document.createElement('div');
      bar.className = 'progress-bar';
      bar.style.width = '0%';
      bar.setAttribute('data-percent', String(skill.percent));
      
      const percentText = document.createElement('span');
      percentText.className = 'progress-percent';
      percentText.textContent = `${skill.percent}%`;
      
      wrap.appendChild(bar);
      progressContainer.appendChild(wrap);
      progressContainer.appendChild(percentText);

      const note = document.createElement('div');
      note.className = 'skill-note';
      const translatedNote = translations[lang]?.skills?.notes?.[skill.note] || skill.note;
      note.textContent = translatedNote;
      note.setAttribute('data-i18n-note', skill.note);

      item.appendChild(head);
      item.appendChild(progressContainer);
      item.appendChild(note);
      grid.appendChild(item);

      if (prefersReduced) {
        bar.style.width = `${skill.percent}%`;
        item.classList.add('visible');
      }
    });
  });

  // Last updated: Ay Yıl
  const updated = document.getElementById('skillsUpdated');
  if (updated) {
    const now = new Date();
    const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
    updated.textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
  }
}

function setupSkillsObserver() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // genişlikler render sırasında ayarlandı

  const items = document.querySelectorAll('#skills .skill-item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const bar = el.querySelector('.progress-bar');
        if (bar) {
          const percent = parseInt(bar.getAttribute('data-percent')) || 0;
          setTimeout(() => {
            el.classList.add('visible');
            bar.style.width = `${percent}%`;
          }, idx * 80);
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  items.forEach(it => io.observe(it));
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }, index * 150); // Stagger animation
        }
    });
}, observerOptions);

// Timeline specific observer with delay
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// Page Loader
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                pageLoader.remove();
            }, 600);
        }, 1000);
    }
});

// Enhanced Intersection Observer for all scroll animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            enhancedObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Render skills then setup its observer
    renderSkills();
    setupSkillsObserver();
    
    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        enhancedObserver.observe(card);
    });
    
    // Observe timeline cards
    const timelineCards = document.querySelectorAll('.timeline-card[data-reveal]');
    timelineCards.forEach((card, index) => {
        setTimeout(() => {
            timelineObserver.observe(card);
        }, index * 100);
    });
    
    // Observe contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(30px)';
        contactForm.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        enhancedObserver.observe(contactForm);
    }
    
    const contactSection = document.querySelector('.contact');
    const skillsSection = document.querySelector('#skills');
    
    // Ensure sections are visible
    if (skillsSection) {
        skillsSection.style.opacity = '1';
        skillsSection.style.visibility = 'visible';
    }
    
    if (contactSection) {
        contactSection.style.opacity = '1';
        contactSection.style.visibility = 'visible';
    }
    
    // Observe certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        enhancedObserver.observe(card);
    });
    
    // Animate legacy .skill-item blocks (if any remained)
    skillItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Fallback: show after delay if observer doesn't work
        setTimeout(() => {
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        }, 500 + (index * 100));
        
        observer.observe(el);
    });
    
    // Animate timeline cards with staggered effect
    timelineCards.forEach((card, index) => {
        setTimeout(() => {
            timelineObserver.observe(card);
        }, index * 100);
    });
    
    // Animate contact form with fallback
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(20px)';
        contactForm.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Fallback
        setTimeout(() => {
            if (contactForm.style.opacity === '0') {
                contactForm.style.opacity = '1';
                contactForm.style.transform = 'translateY(0)';
            }
        }, 800);
        
        observer.observe(contactForm);
    }
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class style to CSS dynamically or in styles.css
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// Language Translation System
// ========================================
const translations = {
    tr: {
        nav: {
            home: "Ana Sayfa",
            timeline: "Zaman Çizelgesi",
            skills: "Yetenekler",
            projects: "Projelerim",
            certificates: "Sertifikalar",
            contact: "İletişim"
        },
        hero: {
            subtitle: "Yönetim Bilişim Sistemleri Öğrencisi",
            description: "Ben Salih Bilgen. Yönetim Bilişim Sistemleri öğrencisiyim.<br>Eğitimimde edindiğim bilgileri projeler geliştirerek uyguluyorum.<br>Teknolojinin iş dünyasındaki etkisini anlamak için iş analistliği ve yapay zekâ konularında kendimi geliştiriyorum.<br>Amacım, yazılım bilgimle iş süreçlerini birleştirip teknolojiyle değer üreten çözümler geliştirmek.<br>Sürekli öğrenmeye açık biri olarak kariyerimi bu yönde ilerletiyorum."
        },
        timeline: {
            title: "Zaman Çizelgesi",
            subtitle: "Yolculuğumdan önemli duraklar",
            "2024": {
                title: "Lisans Eğitimime Başlangıç",
                desc: "Düzce Üniversitesi Yönetim Bilişim Sistemleri bölümünde lisans eğitimime başladım."
            },
            "2025": {
                cs: {
                    title: "C# ve SQL",
                    desc: "Visual Studio ve SQL Server kullanarak C# dilinde hastane ve kütüphane otomasyonları geliştirdim."
                },
                certs: {
                    title: "🚀 Eğitim ve Sertifikalarım",
                    desc: "Udemy'de çeşitli alanlarda sertifikalar tamamladım. Üniversite topluluklarının eğitimlerine katılarak sertifikalar edindim."
                },
                case: {
                    title: "💡 Vaka Analizi Yarışması",
                    desc: "'MISion Possible' takımıyla birlikte vaka analizi yarışmasına katıldım ve problem çözme, ekip çalışması becerilerimi geliştirdim."
                },
                university: {
                    title: "🎓 İkinci Üniversite",
                    desc: "Atatürk Üniversitesi Bilgisayar Programcılığı bölümünde ikinci üniversite olarak eğitimime başladım."
                },
                portfolio: {
                    title: "🌐 Kişisel Portfolio & Kartvizit Sitesi",
                    desc: "Karanlık tema, etkileşimler ve zaman çizelgesi tasarımıyla kişisel markamı HTML, CSS ve JavaScript kullanarak yayına aldım."
                }
            }
        },
        skills: {
            title: "Yetenekler",
            subtitle: "Seviyeler günceldir; gelişim odağındayım.",
            lastUpdated: "Son güncelleme",
            groups: {
                "Programlama": "Programlama",
                "Veritabanı": "Veritabanı",
                "Web": "Web",
                "Araçlar": "Araçlar"
            },
            notes: {
                "WinForms temelleri, küçük projeler": "WinForms temelleri, küçük projeler",
                "Döngüler, diziler, temel sınıflar": "Döngüler, diziler, temel sınıflar",
                "CRUD, JOIN, ilişkisel model": "CRUD, JOIN, ilişkisel model",
                "LINQ, Code-First temel ilişkiler": "LINQ, Code-First temel ilişkiler",
                "Responsive düzen, animasyon temelleri": "Responsive düzen, animasyon temelleri",
                "DOM, event, IntersectionObserver": "DOM, event, IntersectionObserver",
                "Sınıf, nesne, constructor, encapsulation": "Sınıf, nesne, constructor, encapsulation",
                "Versiyon kontrol, Pages deploy": "Versiyon kontrol, Pages deploy",
                "Bulut temelleri, maliyetlendirme": "Bulut temelleri, maliyetlendirme",
                "Sprite, sahne, temel build": "Sprite, sahne, temel build"
            }
        },
        projects: {
            title: "Projelerim",
            hospital: {
                title: "Hastane Yönetim Otomasyonu",
                desc: "Randevu, hasta ve personel süreçlerini yöneten, rol tabanlı yetkilendirmeye sahip masaüstü uygulaması."
            },
            library: {
                title: "Kütüphane Yönetim Otomasyonu",
                desc: "Üyelik, ödünç-iade ve raporlama modülleri ile yönetimi kolaylaştıran uygulama."
            },
            portfolio: {
                title: "Kişisel Portfolyo Sitesi",
                desc: "Karanlık tema, animasyonlar ve erişilebilir odak stilleriyle modern kişisel site."
            }
        },
        certificates: {
            title: "Sertifikalar",
            subtitle: "Tamamladığım eğitim ve sertifika programları",
            csharp1: {
                title: "Uygulama Geliştirerek C# Öğrenin: A'dan Z'ye Eğitim Seti"
            },
            csharp2: {
                title: "C# Programlama: Visual Studio 2022 ile Sıfırdan Uzmanlığa C#"
            },
            algorithm: {
                title: "Algoritma Geliştirme Eğitimi ve Programlamaya Giriş"
            },
            flutter: {
                title: "Google Flutter ve Dart Programlama Dili Temel Eğitimi"
            },
            btk1: {
                title: "Bilgi Teknolojilerine Giriş"
            },
            btk2: {
                title: "Algoritma Programlama ve Veri Yapılarına Girişi"
            },
            java: {
                title: "JAVA ile Programlamaya Giriş"
            }
        },
        contact: {
            title: "İletişim",
            subtitle: "Benimle iletişime geçmek için formu doldurabilirsin.",
            form: {
                name: "Ad Soyad",
                namePlaceholder: "Ad Soyad",
                email: "E-posta",
                emailPlaceholder: "E-posta",
                message: "Mesaj",
                messagePlaceholder: "Mesajınız",
                submit: "Gönder"
            }
        }
    },
    en: {
        nav: {
            home: "Home",
            timeline: "Timeline",
            skills: "Skills",
            projects: "Projects",
            certificates: "Certificates",
            contact: "Contact"
        },
        hero: {
            subtitle: "Management Information Systems Student",
            description: "I am Salih Bilgen. I am a Management Information Systems student.<br>I apply the knowledge I gained in my education by developing projects.<br>I am developing myself in business analysis and artificial intelligence topics to understand the impact of technology in the business world.<br>My goal is to combine my software knowledge with business processes and develop solutions that create value with technology.<br>I am advancing my career in this direction as someone who is open to continuous learning."
        },
        timeline: {
            title: "Timeline",
            subtitle: "Important milestones from my journey",
            "2024": {
                title: "Beginning of My Undergraduate Education",
                desc: "I started my undergraduate education in Management Information Systems at Düzce University."
            },
            "2025": {
                cs: {
                    title: "C# and SQL",
                    desc: "I developed hospital and library automation systems in C# using Visual Studio and SQL Server."
                },
                certs: {
                    title: "🚀 Education and Certificates",
                    desc: "I completed various certificates in different fields on Udemy. I also obtained certificates by participating in university community training programs."
                },
                case: {
                    title: "💡 Case Analysis Competition",
                    desc: "I participated in a case analysis competition with the 'MISion Possible' team and developed my problem-solving and teamwork skills."
                },
                university: {
                    title: "🎓 Second University",
                    desc: "I started my education as a second university in the Computer Programming department at Atatürk University."
                },
                portfolio: {
                    title: "🌐 Personal Portfolio & Business Card Website",
                    desc: "I launched my personal brand using HTML, CSS, and JavaScript with a dark theme, interactions, and timeline design."
                }
            }
        },
        skills: {
            title: "Skills",
            subtitle: "Levels are current; I am focused on development.",
            lastUpdated: "Last updated",
            groups: {
                "Programlama": "Programming",
                "Veritabanı": "Database",
                "Web": "Web",
                "Araçlar": "Tools"
            },
            notes: {
                "WinForms temelleri, küçük projeler": "WinForms fundamentals, small projects",
                "Döngüler, diziler, temel sınıflar": "Loops, arrays, basic classes",
                "CRUD, JOIN, ilişkisel model": "CRUD, JOIN, relational model",
                "LINQ, Code-First temel ilişkiler": "LINQ, Code-First basic relationships",
                "Responsive düzen, animasyon temelleri": "Responsive design, animation fundamentals",
                "DOM, event, IntersectionObserver": "DOM, event, IntersectionObserver",
                "Utility-first CSS framework": "Utility-first CSS framework",
                "Versiyon kontrol, Pages deploy": "Version control, Pages deploy",
                "Bulut temelleri, maliyetlendirme": "Cloud fundamentals, cost management",
                "Sprite, sahne, temel build": "Sprite, scene, basic build"
            }
        },
        projects: {
            title: "Projects",
            hospital: {
                title: "Hospital Management Automation",
                desc: "A desktop application that manages appointment, patient, and personnel processes, with role-based authorization."
            },
            library: {
                title: "Library Management Automation",
                desc: "An application that facilitates management with membership, loan-return, and reporting modules."
            },
            portfolio: {
                title: "Personal Portfolio Website",
                desc: "A modern personal website with a dark theme, animations, and accessible focus styles."
            }
        },
        certificates: {
            title: "Certificates",
            subtitle: "Education and certificate programs I have completed",
            csharp1: {
                title: "Learn C# by Developing Applications: A-Z Training Set"
            },
            csharp2: {
                title: "C# Programming: From Zero to Expert with Visual Studio 2022 C#"
            },
            algorithm: {
                title: "Algorithm Development Training and Introduction to Programming"
            },
            flutter: {
                title: "Google Flutter and Dart Programming Language Basic Training"
            },
            btk1: {
                title: "Introduction to Information Technologies"
            },
            btk2: {
                title: "Introduction to Algorithm Programming and Data Structures"
            },
            java: {
                title: "Introduction to Programming with JAVA"
            }
        },
        contact: {
            title: "Contact",
            subtitle: "You can fill out the form to contact me.",
            form: {
                name: "Full Name",
                namePlaceholder: "Full Name",
                email: "Email",
                emailPlaceholder: "Email",
                message: "Message",
                messagePlaceholder: "Your Message",
                submit: "Send"
            }
        }
    }
};

let currentLang = localStorage.getItem('language') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];
        for (const k of keys) {
            translation = translation?.[k];
        }
        if (translation) {
            // Check if translation contains HTML (like <br> tags)
            if (typeof translation === 'string' && (translation.includes('<br>') || translation.includes('<strong>') || translation.includes('<'))) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let translation = translations[lang];
        for (const k of keys) {
            translation = translation?.[k];
        }
        if (translation) {
            el.placeholder = translation;
        }
    });
    
    // Update language button
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        langBtn.textContent = lang.toUpperCase();
    }
    
    // Update skills section subtitle if needed
    const skillsSubtitle = document.querySelector('#skills .subtitle');
    if (skillsSubtitle && skillsSubtitle.getAttribute('data-i18n')) {
        const key = skillsSubtitle.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];
        for (const k of keys) {
            translation = translation?.[k];
        }
        if (translation) {
            skillsSubtitle.textContent = translation;
        }
    }
    
    // Update skills groups and notes
    document.querySelectorAll('[data-i18n-group]').forEach(el => {
        const group = el.getAttribute('data-i18n-group');
        const translatedGroup = translations[lang]?.skills?.groups?.[group];
        if (translatedGroup) {
            el.textContent = translatedGroup;
        }
    });
    
    document.querySelectorAll('[data-i18n-note]').forEach(el => {
        const note = el.getAttribute('data-i18n-note');
        const translatedNote = translations[lang]?.skills?.notes?.[note];
        if (translatedNote) {
            el.textContent = translatedNote;
        }
    });
}

// Language toggle button
document.addEventListener('DOMContentLoaded', () => {
    // Render skills first
    renderSkills();
    setupSkillsObserver();
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            setLanguage(currentLang);
            // Re-render skills after language change
            const skillsGrid = document.getElementById('skillsGrid');
            if (skillsGrid) {
                skillsGrid.innerHTML = '';
                renderSkills();
                setupSkillsObserver();
            }
        });
    }
    
    // Set initial language
    setLanguage(currentLang);
});


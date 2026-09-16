/**
 * Main Application Logic & Interactions
 * Subbas M Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for active link
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggleBtn && navLinksContainer) {
    mobileToggleBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const isOpen = navLinksContainer.classList.contains('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on a link
    navLinksContainer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // 3. Project Details Modal System
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const PROJECT_DETAILS = {
    'event-management': {
      title: 'Online Event Management System',
      subtitle: 'Full-Stack Web Application with Python & Django',
      tags: ['Python', 'Django', 'PostgreSQL / SQLite', 'JavaScript', 'HTML5/CSS3', 'REST APIs'],
      description: `
        <p>A comprehensive web platform engineered to streamline end-to-end event planning, live scheduling, attendee registrations, and administrative dashboard analytics.</p>
        <br>
        <h4 style="color:#00F2FE; margin-bottom:8px; font-size:1.05rem;">Key Architecture & Features:</h4>
        <ul style="margin-left:20px; color:#9CA3AF; line-height:1.7;">
          <li><strong style="color:#fff;">Role-Based Authentication:</strong> Distinct roles for organizers, attendees, and administrators with granular permissions.</li>
          <li><strong style="color:#fff;">Dynamic Scheduling Engine:</strong> Real-time clash detection and automated calendar invite generation.</li>
          <li><strong style="color:#fff;">Analytics Dashboard:</strong> Visualized attendance metrics, booking trends, and capacity monitoring.</li>
          <li><strong style="color:#fff;">Modular MVC Architecture:</strong> Built adhering to Django best practices with reusable apps and clean database models.</li>
        </ul>
      `,
      github: 'https://github.com/subbas2k9'
    },
    'interactive-web': {
      title: 'Interactive Web Applications Showcase',
      subtitle: 'Modern Responsive Component Ecosystem',
      tags: ['JavaScript (ES6+)', 'React.js', 'CSS Grid/Flexbox', 'State Management', 'Web APIs'],
      description: `
        <p>A suite of high-performance frontend micro-applications and interactive user interface components demonstrating responsive design, fluid animations, and robust client-side state handling.</p>
        <br>
        <h4 style="color:#00F2FE; margin-bottom:8px; font-size:1.05rem;">Highlights & Capabilities:</h4>
        <ul style="margin-left:20px; color:#9CA3AF; line-height:1.7;">
          <li><strong style="color:#fff;">Component-Driven Development:</strong> Modular, self-contained UI components designed for reusability.</li>
          <li><strong style="color:#fff;">Dynamic Micro-Interactions:</strong> Hardware-accelerated CSS animations and canvas effects for seamless UX.</li>
          <li><strong style="color:#fff;">Performance Optimized:</strong> Zero unnecessary re-renders, fast asset loading, and accessibility (a11y) compliance.</li>
        </ul>
      `,
      github: 'https://github.com/subbas2k9'
    },
    'core-backend': {
      title: 'RESTful Backend & Database Architecture',
      subtitle: 'Scalable Services & Systems Engineering',
      tags: ['Python', 'C', 'Java', 'SQL', 'REST APIs', 'Git'],
      description: `
        <p>Backend systems and data structures developed to handle structured queries, transaction reliability, and efficient data processing workflows.</p>
        <br>
        <h4 style="color:#00F2FE; margin-bottom:8px; font-size:1.05rem;">Technical Implementation:</h4>
        <ul style="margin-left:20px; color:#9CA3AF; line-height:1.7;">
          <li><strong style="color:#fff;">Relational Database Design:</strong> Normalized SQL schemas, indexing strategies, and optimized query execution.</li>
          <li><strong style="color:#fff;">Algorithmic Foundations:</strong> Core computer engineering principles implemented in C and Java.</li>
          <li><strong style="color:#fff;">Clean API Contracts:</strong> Well-documented endpoints with error handling and validation middleware.</li>
        </ul>
      `,
      github: 'https://github.com/subbas2k9'
    }
  };

  window.openProjectModal = function (projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data || !modalContent || !modalOverlay) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="section-tag" style="margin-bottom:8px;">Project Overview</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${data.title}</h2>
        <p style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.9rem;">${data.subtitle}</p>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
        ${data.tags.map(t => `<span class="project-tag" style="background:rgba(0,242,254,0.08); border-color:rgba(0,242,254,0.25); color:#00F2FE;">${t}</span>`).join('')}
      </div>

      <div style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 28px;">
        ${data.description}
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View Source on GitHub
        </a>
        <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function () {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 4. Contact Form Handler (Generates formatted mailto trigger)
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Software Engineering Opportunity / Inquiry';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        window.showToast('Please fill in all required fields.', '⚠️');
        return;
      }

      const bodyText = `Hi Subbas,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`;
      const mailtoUrl = `mailto:subbas2k9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      window.showToast('Launching your email client...', '🚀');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  // 5. Back to top button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

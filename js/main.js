/**
 * ==============================================================================
 * ACHIEVERS ACADEMY - MAIN JAVASCRIPT
 * Core website functionality, navigation, and central school configuration
 * ==============================================================================
 */

'use strict';

/**
 * ------------------------------------------------------------------------------
 * CENTRAL SCHOOL CONFIGURATION
 * Edit this single object to update school details across interactive scripts.
 * For static HTML text, corresponding placeholders are clearly commented in
 * each HTML file.
 * ------------------------------------------------------------------------------
 */
const SCHOOL_CONFIG = {
  name: "Achievers Academy",
  tagline: "Excellence • Character • Wisdom",
  logoPath: "images/logo.svg",
  faviconPath: "images/favicon.svg",
  phone: "+1 (555) 019-2834",               // Placeholder - Update with verified school phone
  phoneDisplay: "+1 (555) 019-2834",
  email: "admissions@achieversacademy.edu", // Placeholder - Update with verified school email
  address: {
    line1: "168 Parliamentary Extension",   // School physical address
    line2: "Cross River State",
    city: "Calabar",
    postalCode: "540211",
    country: "Nigeria"
  },
  officeHours: "Monday – Friday: 7:30 AM – 2:00 PM",
  admissionsStatus: "Admissions Open for 2026/2027 Academic Session",
  socialLinks: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  },
  // Form submission service integration point (e.g. Formspree, Basin, or custom API)
  // When ready for production, replace with your actual endpoint URL:
  // e.g., "https://formspree.io/f/your_form_id"
  formEndpoints: {
    admissions: "",
    contact: ""
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initBackToTop();
  updateDynamicYear();
  highlightActiveNavLink();
});

/**
 * ------------------------------------------------------------------------------
 * Mobile Navigation (Accessible slide-out drawer)
 * ------------------------------------------------------------------------------
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const siteNav = document.getElementById('site-nav');
  const closeBtn = document.getElementById('nav-close-btn');
  const backdrop = document.getElementById('nav-backdrop');

  if (!toggleBtn || !siteNav) return;

  function openNav() {
    siteNav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    if (closeBtn) closeBtn.focus();
  }

  function closeNav() {
    siteNav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = siteNav.classList.contains('is-open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  // Close nav when clicking any nav link inside mobile drawer
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('is-open')) {
        closeNav();
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeNav();
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * Sticky Header Scroll State
 * ------------------------------------------------------------------------------
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/**
 * ------------------------------------------------------------------------------
 * Back To Top Button
 * ------------------------------------------------------------------------------
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * Dynamic Copyright Year
 * ------------------------------------------------------------------------------
 */
function updateDynamicYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}

/**
 * ------------------------------------------------------------------------------
 * Highlight Active Navigation Link
 * ------------------------------------------------------------------------------
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Export config globally for use in form scripts
window.SCHOOL_CONFIG = SCHOOL_CONFIG;

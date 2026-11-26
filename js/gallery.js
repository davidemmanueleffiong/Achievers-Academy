/**
 * ==============================================================================
 * ACHIEVERS ACADEMY - GALLERY & LIGHTBOX MODULE
 * Handles filterable categories and an accessible, keyboard-friendly lightbox
 * ==============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFiltering();
  initLightbox();
});

/**
 * ------------------------------------------------------------------------------
 * Gallery Category Filtering
 * ------------------------------------------------------------------------------
 */
function initGalleryFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          item.setAttribute('aria-hidden', 'false');
        } else {
          item.classList.add('hidden');
          item.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * Accessible Lightbox Component
 * ------------------------------------------------------------------------------
 */
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  if (!lightbox || !galleryItems.length) return;

  let currentIndex = 0;
  let activeTriggerElement = null;

  // Get currently visible items (based on category filter)
  function getVisibleItems() {
    return galleryItems.filter(item => !item.classList.contains('hidden'));
  }

  function openLightbox(item) {
    const visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex === -1) currentIndex = 0;

    activeTriggerElement = item;
    updateLightboxContent();

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (activeTriggerElement) {
      activeTriggerElement.focus();
    }
  }

  function updateLightboxContent() {
    const visibleItems = getVisibleItems();
    if (!visibleItems.length) return;

    // Wrap around bounds
    if (currentIndex < 0) {
      currentIndex = visibleItems.length - 1;
    } else if (currentIndex >= visibleItems.length) {
      currentIndex = 0;
    }

    const currentItem = visibleItems[currentIndex];
    const imgEl = currentItem.querySelector('img');
    const categoryTag = currentItem.querySelector('.gallery-category-tag');
    const captionEl = currentItem.querySelector('.gallery-caption');

    const src = currentItem.getAttribute('data-full-src') || (imgEl ? imgEl.src : '');
    const alt = imgEl ? imgEl.alt : 'School gallery photo';
    const tag = categoryTag ? categoryTag.textContent : '';
    const caption = captionEl ? captionEl.textContent : '';

    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = `${caption} (${currentIndex + 1} of ${visibleItems.length})`;
    }
    if (lightboxTag) {
      lightboxTag.textContent = tag;
    }
  }

  function showNext() {
    currentIndex++;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex--;
    updateLightboxContent();
  }

  // Attach click & keyboard listeners to each gallery card
  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  // Close when clicking overlay backdrop outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

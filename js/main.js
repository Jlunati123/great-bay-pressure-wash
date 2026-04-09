/* ============================================================
   GREAT BAY PRESSURE WASH — Main JavaScript
   ============================================================ */

/* --- Load CMS Images from data files --- */
function loadCMSImages(dataFile, imageMap) {
  fetch('/' + dataFile)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      Object.keys(imageMap).forEach(function(key) {
        if (data[key]) {
          var el = document.getElementById(imageMap[key]);
          if (el) {
            var alt = el.getAttribute('data-alt') || '';
            // Clear placeholder styling so image fills cleanly
            el.style.cssText = 'width:100%;height:100%;display:block;padding:0;background:#000;border:none;overflow:hidden;';
            el.innerHTML = '<img src="' + data[key] + '" alt="' + alt + '" style="width:100%;height:100%;object-fit:contain;display:block;border:none;" />';
          }
        }
      });
    })
    .catch(function() {});
}

document.addEventListener('DOMContentLoaded', function () {

  /* --- Sticky Header --- */
  const header = document.getElementById('site-header');
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Mobile Menu Toggle --- */
  const toggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      // Open clicked (unless it was open)
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --- Contact Form submission (static placeholder) --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Replace with your form backend (Netlify Forms, Formspree, etc.)
      setTimeout(function () {
        contactForm.innerHTML = '<div style="text-align:center;padding:2rem"><div style="font-size:3rem">✅</div><h3 style="margin:1rem 0 0.5rem">Message Received!</h3><p>We\'ll get back to you within a few hours. For faster service, call <a href="tel:6319212732" style="color:var(--primary);font-weight:700">(631) 921-2732</a>.</p></div>';
      }, 1200);
    });
  }

  /* --- Animate elements on scroll --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .blog-card').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

});

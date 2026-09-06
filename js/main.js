// ==========================================================================
// THEHEALINGDESK — shared behaviours
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar solid-on-scroll ---------- */
  var navbar = document.querySelector('.navbar');
  var stickyCta = document.querySelector('.sticky-cta');
  function onScroll () {
    if (window.scrollY > 40) {
      navbar && navbar.classList.add('solid');
    } else {
      navbar && navbar.classList.remove('solid');
    }
    if (stickyCta) {
      if (window.scrollY > 480) stickyCta.classList.add('show');
      else stickyCta.classList.remove('show');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var path = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close siblings within same accordion
      var accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            openItem.querySelector('.accordion-panel').style.maxHeight = null;
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          }
        });
      }
      if (isOpen) {
        item.classList.remove('open');
        panel.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Radio pill active state (visual only, input drives it) ---------- */
  document.querySelectorAll('.radio-pill input').forEach(function (input) {
    input.addEventListener('change', function () {
      var group = input.closest('.radio-group');
      if (!group) return;
      group.querySelectorAll('.radio-pill').forEach(function (p) { p.classList.remove('active'); });
      input.closest('.radio-pill').classList.add('active');
    });
  });

  /* ---------- Booking form submit — sends real email via FormSubmit.co ---------- */
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = bookingForm.querySelector('#full-name');
      var success = document.getElementById('form-success');
      var errorBox = document.getElementById('form-error');
      var submitBtn = document.getElementById('booking-submit');
      var nameSpan = document.getElementById('success-name');

      if (errorBox) errorBox.style.display = 'none';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      var targetEmail = bookingForm.getAttribute('data-formsubmit-email') || 'hello@thehealingdesk.com';
      var endpoint = 'https://formsubmit.co/ajax/' + encodeURIComponent(targetEmail);
      var formData = new FormData(bookingForm);
      var payload = {};
      formData.forEach(function (value, key) { payload[key] = value; });

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(function () {
          if (nameSpan && name) nameSpan.textContent = name.value.split(' ')[0] || 'there';
          bookingForm.style.display = 'none';
          if (success) success.classList.add('show');
          success && success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function () {
          if (errorBox) errorBox.style.display = 'block';
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request a Session'; }
        });
    });
  }

  var resetFormBtn = document.getElementById('reset-form');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', function () {
      var bookingForm2 = document.getElementById('booking-form');
      var success2 = document.getElementById('form-success');
      var errorBox2 = document.getElementById('form-error');
      if (bookingForm2) { bookingForm2.reset(); bookingForm2.style.display = 'grid'; }
      if (success2) success2.classList.remove('show');
      if (errorBox2) errorBox2.style.display = 'none';
    });
  }

});

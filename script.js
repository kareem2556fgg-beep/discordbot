// =============================================
//   Respect Arena | وزارة العدل - script.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Active Nav Link on Scroll ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id], header');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.remove('active'));
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
        else document.querySelector('#nav-home')?.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ── 2. Smooth Scroll for Nav Links ────────────────────────────────────
  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });

  // ── 3. Navbar Shrink on Scroll ────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── 4. Card Entrance Animation (Intersection Observer) ────────────────
  const cards = document.querySelectorAll('.card-item');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.classList.add('card-hidden');
    cardObserver.observe(card);
  });

  // ── 5. Rank Rows Entrance Animation ───────────────────────────────────
  const rankRows = document.querySelectorAll('.rank-row');

  const rankObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('rank-visible');
        }, i * 60);
        rankObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  rankRows.forEach(row => {
    row.classList.add('rank-hidden');
    rankObserver.observe(row);
  });

  // ── 6. Discord Tag Copy on Click ──────────────────────────────────────
  const discordTags = document.querySelectorAll('.discord-tag');

  discordTags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.setAttribute('title', 'انقر لنسخ الاسم');

    tag.addEventListener('click', () => {
      const usernameEl = tag.querySelector('span');
      if (!usernameEl) return;
      const username = usernameEl.textContent.trim();

      navigator.clipboard.writeText(username).then(() => {
        showToast(`✅ تم نسخ: ${username}`);
      }).catch(() => {
        // Fallback for older browsers
        const temp = document.createElement('textarea');
        temp.value = username;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`✅ تم نسخ: ${username}`);
      });
    });
  });

  // ── 7. Toast Notification ─────────────────────────────────────────────
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('toast-show'));

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // ── 8. Service Cards Click Feedback ───────────────────────────────────
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('.service-title')?.textContent?.trim();
      showToast(`🔗 جاري الانتقال إلى: ${title}`);
    });
  });

  // ── 9. Inject Dynamic CSS for Animations ─────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Navbar scroll state */
    .navbar.scrolled {
      padding: 0.4rem 0;
      box-shadow: 0 4px 24px rgba(0,0,0,0.35);
      transition: padding 0.3s ease, box-shadow 0.3s ease;
    }

    /* Card entrance */
    .card-hidden {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .card-hidden.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Rank row entrance */
    .rank-hidden {
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.45s ease, transform 0.45s ease;
    }
    .rank-hidden.rank-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Toast */
    .toast-notification {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(30, 20, 60, 0.95);
      color: #c4b5fd;
      border: 1px solid rgba(139, 92, 246, 0.5);
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-family: inherit;
      backdrop-filter: blur(10px);
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 9999;
      white-space: nowrap;
      direction: rtl;
      pointer-events: none;
    }
    .toast-notification.toast-show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Discord tag hover */
    .discord-tag:hover {
      background: rgba(139, 92, 246, 0.2);
      transition: background 0.2s ease;
    }
  `;
  document.head.appendChild(style);

});

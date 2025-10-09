/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Tilt Animation for Education Cards
   */
  const cards = document.querySelectorAll('#education .card-edu');

  cards.forEach(card => {
    card.style.transition = "transform 0.2s ease";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });

  /**
   * Veille Technologique - RSS Feeds
   */
  document.addEventListener("DOMContentLoaded", function () {
    // --- CONFIGURATION ---
    const RSS_FEEDS = [
      {
        name: "Canaltech",
        url: "https://canaltech.com.br/rss/",
        api: "https://api.rss2json.com/v1/api.json?rss_url=https://canaltech.com.br/rss/",
        icon: '<i class="bi bi-globe veille-source-icon canaltech"></i>',
        category: "tech",
        badge: "canaltech"
      },
      {
        name: "TechCrunch",
        url: "https://techcrunch.com/feed/",
        api: "https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/",
        icon: '<i class="bi bi-lightning-charge veille-source-icon techcrunch"></i>',
        category: "tech",
        badge: "techcrunch"
      },
      {
        name: "Wired Sécurité",
        url: "https://www.wired.com/feed/category/security/latest/rss",
        api: "https://api.rss2json.com/v1/api.json?rss_url=https://www.wired.com/feed/category/security/latest/rss",
        icon: '<i class="bi bi-shield-lock veille-source-icon wired"></i>',
        category: "securite",
        badge: "wired"
      },
      {
        name: "The Verge",
        url: "https://www.theverge.com/rss/index.xml",
        api: "https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml",
        icon: '<i class="bi bi-cpu veille-source-icon verge"></i>',
        category: "tech",
        badge: "verge"
      },
      {
        name: "MIT Tech Review (IA)",
        url: "https://www.technologyreview.com/feed/",
        api: "https://api.rss2json.com/v1/api.json?rss_url=https://www.technologyreview.com/feed/",
        icon: '<i class="bi bi-robot veille-source-icon mit"></i>',
        category: "ia",
        badge: "mit"
      }
    ];

    // --- ELEMENTS ---
    const grid = document.getElementById("veille-grid");
    const loading = document.getElementById("veille-loading");
    const error = document.getElementById("veille-error");
    const filterBtns = document.querySelectorAll(".veille-filter");

    // --- UTILS ---
    function formatDate(dateStr) {
      const d = new Date(dateStr);
      if (isNaN(d)) return "";
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
    }
    function truncate(str, n) {
      return str.length > n ? str.slice(0, n - 1) + "…" : str;
    }

    // --- FETCH & RENDER ---
    let allNews = [];
    let currentFilter = "all";

    async function fetchAllFeeds() {
      loading.style.display = "flex";
      error.style.display = "none";
      grid.innerHTML = "";
      let news = [];
      try {
        const promises = RSS_FEEDS.map(feed =>
          fetch(feed.api).then(r => r.json())
            .then(data => {
              if (!data.items) return [];
              return data.items.slice(0, 8).map(item => ({
                title: item.title,
                link: item.link,
                desc: item.description ? truncate(item.description.replace(/<[^>]+>/g, ''), 150) : "",
                img: item.enclosure?.link || item.thumbnail || "",
                date: formatDate(item.pubDate),
                source: feed.name,
                sourceIcon: feed.icon,
                sourceBadge: feed.badge,
                category: feed.category,
                raw: item
              }));
            })
        );
        const results = await Promise.all(promises);
        news = results.flat();
        // Catégorisation IA/Sécurité/Tech
        news.forEach(n => {
          if (n.sourceBadge === "mit") n.category = "ia";
          if (n.sourceBadge === "wired") n.category = "securite";
          // Ajout IA si titre ou desc contient IA/AI
          if (/(\bIA\b|\bAI\b|intelligence artificielle)/i.test(n.title + n.desc)) n.category = "ia";
          // Ajout Sécurité si titre ou desc contient sécurité/security
          if (/sécurité|security|cyber/i.test(n.title + n.desc)) n.category = "securite";
        });
        // Tri par date décroissante
        news.sort((a, b) => new Date(b.raw.pubDate) - new Date(a.raw.pubDate));
        allNews = news.slice(0, 12);
        renderNews();
      } catch (e) {
        error.style.display = "block";
      } finally {
        loading.style.display = "none";
      }
    }

    function renderNews() {
      grid.innerHTML = "";
      let filtered = allNews;
      if (currentFilter !== "all") {
        filtered = allNews.filter(n => n.category === currentFilter);
      }
      // Filtre pour ne garder que les news avec une image valide (URL non vide et non placeholder)
      filtered = filtered.filter(n =>
        n.img &&
        n.img !== "" &&
        !/placeholder-projet\.jpg$/.test(n.img)
      );
      if (filtered.length === 0) {
        grid.innerHTML = `<div style="color:#fff;font-size:18px;text-align:center;padding:40px;">Aucune actualité trouvée pour ce filtre.</div>`;
        return;
      }
      filtered.forEach((n, i) => {
        grid.innerHTML += `
          <div class="veille-card" style="animation-delay:${i * 0.07}s;">
            <img class="veille-img" src="${n.img}" alt="${n.title}" onerror="this.onerror=null;this.src='assets/img/placeholder-projet.jpg';">
            <div class="veille-content">
              <div class="veille-badges">
                <span class="veille-badge veille-badge-${n.category}">${n.category === "ia" ? "IA" : n.category === "securite" ? "Sécurité" : "Tech News"}</span>
                <span class="veille-badge veille-badge-${n.sourceBadge}">${n.sourceIcon}${n.source}</span>
              </div>
              <div class="veille-title">${n.title}</div>
              <div class="veille-desc">${n.desc}</div>
              <div class="veille-meta">
                <span class="veille-date">${n.date}</span>
                <a class="veille-link" href="${n.link}" target="_blank" rel="noopener">Lire plus</a>
              </div>
            </div>
          </div>
        `;
      });
    }

    // --- FILTRES ---
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("veille-active"));
        this.classList.add("veille-active");
        currentFilter = this.getAttribute("data-filter");
        renderNews();
      });
    });

    // --- INIT ---
    fetchAllFeeds();
  });

})();

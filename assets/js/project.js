// assets/js/project.js
// Petit script pour remplir project.html en fonction de ?id=...
(function () {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const projects = {
    'hackathon-sql': {
      title: 'Projet Hackathon - SQL',
      img: 'assets/img/masonry-portfolio/imj-code.png',
      github: '#',
      demo: '#',
      sections: {
        'Contexte': 'J’ai participé à un hackathon visant à construire une application axée sur la gestion et la requêtage de données. L’objectif était d’explorer des algorithmes de connexion et d’optimisation des requêtes en équipe.',
        'Besoin': 'Prototyper rapidement une solution permettant la création, lecture et visualisation d’un grand volume de données structurées.',
        'Environnement': 'Stack utilisée : HTML/CSS/JS, PostgreSQL, scripts Node pour préparation des jeux de données. Travail en équipe avec Git (GitHub).',
        'Réalisation': 'Conception d’un prototype avec interface web et endpoints API, modélisation de la base et optimisation de requêtes pour des gros jeux de données.',
        'Bilan': 'Prototype fonctionnel livré dans les délais ; amélioration notable des compétences SQL et travail collaboratif en sprint.',
        'Production associée': 'Lien vers un dépôt et une démo (exemple).',
        'Compétence mise en œuvre': 'SQL avancé, modélisation de données, travail en équipe, gestion de versions.'
      }
    },
    'portfolio': {
      title: 'Projet Perso - Portfolio',
      img: 'assets/img/portfolio/branding-1.jpg',
      github: '#',
      demo: '#',
      sections: {
        'Contexte': 'Création d’un portfolio pour présenter des projets personnels et professionnels, avec un design responsive.',
        'Besoin': 'Avoir une vitrine claire et accessible pour présenter compétences et réalisations.',
        'Environnement': 'HTML, CSS, JS, librairies front-end légères, images optimisées et bonnes pratiques d’accessibilité.',
        'Réalisation': 'Design responsive, sections pour projets/certifications/veille, animations légères et optimisation pour performance.',
        'Bilan': 'Site simple, accessible et maintenable ; permet d’attirer l’attention sur les projets clés.',
        'Production associée': 'Source du site (ex : dépôt), lien vers CV.',
        'Compétence mise en œuvre': 'HTML/CSS, design responsive, optimisation d’images, principes d’accessibilité.'
      }
    },
    'gestion-financiere': {
      title: 'Projet Perso - Gestion Financière',
      img: 'assets/img/portfolio/product-1.jpg',
      github: '#',
      demo: '#',
      sections: {
        'Contexte': 'Application pour suivre dépenses et revenus, pensée pour un usage personnel et pédagogique.',
        'Besoin': 'Suivi simple et visualisation des flux financiers pour améliorer la compréhension des dépenses.',
        'Environnement': 'JS frontend, stockage local ou backend léger, charting pour visualisation.',
        'Réalisation': 'Formulaires de saisie, tableaux de synthèse, graphiques et export CSV.',
        'Bilan': 'Prototype utile pour la gestion personnelle ; base solide pour une version complète avec backend.',
        'Production associée': 'Dépôt GitHub et captures d’écran.',
        'Compétence mise en œuvre': 'JavaScript, UX basique, gestion d’état et visualisation de données.'
      }
    }
  };

  function renderProject(project) {
    const container = document.getElementById('project-detail');
    if (!container) return;
    container.innerHTML = '';

    // Wrap content in a centered container
    const wrap = document.createElement('div');
    wrap.className = 'project-container';

    // Hero / summary (centered)
    const hero = document.createElement('div');
    hero.className = 'project-detail-hero mb-4';

    const heroInner = document.createElement('div');
    heroInner.className = 'project-meta d-flex flex-column flex-lg-row gap-4 align-items-start';

    // Image
    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img';
    if (project.img) {
      const img = document.createElement('img');
      img.src = project.img;
      img.alt = project.title;
      img.className = 'img-fluid rounded';
      imgWrap.appendChild(img);
    }

    // Right column: title, short desc and actions
    const right = document.createElement('div');
    right.className = 'project-summary';

    const title = document.createElement('h1');
    title.textContent = project.title;
    title.tabIndex = -1;
    right.appendChild(title);

    // short excerpt (use first section if exists)
    const firstKey = Object.keys(project.sections||{})[0];
    if (firstKey) {
      const excerpt = document.createElement('p');
      excerpt.className = 'lead';
      excerpt.textContent = project.sections[firstKey].slice(0,220) + (project.sections[firstKey].length>220? '…':'');
      right.appendChild(excerpt);
    }

    // actions (github / demo)
    const actions = document.createElement('div');
    actions.className = 'project-actions mt-3';

    if (project.demo && project.demo !== '#') {
      const aDemo = document.createElement('a');
      aDemo.href = project.demo;
      aDemo.target = '_blank';
      aDemo.rel = 'noopener noreferrer';
      aDemo.className = 'btn btn-primary me-2';
      aDemo.textContent = 'Voir la démo';
      actions.appendChild(aDemo);
    }
    if (project.github && project.github !== '#') {
      const aGithub = document.createElement('a');
      aGithub.href = project.github;
      aGithub.target = '_blank';
      aGithub.rel = 'noopener noreferrer';
      aGithub.className = 'btn btn-outline-light';
      aGithub.textContent = 'Voir le code';
      actions.appendChild(aGithub);
    }

    // Table of contents (links to sections)
    const toc = document.createElement('nav');
    toc.className = 'project-toc mt-3 mb-3';
    const tocList = document.createElement('ul');
    tocList.className = 'list-unstyled d-flex flex-wrap gap-2';
    Object.keys(project.sections).forEach(function(sectionTitle){
      const id = sectionTitle.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#'+id;
      a.className = 'badge bg-light text-dark py-2 px-3';
      a.textContent = sectionTitle;
      li.appendChild(a);
      tocList.appendChild(li);
    });
    toc.appendChild(tocList);

    right.appendChild(actions);
    right.appendChild(toc);

    heroInner.appendChild(imgWrap);
    heroInner.appendChild(right);
    hero.appendChild(heroInner);
    wrap.appendChild(hero);

    // Sections: each as a card for visual clarity
    Object.keys(project.sections).forEach(function (sectionTitle) {
      const id = sectionTitle.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
      const section = document.createElement('section');
      section.className = 'project-section mb-3';
      section.id = id;

      const card = document.createElement('div');
      card.className = 'card project-section-card';
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const h2 = document.createElement('h2');
      h2.textContent = sectionTitle;
      h2.className = 'h5';
      cardBody.appendChild(h2);

      const p = document.createElement('p');
      p.textContent = project.sections[sectionTitle];
      cardBody.appendChild(p);

      card.appendChild(cardBody);
      section.appendChild(card);
      wrap.appendChild(section);
    });

    // small back link centered
    const backWrap = document.createElement('div');
    backWrap.className = 'text-center mt-4';
    backWrap.innerHTML = '<a href="index.html" class="btn btn-link">← Retour aux projets</a>';
    wrap.appendChild(backWrap);

    container.appendChild(wrap);

    // accessibility: move focus to title
    setTimeout(()=>{ const t = wrap.querySelector('h1'); if (t) t.focus(); },120);
  }

  function renderNotFound(id) {
    const container = document.getElementById('project-detail');
    if (!container) return;
    container.innerHTML = `<h1>Projet introuvable</h1><p>Identifiant recherché: ${id}</p><p><a href="index.html">Retour</a></p>`;
  }

  // Exécution
  const id = getQueryParam('id');
  if (!id) {
    // Par défaut, afficher message ou premier projet
    renderNotFound('aucun id fourni');
  } else if (projects[id]) {
    document.title = projects[id].title + ' — Détail';
    renderProject(projects[id]);
  } else {
    renderNotFound(id);
  }

})();

const DATA_URL = "./data/portfolio.json";

async function loadPortfolio() {
  const response = await fetch(DATA_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Could not load portfolio data (${response.status}).`);
  }

  const data = await response.json();
  if (!data.site || !Array.isArray(data.projects)) {
    throw new Error("Portfolio data has an unexpected shape.");
  }

  return data;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value || "";
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderBadgeLabel() {
  const label = document.getElementById("homeBadgeLabel");
  if (!label) return;

  const characters = Array.from(
    "VLAD FROLOV • DESIGN • IMAGE • TYPE • SOCIAL • ",
  );
  const center = 120;
  const radius = 91;
  const step = 360 / characters.length;
  const namespace = "http://www.w3.org/2000/svg";

  characters.forEach((character, index) => {
    if (character === " ") return;

    const angle = -90 + index * step;
    const radians = (angle * Math.PI) / 180;
    const x = center + radius * Math.cos(radians);
    const y = center + radius * Math.sin(radians);
    const letter = document.createElementNS(namespace, "text");

    letter.textContent = character;
    letter.setAttribute("x", x.toFixed(2));
    letter.setAttribute("y", y.toFixed(2));
    letter.setAttribute("text-anchor", "middle");
    letter.setAttribute("dominant-baseline", "middle");
    letter.setAttribute("transform", `rotate(${angle + 90} ${x} ${y})`);
    label.appendChild(letter);
  });
}

function projectUrl(project) {
  return `./project.html?project=${encodeURIComponent(project.id)}`;
}

function renderImageGallery(project, gallery) {
  gallery.setAttribute(
    "aria-label",
    project.galleryLabel || `${project.title} project images`,
  );
  (project.gallery || []).forEach((media) => {
    const displayClass = media.display
      ? ` gallery-item--${media.display}`
      : "";
    const figure = createElement(
      "figure",
      `gallery-item gallery-item--${media.layout}${displayClass}`,
    );
    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt;
    image.loading = "lazy";
    figure.appendChild(image);
    if (media.caption) {
      figure.appendChild(
        createElement("figcaption", "gallery-caption", media.caption),
      );
    }
    gallery.appendChild(figure);
  });
}

function renderPostGrid(project, gallery) {
  const dialog = document.getElementById("postLightbox");
  const track = document.getElementById("postLightboxTrack");
  const title = document.getElementById("postLightboxTitle");
  const counter = document.getElementById("postLightboxCounter");
  const closeButton = document.getElementById("postLightboxClose");
  const previousButton = document.getElementById("postLightboxPrevious");
  const nextButton = document.getElementById("postLightboxNext");
  let activeIndex = 0;
  let activeTrigger = null;

  gallery.className = "project-post-grid";
  gallery.setAttribute("aria-label", "Wellwet social posts");

  function updateLightbox(index) {
    const total = track.children.length;
    activeIndex = Math.max(0, Math.min(index, total - 1));
    counter.textContent = `${activeIndex + 1} / ${total}`;
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === total - 1;
  }

  function moveTo(index, behavior = "smooth") {
    const target = Math.max(0, Math.min(index, track.children.length - 1));
    track.scrollTo({ left: target * track.clientWidth, behavior });
    updateLightbox(target);
  }

  function openPost(post, trigger) {
    activeTrigger = trigger;
    title.textContent = post.title;
    track.replaceChildren();

    post.slides.forEach((slide, index) => {
      const figure = createElement("figure", "post-lightbox-slide");
      const image = document.createElement("img");
      image.src = slide.src;
      image.alt = slide.alt;
      if (index > 0) image.loading = "lazy";
      figure.appendChild(image);
      track.appendChild(figure);
    });

    const hasMultipleSlides = post.slides.length > 1;
    previousButton.hidden = !hasMultipleSlides;
    nextButton.hidden = !hasMultipleSlides;
    updateLightbox(0);
    document.body.classList.add("lightbox-open");
    dialog.showModal();
    requestAnimationFrame(() => moveTo(0, "auto"));
    closeButton.focus();
  }

  project.posts.forEach((post) => {
    const button = createElement("button", "post-card");
    button.type = "button";
    button.setAttribute("aria-label", `Open ${post.title}`);

    const image = document.createElement("img");
    image.src = post.slides[0].src;
    image.alt = post.slides[0].alt;
    image.loading = "lazy";

    const label = createElement("span", "post-card-label", post.title);
    button.append(image, label);
    if (post.slides.length > 1) {
      button.appendChild(
        createElement("span", "post-card-count", `${post.slides.length} →`),
      );
    }
    button.addEventListener("click", () => openPost(post, button));
    gallery.appendChild(button);
  });

  previousButton.addEventListener("click", () => moveTo(activeIndex - 1));
  nextButton.addEventListener("click", () => moveTo(activeIndex + 1));
  closeButton.addEventListener("click", () => dialog.close());

  track.addEventListener("scroll", () => {
    if (!track.clientWidth) return;
    updateLightbox(Math.round(track.scrollLeft / track.clientWidth));
  });

  track.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    },
    { passive: false },
  );

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveTo(activeIndex - 1);
    if (event.key === "ArrowRight") moveTo(activeIndex + 1);
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    activeTrigger?.focus();
  });
}

function renderHome(data) {
  setText("heroEyebrow", data.site.eyebrow);
  setText("hero-title", data.site.headline);
  setText("heroIntro", data.site.intro);
  setText("about-title", data.site.about.title);
  setText("contactText", data.site.contact.text);
  setText("copyright", `© ${new Date().getFullYear()}`);

  const emailLink = document.getElementById("emailLink");
  emailLink.href = `mailto:${data.site.contact.email}`;

  const aboutCopy = document.getElementById("aboutCopy");
  data.site.about.paragraphs.forEach((paragraph) => {
    aboutCopy.appendChild(createElement("p", "", paragraph));
  });

  const capabilitiesList = document.getElementById("capabilitiesList");
  data.site.capabilities.forEach((capability) => {
    capabilitiesList.appendChild(createElement("li", "", capability));
  });

  const grid = document.getElementById("projectGrid");
  const projects = data.projects.filter((project) => project.published !== false);

  projects.forEach((project) => {
    const portraitClass =
      project.card.orientation === "portrait" ? "project-card--portrait" : "";
    const article = createElement(
      "article",
      `project-card project-card--${project.card.size} ${portraitClass}`,
    );
    article.style.setProperty("--card-accent", project.accent);

    const link = createElement("a", "project-card-link");
    link.href = projectUrl(project);
    link.setAttribute("aria-label", `View ${project.title} case study`);

    const imageWrap = createElement("div", "project-card-image");
    const image = document.createElement("img");
    image.src = project.cover.src;
    image.alt = project.cover.alt;
    image.loading = "lazy";
    imageWrap.appendChild(image);

    const text = createElement("div", "project-card-text");
    const textMain = createElement("div");
    textMain.appendChild(
      createElement(
        "div",
        "project-card-meta",
        `${project.type} / ${project.year}`,
      ),
    );
    textMain.appendChild(createElement("h3", "", project.title));
    textMain.appendChild(createElement("p", "", project.summary));
    text.appendChild(textMain);
    text.appendChild(createElement("span", "project-card-arrow", "↗"));

    link.append(imageWrap, text);
    article.appendChild(link);
    grid.appendChild(article);
  });

  setText("projectStatus", "");
}

function renderProject(data) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("project");
  const project = data.projects.find(
    (item) => item.id === id && item.published !== false,
  );

  if (!project) {
    document.title = "Project not found — Vlad Frolov";
    document.getElementById("projectContent").hidden = true;
    document.getElementById("notFound").hidden = false;
    return;
  }

  document.title = `${project.title} — Vlad Frolov`;
  document.documentElement.style.setProperty("--project-accent", project.accent);
  setText("projectType", project.type);
  setText("projectTitle", project.title);
  setText("projectSummary", project.summary);
  setText("projectYear", project.year);
  setText("projectRole", project.role);
  setText("projectDisciplines", project.disciplines.join(", "));

  const leadImage = document.getElementById("projectLeadImage");
  leadImage.src = project.cover.src;
  leadImage.alt = project.cover.alt;

  const storyCopy = document.getElementById("projectStoryCopy");
  project.story.forEach((paragraph) => {
    storyCopy.appendChild(createElement("p", "", paragraph));
  });

  const gallery = document.getElementById("projectGallery");
  const hasPosts = Array.isArray(project.posts) && project.posts.length;
  const hasGallery = Array.isArray(project.gallery) && project.gallery.length;

  if (hasPosts) renderPostGrid(project, gallery);

  if (hasGallery) {
    let imageGallery = gallery;
    if (hasPosts) {
      imageGallery = createElement("section", "project-gallery");
      gallery.insertAdjacentElement("afterend", imageGallery);
    }
    if (project.galleryStyle) {
      imageGallery.classList.add(`project-gallery--${project.galleryStyle}`);
    }
    renderImageGallery(project, imageGallery);
  }

  const publishedProjects = data.projects.filter(
    (item) => item.published !== false,
  );
  const currentIndex = publishedProjects.findIndex(
    (item) => item.id === project.id,
  );
  const nextProject =
    publishedProjects[(currentIndex + 1) % publishedProjects.length];
  const nextLink = document.getElementById("nextProjectLink");
  nextLink.href = projectUrl(nextProject);
  nextLink.textContent = `Next: ${nextProject.title} →`;
}

async function init() {
  try {
    renderBadgeLabel();
    const data = await loadPortfolio();
    if (document.body.dataset.page === "project") {
      renderProject(data);
    } else {
      renderHome(data);
    }
  } catch (error) {
    console.error(error);
    if (document.body.dataset.page === "project") {
      document.getElementById("projectContent").hidden = true;
      document.getElementById("notFound").hidden = false;
      setText("notFoundTitle", "The project could not be loaded.");
    } else {
      setText(
        "projectStatus",
        "Projects could not be loaded. Please try again shortly.",
      );
    }
  }
}

init();

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

function projectUrl(project) {
  return `./project.html?project=${encodeURIComponent(project.id)}`;
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
  project.gallery.forEach((media) => {
    const figure = createElement(
      "figure",
      `gallery-item gallery-item--${media.layout}`,
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

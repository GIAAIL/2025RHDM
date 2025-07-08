// src/modules/init/setupStoryElements.js
export function setupStoryElements(config, map) {
  const story = document.getElementById("story");
  const features = document.createElement("div");
  features.setAttribute("id", "features");

  const header = document.createElement("div");
  const footer = document.createElement("div");

  // Header
  if (config.title) {
    const titleText = document.createElement("h1");
    titleText.innerText = config.title;
    header.appendChild(titleText);
  }

  if (config.subtitle) {
    const subtitleText = document.createElement("h2");
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
  }

  if (config.byline) {
    const bylineText = document.createElement("p");
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
  }

  if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute("id", "header");
    story.appendChild(header);
  }

  // Chapters
  config.chapters.forEach((record, idx) => {
    const container = document.createElement("div");
    const chapter = document.createElement("div");

    container.setAttribute("id", record.id);
    container.classList.add("step");
    if (idx === 0) container.classList.add("active");

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(record.alignment || "centered");
    if (record.hidden) container.classList.add("hidden");

    // 判斷是否需要加入 Three.js viewer
    if (record.plyViewer === true) {
      const threeContainer = document.createElement("div");
      threeContainer.setAttribute("id", "three-container");
      threeContainer.style.width = "100%";
      threeContainer.style.height = "500px";
      threeContainer.style.margin = "1em 0";
      chapter.appendChild(threeContainer);
    }

    features.appendChild(container);
  });

  story.appendChild(features);

  // Navbar for chapter jump
  config.chapters.forEach((c) => {
    if (c.id !== "chapter-01") {
      const a = document.createElement("a");
      const linkText = document.createTextNode(c.title);
      a.classList.add("nav-item");
      a.appendChild(linkText);
      a.href = "#" + c.id;
      a.onclick = function () {
        map.flyTo({
          center: c.location.center,
          zoom: c.location.zoom,
          pitch: c.location.pitch,
          bearing: c.location.bearing,
          essential: true,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          duration: 1200,
        });
      };
      document.getElementById("navbar").appendChild(a);
    }
  });

  // Footer
  if (config.footer) {
    const footerText = document.createElement("p");
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
  }
  if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute("id", "footer");
    story.appendChild(footer);
  }
}

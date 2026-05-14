// ─────────────────────────────────────────────────────────────────────────────
// DATA — hero carousel images, application slides, and manufacturing steps.
// Replace these arrays to update page content without touching markup.
// ─────────────────────────────────────────────────────────────────────────────
const heroImages = [
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1621468635840-e9a200ed32ec?auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1300&q=80"
];

const appSlides = [
  {
    title: "Fishnet Manufacturing",
    text: "High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Agriculture Irrigation",
    text: "Pipes and fittings engineered for high-pressure water flow in modern agricultural systems.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Municipal Water Supply",
    text: "Corrosion-free HDPE systems ensuring longevity and safety for urban infrastructure.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Industrial Process Lines",
    text: "Chemical-resistant pipe networks ideal for demanding industrial applications.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Urban Drainage Networks",
    text: "High-flow drainage solutions built for long service life in municipal and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Telecom Ducting",
    text: "Durable protective conduits for modern fiber deployment and underground cable management.",
    image: "https://images.unsplash.com/photo-1621468635840-e9a200ed32ec?auto=format&fit=crop&w=900&q=80"
  }
];

const processData = [
  {
    label: "Raw Material",
    title: "High-Grade Raw Material Selection",
    text: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    image: heroImages[0]
  },
  {
    label: "Extrusion",
    title: "Precision Extrusion Control",
    text: "Closed-loop control systems monitor melt flow and pressure to produce dimensionally consistent pipes.",
    points: ["Automated feed calibration", "Tight wall-thickness tolerance"],
    image: heroImages[1]
  },
  {
    label: "Cooling",
    title: "Controlled Cooling Cycle",
    text: "A staged cooling process prevents deformation and guarantees stability during high-speed production.",
    points: ["Uniform temperature reduction", "Improved structural integrity"],
    image: heroImages[2]
  },
  {
    label: "Sizing",
    title: "Online Sizing & Calibration",
    text: "Laser gauges continuously monitor diameter and ovality to maintain product compliance.",
    points: ["Real-time calibration", "Automated quality alerts"],
    image: heroImages[3]
  },
  {
    label: "Quality Control",
    title: "Rigorous Quality Assurance",
    text: "Every batch undergoes hydrostatic pressure testing and dimensional checks before dispatch.",
    points: ["Pressure validation", "Material traceability"],
    image: heroImages[4]
  },
  {
    label: "Marking",
    title: "Standardized Product Marking",
    text: "Each pipe is marked with standards, grade, and traceability data for field-level identification.",
    points: ["Clear coding system", "Long-life print durability"],
    image: heroImages[5]
  },
  {
    label: "Cutting",
    title: "Length Accuracy Cutting",
    text: "Servo-driven cutting units ensure exact cut lengths for installation-ready delivery.",
    points: ["Clean edge finish", "Batch consistency"],
    image: heroImages[2]
  },
  {
    label: "Packaging",
    title: "Secure Final Packaging",
    text: "Pipes and coils are strapped and wrapped for safe transport with reduced handling risk.",
    points: ["Impact-safe bundling", "Dispatch-ready labeling"],
    image: heroImages[3]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// STICKY HEADER — slides in after user scrolls 75 % of the viewport height
// downward, and hides again when scrolling back toward the top.
// ─────────────────────────────────────────────────────────────────────────────
const stickyHeader = document.getElementById("stickyHeader");
const topHeader = document.getElementById("topHeader");
let lastScrollY = window.scrollY;

function handleStickyHeader() {
  const threshold = window.innerHeight * 0.75;
  const currentY = window.scrollY;
  const scrollingDown = currentY > lastScrollY;

  if (currentY > threshold && scrollingDown) {
    stickyHeader.classList.add("show");
    stickyHeader.setAttribute("aria-hidden", "false");
  } else if (currentY < threshold || !scrollingDown) {
    stickyHeader.classList.remove("show");
    stickyHeader.setAttribute("aria-hidden", "true");
  }

  lastScrollY = currentY;
}

// passive:true tells the browser the handler won't call preventDefault(),
// allowing it to optimise scroll performance.
window.addEventListener("scroll", handleStickyHeader, { passive: true });

// ─────────────────────────────────────────────────────────────────────────────
// HERO CAROUSEL — thumbnail strip + prev/next arrows + image crossfade
// ─────────────────────────────────────────────────────────────────────────────
const heroMainImage = document.getElementById("heroMainImage");
const thumbRow = document.getElementById("thumbRow");
const heroCarousel = document.getElementById("heroCarousel");
const zoomPreview = document.getElementById("zoomPreview");
let currentHeroIndex = 0;

/** Adds the .is-fading CSS class briefly so the new image fades in. */
function swapImageSmooth(imgElement, nextSrc) {
  if (!imgElement || imgElement.src === nextSrc) return;
  imgElement.classList.add("is-fading");
  window.setTimeout(() => { imgElement.src = nextSrc; }, 120);
}

/** Rebuilds the thumbnail strip, marking the active thumb. */
function renderThumbs() {
  thumbRow.innerHTML = "";
  heroImages.forEach((src, idx) => {
    const button = document.createElement("button");
    button.className = "thumb" + (idx === currentHeroIndex ? " active" : "");
    button.setAttribute("aria-label", `View image ${idx + 1}`);
    button.innerHTML = `<img src="${src}" alt="Thumbnail ${idx + 1}" />`;
    button.addEventListener("click", () => {
      currentHeroIndex = idx;
      updateHeroImage();
    });
    thumbRow.appendChild(button);
  });
}

/** Swaps the main image and refreshes thumbnails. */
function updateHeroImage() {
  swapImageSmooth(heroMainImage, heroImages[currentHeroIndex]);
  zoomPreview.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
  renderThumbs();
}

// Remove the fading class once the new image has fully loaded.
heroMainImage.addEventListener("load", () => {
  heroMainImage.classList.remove("is-fading");
});

// Arrow buttons (prev / next) cycle through heroImages.
document.querySelectorAll("#heroCarousel .carousel-arrow").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const isNext = arrow.dataset.dir === "next";
    currentHeroIndex = isNext
      ? (currentHeroIndex + 1) % heroImages.length
      : (currentHeroIndex - 1 + heroImages.length) % heroImages.length;
    updateHeroImage();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE ZOOM — lens overlay on hover + side-panel magnified preview.
//
// Approach:
//  1. Compute the image's actual rendered size inside the container (object-fit: cover).
//  2. Use a square lens (LENS_RATIO of the smaller dimension) so the square
//     350 × 350 preview has the same aspect ratio as the lens → no stretching.
//  3. Map the lens area to source-image coordinates and set backgroundSize /
//     backgroundPosition so the preview shows exactly what the lens covers.
//  4. Clamp offsets so the preview never shows empty space at edges.
// ─────────────────────────────────────────────────────────────────────────────
const zoomLens = document.getElementById("zoomLens");
const LENS_RATIO = 0.21;

heroCarousel.addEventListener("mouseenter", () => {
  zoomPreview.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
});

heroCarousel.addEventListener("mousemove", (event) => {
  const carRect = heroCarousel.getBoundingClientRect();
  const prevRect = zoomPreview.getBoundingClientRect();
  if (prevRect.width === 0) return;

  // Compute the actual rendered size of the image accounting for object-fit: cover
  const img = heroCarousel.querySelector("img");
  const naturalW = (img && img.naturalWidth) || carRect.width;
  const naturalH = (img && img.naturalHeight) || carRect.height;
  const imageAspect = naturalW / naturalH;
  const containerAspect = carRect.width / carRect.height;
  let renderedW, renderedH;
  if (imageAspect > containerAspect) {
    renderedH = carRect.height;
    renderedW = renderedH * imageAspect;
  } else {
    renderedW = carRect.width;
    renderedH = renderedW / imageAspect;
  }
  const imgOffsetX = (renderedW - carRect.width) / 2;
  const imgOffsetY = (renderedH - carRect.height) / 2;

  // Use a square lens to match the square preview (no stretching)
  const lensSize = Math.min(carRect.width, carRect.height) * LENS_RATIO;

  let lx = event.clientX - carRect.left - lensSize / 2;
  let ly = event.clientY - carRect.top - lensSize / 2;

  lx = Math.max(0, Math.min(carRect.width - lensSize, lx));
  ly = Math.max(0, Math.min(carRect.height - lensSize, ly));

  zoomLens.style.width = lensSize + "px";
  zoomLens.style.height = lensSize + "px";
  zoomLens.style.left = lx + "px";
  zoomLens.style.top = ly + "px";
  zoomLens.style.display = "block";
  zoomLens.style.background = "rgba(82, 82, 82, 0.3)";
  zoomLens.style.border = "1px solid #B1B1B1";

  const zoomScale = prevRect.width / lensSize;
  const scaledW = renderedW * zoomScale;
  const scaledH = renderedH * zoomScale;
  const bgOffsetX = Math.max(0, Math.min((lx + imgOffsetX) * zoomScale, scaledW - prevRect.width));
  const bgOffsetY = Math.max(0, Math.min((ly + imgOffsetY) * zoomScale, scaledH - prevRect.height));

  zoomPreview.style.backgroundSize = `${scaledW}px ${scaledH}px`;
  zoomPreview.style.backgroundPosition = `-${bgOffsetX}px -${bgOffsetY}px`;
  zoomPreview.classList.add("show");
});

heroCarousel.addEventListener("mouseleave", () => {
  zoomLens.style.display = "none";
  zoomPreview.classList.remove("show");
});

// ─────────────────────────────────────────────────────────────────────────────
// APPLICATIONS SLIDER — horizontally scrollable cards with prev / next buttons
// ─────────────────────────────────────────────────────────────────────────────
const appsRow = document.getElementById("appsRow");

/** Renders application cards from the appSlides data array. */
function renderApps() {
  appsRow.innerHTML = "";
  appSlides.forEach((item) => {
    const card = document.createElement("article");
    card.className = "app-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="app-overlay">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    appsRow.appendChild(card);
  });
}

/**
 * Returns the pixel distance to scroll by one card + gap,
 * measured from the live DOM so it adapts to any screen size.
 */
function getScrollAmount(row, cardSelector) {
  const card = row.querySelector(cardSelector);
  if (!card) return row.clientWidth * 0.8;
  const gap = parseFloat(window.getComputedStyle(row).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}

document.getElementById("appsPrev").addEventListener("click", () => {
  appsRow.scrollBy({ left: -getScrollAmount(appsRow, ".app-card"), behavior: "smooth" });
});

document.getElementById("appsNext").addEventListener("click", () => {
  appsRow.scrollBy({ left: getScrollAmount(appsRow, ".app-card"), behavior: "smooth" });
});

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS PANEL — tabbed step display with image crossfade
// ─────────────────────────────────────────────────────────────────────────────
const processTabs      = document.getElementById("processTabs");
const processStepPill  = document.getElementById("processStepPill");
const processTitle     = document.getElementById("processTitle");
const processText      = document.getElementById("processText");
const processPoints    = document.getElementById("processPoints");
const processImage     = document.getElementById("processImage");
const processPrev      = document.getElementById("processPrev");
const processNext      = document.getElementById("processNext");
const processPrevBottom = document.getElementById("processPrevBottom");
const processNextBottom = document.getElementById("processNextBottom");
let processIndex = 0;

/** Rebuilds the tab strip, highlighting the active step. */
function renderProcessTabs() {
  processTabs.innerHTML = "";
  processData.forEach((step, idx) => {
    const tab = document.createElement("button");
    tab.className = "process-tab" + (idx === processIndex ? " active" : "");
    tab.textContent = step.label;
    tab.addEventListener("click", () => {
      processIndex = idx;
      updateProcessPanel();
    });
    processTabs.appendChild(tab);
  });
}

/** Updates all process panel content (title, body, points, image, pill). */
function updateProcessPanel() {
  const data = processData[processIndex];
  processTitle.textContent = data.title;
  processText.textContent  = data.text;
  swapImageSmooth(processImage, data.image);
  processStepPill.textContent = `Step ${processIndex + 1}/${processData.length}: ${data.label}`;
  processPoints.innerHTML = data.points.map((p) => `<li>${p}</li>`).join("");
  renderProcessTabs();
}

processImage.addEventListener("load", () => {
  processImage.classList.remove("is-fading");
});

function goToPrevProcessStep() {
  processIndex = (processIndex - 1 + processData.length) % processData.length;
  updateProcessPanel();
}

function goToNextProcessStep() {
  processIndex = (processIndex + 1) % processData.length;
  updateProcessPanel();
}

processPrev.addEventListener("click", goToPrevProcessStep);
processNext.addEventListener("click", goToNextProcessStep);
processPrevBottom.addEventListener("click", goToPrevProcessStep);
processNextBottom.addEventListener("click", goToNextProcessStep);

// ─────────────────────────────────────────────────────────────────────────────
// FORMS — prevent default submission on all forms (handled server-side)
// ─────────────────────────────────────────────────────────────────────────────
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});

// ─────────────────────────────────────────────────────────────────────────────
// INIT — run all rendering functions on page load
// ─────────────────────────────────────────────────────────────────────────────
updateHeroImage();
renderApps();
updateProcessPanel();
handleStickyHeader();

// Ensure the static top-header sits below the sticky one in stacking order.
if (topHeader) topHeader.style.zIndex = "80";

// ─────────────────────────────────────────────────────────────────────────────
// MODALS — open / close for Download Datasheet and Request Quote dialogs
// ─────────────────────────────────────────────────────────────────────────────

/** Opens a modal by id, locking page scroll. */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

/** Closes a modal by id, restoring page scroll. */
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Trigger buttons
document.getElementById("datasheetBtn").addEventListener("click", () => openModal("catalogueModal"));
document.getElementById("requestQuoteBtn").addEventListener("click", () => openModal("callbackModal"));

// Close buttons inside each modal
document.getElementById("closeCatalogueModal").addEventListener("click", () => closeModal("catalogueModal"));
document.getElementById("closeCallbackModal").addEventListener("click",  () => closeModal("callbackModal"));

// Click on the backdrop (outside the modal card) also closes it.
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Escape key closes any open modal.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => closeModal(m.id));
  }
});



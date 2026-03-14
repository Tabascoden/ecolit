import { landingContent } from "./content.js?v=20260313c";

const isPrototypeMode =
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const app = {
  header: document.querySelector("#site-header"),
  main: document.querySelector("#main-content"),
  footer: document.querySelector("#site-footer"),
};

const logoUrl = new URL("./assets/ecolit-logo.svg", import.meta.url).href;

const trackEvent = (eventName, detail = {}) => {
  const payload = { event: eventName, ...detail };

  // TODO: Replace or extend this helper with the production analytics layer
  // from the real site once the WordPress theme or GTM container is available.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  } else {
    console.info("[analytics]", payload);
  }
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function renderField(label, name, type, required) {
  return `
    <label class="field ${name === "project_location" ? "field--full" : ""}">
      <span>${escapeHtml(label)}${required ? ' <span aria-hidden="true">*</span>' : ""}</span>
      <input type="${type}" name="${name}" ${required ? "required" : ""} aria-describedby="${name}-error">
      <small class="field__error" id="${name}-error"></small>
    </label>
  `;
}

function renderSelectField(label, name, options, required) {
  return `
    <label class="field">
      <span>${escapeHtml(label)}${required ? ' <span aria-hidden="true">*</span>' : ""}</span>
      <select name="${name}" ${required ? "required" : ""} aria-describedby="${name}-error">
        <option value="">Select...</option>
        ${options
          .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
          .join("")}
      </select>
      <small class="field__error" id="${name}-error"></small>
    </label>
  `;
}

function renderTextArea(label, name, required, placeholder) {
  return `
    <label class="field field--full">
      <span>${escapeHtml(label)}${required ? ' <span aria-hidden="true">*</span>' : ""}</span>
      <textarea name="${name}" rows="5" ${required ? "required" : ""} placeholder="${escapeHtml(
        placeholder,
      )}" aria-describedby="${name}-error"></textarea>
      <small class="field__error" id="${name}-error"></small>
    </label>
  `;
}

function renderFileField(label, name) {
  return `
    <label class="field field--full">
      <span>${escapeHtml(label)}</span>
      <input type="file" name="${name}" multiple accept=".pdf,.dwg,.zip,.png,.jpg,.jpeg" aria-describedby="${name}-hint">
      <small class="field__hint" id="${name}-hint">Prototype note: direct file uploads need backend wiring in the live site. Use the link field above for handoff-safe testing.</small>
    </label>
  `;
}

const renderHeader = () => {
  const navLinks = landingContent.nav
    .map(
      (item) =>
        `<a class="site-nav__link" href="${item.href}">${escapeHtml(item.label)}</a>`,
    )
    .join("");

  app.header.innerHTML = `
    <div class="shell shell--header">
      <a class="brand" href="#top" aria-label="${escapeHtml(
        landingContent.brand.name,
      )} home">
        <img class="brand__logo" src="${logoUrl}" alt="${escapeHtml(
          landingContent.brand.logoAlt,
        )}">
      </a>
      <button
        class="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="site-nav"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <div class="site-nav__links">
          ${navLinks}
        </div>
        <div class="site-nav__actions">
          <a class="site-nav__secondary" href="${landingContent.legacyLinks.homeowners}" target="_blank" rel="noreferrer">For Homeowners</a>
          <a class="button button--primary" href="#send-plans" data-event="section_cta_click" data-intent="project-review">Send Plans</a>
        </div>
      </nav>
    </div>
  `;
};

const renderHero = () => `
  <section class="hero section" id="top">
    <div class="shell hero__grid">
      <div class="hero__content">
        <p class="hero__eyebrow">${escapeHtml(landingContent.hero.eyebrow)}</p>
        <h1>${escapeHtml(landingContent.hero.title)}</h1>
        <p class="hero__body">${escapeHtml(landingContent.hero.body)}</p>
        <div class="hero__actions">
          <a
            class="button button--primary"
            href="${landingContent.hero.primaryCta.href}"
            data-event="${landingContent.hero.primaryCta.event}"
            data-intent="${landingContent.hero.primaryCta.intent}"
          >
            ${escapeHtml(landingContent.hero.primaryCta.label)}
          </a>
          <a
            class="button button--secondary"
            href="${landingContent.hero.secondaryCta.href}"
            data-event="${landingContent.hero.secondaryCta.event}"
          >
            ${escapeHtml(landingContent.hero.secondaryCta.label)}
          </a>
        </div>
        <ul class="hero__proof-strip" aria-label="Builder-first proof points">
          ${landingContent.hero.proofItems
            .map((item) => `<li class="hero__proof-pill">${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
        <ul class="hero__bullet-list" aria-label="Builder-first package benefits">
          ${landingContent.hero.bullets
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
      </div>
      <aside class="hero__panel" aria-label="${escapeHtml(
        landingContent.hero.reviewCard.title,
      )}">
        <h2>${escapeHtml(landingContent.hero.reviewCard.title)}</h2>
        <p class="hero__panel-intro">${escapeHtml(landingContent.hero.reviewCard.intro)}</p>
        <ul class="hero__review-list">
          ${landingContent.hero.reviewCard.items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
        <p class="hero__panel-note">${escapeHtml(landingContent.hero.reviewCard.note)}</p>
        <a
          class="button button--primary hero__panel-cta"
          href="${landingContent.hero.reviewCard.cta.href}"
          data-event="${landingContent.hero.reviewCard.cta.event}"
          data-intent="${landingContent.hero.reviewCard.cta.intent}"
        >
          ${escapeHtml(landingContent.hero.reviewCard.cta.label)}
        </a>
      </aside>
    </div>
  </section>
`;

const renderTrustStrip = () => `
  <section class="section section--tight trust-strip">
    <div class="shell">
      <div class="section-heading section-heading--compact">
        <h2>${escapeHtml(landingContent.trustStrip.title)}</h2>
        <p>${escapeHtml(landingContent.trustStrip.note)}</p>
      </div>
      <div class="pill-grid">
        ${landingContent.trustStrip.items
          .map((item) => `<div class="pill">${escapeHtml(item)}</div>`)
          .join("")}
      </div>
    </div>
  </section>
`;

const renderCardSection = ({ id, title, intro, items, closing, variant }) => `
  <section class="section ${variant ? `section--${variant}` : ""}" ${id ? `id="${id}"` : ""}>
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(title)}</h2>
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
      </div>
      <div class="card-grid">
        ${items
          .map(
            (item) => `
              <article class="card">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.body)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      ${closing ? `<p class="section-note">${escapeHtml(closing)}</p>` : ""}
    </div>
  </section>
`;

const renderWhatYouBuy = () => `
  <section class="section section--contrast">
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.whatYouBuy.title)}</h2>
      </div>
      <div class="statement-grid">
        <div class="statement-card statement-card--stacked">
          ${landingContent.whatYouBuy.intro
            .map((line) => `<p class="statement-card__line">${escapeHtml(line)}</p>`)
            .join("")}
        </div>
        <div class="statement-card statement-card--highlight">
          <p>${escapeHtml(landingContent.whatYouBuy.statement)}</p>
        </div>
      </div>
      <div class="feature-grid">
        ${landingContent.whatYouBuy.items
          .map(
            (item) => `
              <article class="card card--feature">
                <span class="card__icon" aria-hidden="true"></span>
                <h3>${escapeHtml(item)}</h3>
              </article>
            `,
          )
          .join("")}
      </div>
      <p class="section-note">${escapeHtml(landingContent.whatYouBuy.closing)}</p>
    </div>
  </section>
`;

const renderScope = () => `
  <section class="section" id="whats-included">
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.includedScope.title)}</h2>
      </div>
      <div class="scope-grid">
        <article class="scope-card">
          <h3>Included</h3>
          <ul class="scope-list">
            ${landingContent.includedScope.included
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}
          </ul>
        </article>
        <article class="scope-card scope-card--muted">
          <h3>Not included</h3>
          <ul class="scope-list scope-list--plain">
            ${landingContent.includedScope.excluded
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join("")}
          </ul>
        </article>
      </div>
      <p class="section-note">${escapeHtml(landingContent.includedScope.note)}</p>
      <p class="section-trust">${escapeHtml(landingContent.includedScope.trust)}</p>
    </div>
  </section>
`;

const renderProcess = () => `
  <section class="section section--gradient" id="how-it-works">
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.process.title)}</h2>
      </div>
      <ol class="step-grid">
        ${landingContent.process.steps
          .map(
            (item, index) => `
              <li class="step-card">
                <span class="step-card__index">0${index + 1}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.body)}</p>
              </li>
            `,
          )
          .join("")}
      </ol>
      <a
        class="button button--primary"
        href="${landingContent.process.cta.href}"
        data-event="${landingContent.process.cta.event}"
        data-intent="${landingContent.process.cta.intent}"
      >
        ${escapeHtml(landingContent.process.cta.label)}
      </a>
    </div>
  </section>
`;

const renderSimpleListCards = ({ id, title, items, line }) => `
  <section class="section" ${id ? `id="${id}"` : ""}>
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(title)}</h2>
      </div>
      <div class="list-card-grid">
        ${items
          .map(
            (item) => `
              <article class="card card--list">
                <h3>${escapeHtml(item)}</h3>
              </article>
            `,
          )
          .join("")}
      </div>
      ${line ? `<p class="section-note">${escapeHtml(line)}</p>` : ""}
    </div>
  </section>
`;

const renderPackages = () => `
  <section class="section section--contrast">
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.packages.title)}</h2>
      </div>
      <div class="package-grid">
        ${landingContent.packages.items
          .map(
            (item) => `
              <article class="package-card">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="package-card__audience">${escapeHtml(item.audience)}</p>
                <ul class="scope-list">
                  ${item.includes
                    .map((entry) => `<li>${escapeHtml(entry)}</li>`)
                    .join("")}
                </ul>
                <a
                  class="button button--secondary"
                  href="${item.cta.href}"
                  data-event="${item.cta.event}"
                  data-intent="${item.cta.intent}"
                >
                  ${escapeHtml(item.cta.label)}
                </a>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderFaq = () => `
  <section class="section section--contrast" id="faq">
    <div class="shell">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.faq.title)}</h2>
      </div>
      <div class="faq-list" data-faq-list>
        ${landingContent.faq.items
          .map(
            (item, index) => `
              <article class="faq-item">
                <h3>
                  <button
                    class="faq-trigger"
                    type="button"
                    id="faq-trigger-${index}"
                    aria-expanded="false"
                    aria-controls="faq-panel-${index}"
                    data-faq-trigger
                  >
                    <span>${escapeHtml(item.question)}</span>
                    <span class="faq-trigger__icon" aria-hidden="true"></span>
                  </button>
                </h3>
                <div
                  class="faq-panel"
                  id="faq-panel-${index}"
                  role="region"
                  aria-labelledby="faq-trigger-${index}"
                  hidden
                >
                  <p>${escapeHtml(item.answer)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderFinalBand = () => `
  <section class="section">
    <div class="shell">
      <div class="cta-band">
        <div>
          <h2>${escapeHtml(landingContent.finalCta.title)}</h2>
          <p>${escapeHtml(landingContent.finalCta.body)}</p>
          <p class="cta-band__note">${escapeHtml(landingContent.finalCta.note)}</p>
        </div>
        <div class="cta-band__actions">
          ${landingContent.finalCta.actions
            .map(
              (item, index) => `
                <a
                  class="button ${index === 0 ? "button--primary" : "button--secondary"}"
                  href="${item.href}"
                  data-event="${item.event}"
                  data-intent="${item.intent}"
                >
                  ${escapeHtml(item.label)}
                </a>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  </section>
`;

const renderForm = () => `
  <section class="section section--gradient" id="send-plans">
    <div class="shell form-layout">
      <div class="section-heading">
        <h2>${escapeHtml(landingContent.form.title)}</h2>
        <p>${escapeHtml(landingContent.form.description)}</p>
        <div class="contact-card">
          <a href="${landingContent.brand.phoneHref}">${escapeHtml(
            landingContent.brand.phoneDisplay,
          )}</a>
          <a href="${landingContent.brand.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <form class="lead-form" novalidate data-lead-form>
        <input type="hidden" name="intake_intent" value="project-review" data-intent-field>
        <div class="form-grid">
          ${renderField("First name", "first_name", "text", true)}
          ${renderField("Last name", "last_name", "text", true)}
          ${renderField("Company", "company", "text", true)}
          ${renderField("Email", "email", "email", true)}
          ${renderField("Phone", "phone", "tel", true)}
          ${renderSelectField(
            "Project type",
            "project_type",
            landingContent.form.projectTypes,
            true,
          )}
          ${renderField("Project location / State", "project_location", "text", true)}
          ${renderSelectField(
            "Estimated timeline",
            "timeline",
            landingContent.form.timelines,
            true,
          )}
          ${renderTextArea(
            "Short project description",
            "project_description",
            true,
            "Share project type, square footage, shell goals, and any critical constraints.",
          )}
          ${renderField(
            "Link to plans / Dropbox / Drive / WeTransfer",
            "plans_link",
            "url",
            false,
          )}
          ${renderFileField("Plans / drawings upload", "plans_files")}
        </div>
        <label class="checkbox-field">
          <input type="checkbox" name="consent" value="yes" required>
          <span>I agree to be contacted about this project review request.</span>
        </label>
        <div class="form-actions">
          <button class="button button--primary" type="submit">${escapeHtml(
            landingContent.form.submitLabel,
          )}</button>
          <p class="form-meta">Clear scope, qualified review, and next-step guidance before deeper commitment.</p>
        </div>
        <div class="form-errors" data-form-errors aria-live="polite"></div>
        <div class="form-success" data-form-success hidden role="status" aria-live="polite"></div>
      </form>
    </div>
  </section>
`;

const renderFooter = () => {
  app.footer.innerHTML = `
    <div class="shell footer__grid">
      <div class="footer__brand">
        <img class="brand__logo brand__logo--footer" src="${logoUrl}" alt="${escapeHtml(
          landingContent.brand.logoAlt,
        )}">
        <p>Builder-first shell coordination for ADUs, custom homes, additions, and compact residential formats.</p>
      </div>
      <div class="footer__links">
        <a href="${landingContent.legacyLinks.projects}" target="_blank" rel="noreferrer">Projects</a>
        <a href="${landingContent.legacyLinks.publications}" target="_blank" rel="noreferrer">Publications</a>
        <a href="${landingContent.legacyLinks.outdoorKitchens}" target="_blank" rel="noreferrer">Outdoor Kitchens</a>
        <a href="${landingContent.legacyLinks.contact}">Contact</a>
      </div>
      <div class="footer__links">
        <a href="${landingContent.brand.phoneHref}">Builder Call</a>
        <a href="${landingContent.brand.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="#faq">FAQ</a>
        <a href="${landingContent.legacyLinks.privacy}">Privacy</a>
        <a href="${landingContent.legacyLinks.terms}">Terms</a>
      </div>
    </div>
  `;
};

const renderMain = () => {
  app.main.innerHTML = [
    renderHero(),
    renderTrustStrip(),
    renderCardSection({
      title: landingContent.painPoints.title,
      items: landingContent.painPoints.items,
      closing: landingContent.painPoints.closing,
    }),
    renderCardSection({
      title: landingContent.audiences.title,
      items: landingContent.audiences.items,
      closing: landingContent.audiences.closing,
      variant: "contrast",
    }),
    renderWhatYouBuy(),
    renderScope(),
    renderProcess(),
    renderCardSection({
      title: landingContent.valueProps.title,
      items: landingContent.valueProps.items,
    }),
    renderSimpleListCards({
      id: "project-types",
      title: landingContent.useCases.title,
      items: landingContent.useCases.items,
      line: landingContent.useCases.line,
    }),
    renderPackages(),
    renderCardSection({
      title: landingContent.objections.title,
      items: landingContent.objections.items,
      variant: "contrast",
    }),
    renderFaq(),
    renderFinalBand(),
    renderForm(),
  ].join("");
};

const initMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.dataset.open = String(!expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.dataset.open = "false";
    });
  });
};

const initFaq = () => {
  document.querySelectorAll("[data-faq-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(trigger.getAttribute("aria-controls"));

      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;

      if (!expanded) {
        trackEvent("faq_expand", { question: trigger.textContent.trim() });
      }
    });
  });
};

const setIntent = (intent) => {
  const intentField = document.querySelector("[data-intent-field]");
  if (intentField && intent) {
    intentField.value = intent;
  }
};

const initActionTracking = () => {
  document.querySelectorAll("[data-event]").forEach((link) => {
    link.addEventListener("click", () => {
      const eventName = link.dataset.event;
      const intent = link.dataset.intent || "";
      if (intent) {
        setIntent(intent);
      }
      trackEvent(eventName, { intent, label: link.textContent.trim() });
    });
  });
};

const validateForm = (form) => {
  const errors = [];
  const formData = new FormData(form);
  const requiredFields = [
    ["first_name", "First name is required."],
    ["last_name", "Last name is required."],
    ["company", "Company is required."],
    ["email", "Valid email is required."],
    ["phone", "Phone number is required."],
    ["project_type", "Select a project type."],
    ["project_location", "Project location / state is required."],
    ["timeline", "Select an estimated timeline."],
    ["project_description", "Add a short project description."],
  ];

  form.querySelectorAll(".field__error").forEach((node) => {
    node.textContent = "";
  });

  requiredFields.forEach(([name, message]) => {
    const field = form.elements.namedItem(name);
    const value = String(formData.get(name) || "").trim();
    let isValid = Boolean(value);

    if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (name === "project_description") {
      isValid = value.length >= 20;
    }

    if (!isValid && field) {
      field.setAttribute("aria-invalid", "true");
      const errorNode = document.getElementById(`${name}-error`);
      if (errorNode) errorNode.textContent = message;
      errors.push(message);
    } else if (field) {
      field.removeAttribute("aria-invalid");
    }
  });

  const consent = form.elements.namedItem("consent");
  if (!consent.checked) {
    errors.push("Consent is required.");
  }

  return errors;
};

const initLeadForm = () => {
  const form = document.querySelector("[data-lead-form]");
  const errorsNode = document.querySelector("[data-form-errors]");
  const successNode = document.querySelector("[data-form-success]");
  const fileInput = form?.elements.namedItem("plans_files");
  let started = false;

  if (!form || !errorsNode || !successNode) return;

  form.addEventListener(
    "focusin",
    () => {
      if (!started) {
        started = true;
        trackEvent("project_review_form_start");
      }
    },
    { once: true },
  );

  if (fileInput) {
    fileInput.addEventListener("click", () => {
      trackEvent("project_file_upload_started");
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        trackEvent("project_file_upload_completed", {
          fileCount: fileInput.files.length,
        });
      }
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errors = validateForm(form);
    errorsNode.textContent = errors.length ? errors.join(" ") : "";

    if (errors.length) {
      successNode.hidden = true;
      return;
    }

    const formData = new FormData(form);
    const intakeIntent = formData.get("intake_intent") || "project-review";

    trackEvent("project_review_form_submit", { intent: intakeIntent });

    form.reset();
    setIntent("project-review");
    errorsNode.textContent = "";
    successNode.hidden = false;
    successNode.textContent = isPrototypeMode
      ? "Prototype mode: the intake was validated in the browser and no backend submission was sent. Connect this form to the live CRM or Contact Form 7 endpoint before deployment."
      : "Thanks. Your project review request was submitted successfully.";
  });
};

const injectFaqStructuredData = () => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landingContent.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
  document.head.appendChild(script);
};

renderHeader();
renderMain();
renderFooter();
initMenu();
initFaq();
initActionTracking();
initLeadForm();
injectFaqStructuredData();

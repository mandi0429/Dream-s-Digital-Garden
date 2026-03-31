const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function splitAnimatedTitles() {
  const rows = document.querySelectorAll(".anim-title[data-text]");
  rows.forEach((row, rowIndex) => {
    const text = row.dataset.text || "";
    row.innerHTML = "";

    [...text].forEach((char, charIndex) => {
      const outer = document.createElement("span");
      const first = document.createElement("span");
      const second = document.createElement("span");
      const value = char === " " ? "\u00A0" : char;

      first.textContent = value;
      second.textContent = value;
      outer.append(first, second);
      outer.style.transitionDelay = `${180 + (rowIndex * 120) + (charIndex * 34)}ms`;
      row.append(outer);
    });
  });

  window.requestAnimationFrame(() => {
    rows.forEach((row) => row.classList.add("play"));
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) {
    return;
  }

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 3) * 80}ms`;
    observer.observe(item);
  });
}

function setupCounters() {
  const items = document.querySelectorAll("[data-count]");
  if (!items.length) {
    return;
  }

  const animate = (element) => {
    const target = Number(element.dataset.count || 0);
    if (prefersReducedMotion.matches) {
      element.textContent = String(target);
      return;
    }

    const start = performance.now();
    const duration = 1200;

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  };

  if (!("IntersectionObserver" in window)) {
    items.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupRollHover() {
  const rolls = document.querySelectorAll(".roll");
  rolls.forEach((item) => {
    let timer = 0;
    item.addEventListener("mouseenter", () => {
      item.classList.remove("is-active");
      void item.offsetWidth;
      item.classList.add("is-active");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => item.classList.remove("is-active"), 420);
    });
  });
}

function setupMagneticCards() {
  const cards = document.querySelectorAll(".magnetic-card");
  if (!cards.length || prefersReducedMotion.matches) {
    return;
  }

  cards.forEach((card) => {
    const move = (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const rotateX = y * -7;
      const rotateY = x * 7;
      const translateX = x * 10;
      const translateY = y * 10;

      card.style.transform = `perspective(900px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.9), 0 24px 65px rgba(0,0,0,.16)";
    };

    const reset = () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
  });
}

function setupScreenIndicator() {
  const sections = document.querySelectorAll("[data-screen]");
  const target = document.querySelector(".on-screen .index");
  if (!sections.length || !target) {
    return;
  }

  const updateFromScroll = () => {
    let active = sections[0];
    const triggerLine = window.innerHeight * 0.35;

    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top <= triggerLine) {
        active = section;
      }
    });

    target.textContent = active.dataset.screen || "005";
  };

  updateFromScroll();
  window.addEventListener("scroll", updateFromScroll, { passive: true });
  window.addEventListener("resize", updateFromScroll);
}

function setupStackedCards() {
  const container = document.querySelector(".stacked-showcase");
  const cards = [...document.querySelectorAll(".stack-card")];
  if (!container || cards.length === 0 || window.innerWidth <= 900) {
    return;
  }

  const render = () => {
    const rect = container.getBoundingClientRect();
    const total = Math.max(container.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);

    cards.forEach((card, index) => {
      const start = index * 0.2;
      const local = Math.min(Math.max((progress - start) / 0.5, 0), 1);
      const translateY = index * 30 - local * 120;
      const scale = 1 - index * 0.04 + local * 0.04;
      const rotate = (index - 1) * 2 - local * (index * 1.5);
      const opacity = 1 - index * 0.12 + local * 0.12;

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`;
      card.style.opacity = String(Math.max(0.55, opacity));
      card.style.zIndex = String(cards.length - index);
    });
  };

  render();
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
}

function setupHorizontalTrack() {
  const section = document.querySelector(".horizontal");
  const text = document.querySelector(".horizontal-text");
  if (!section || !text) {
    return;
  }

  const render = () => {
    const rect = section.getBoundingClientRect();
    const total = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    const maxShift = Math.max(text.scrollWidth - window.innerWidth + 32, 0);
    text.style.transform = `translate3d(${-maxShift * progress}px, 0, 0)`;
  };

  render();
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
}

function setupCircles() {
  const circles = document.querySelectorAll(".circles div");
  if (!circles.length) {
    return;
  }

  const section = document.querySelector(".dark-band");
  const render = () => {
    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);

    circles.forEach((circle, index) => {
      const strength = Math.min(Math.max(progress * 1.3 - index * 0.12, 0), 1);
      circle.style.transform = `scaleY(${0.2 + strength * 0.8})`;
      circle.style.opacity = String(0.3 + strength * 0.7);
    });
  };

  render();
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
}

function setupForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) {
      return;
    }
    const original = button.textContent;
    button.textContent = "Thanks";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
}

function setupPerplexityStudy() {
  const stage = document.querySelector("[data-orb-stage]");
  const verbs = [...document.querySelectorAll(".perplexity-verbs span")];
  if (!stage || verbs.length === 0) {
    return;
  }

  let activeIndex = 0;
  let intervalId = 0;

  const activateVerb = (index) => {
    verbs.forEach((verb, verbIndex) => {
      verb.classList.toggle("is-active", verbIndex === index);
    });
  };

  const startVerbLoop = () => {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % verbs.length;
      activateVerb(activeIndex);
    }, 1400);
  };

  activateVerb(activeIndex);

  if (!prefersReducedMotion.matches) {
    startVerbLoop();

    const updateFromPointer = (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      stage.style.setProperty("--orb-shift-x", `${x * 18}px`);
      stage.style.setProperty("--orb-shift-y", `${y * 14}px`);
      stage.style.setProperty("--orb-tilt-x", `${y * -7}deg`);
      stage.style.setProperty("--orb-tilt-y", `${x * 10}deg`);
    };

    const resetPointer = () => {
      stage.style.setProperty("--orb-shift-x", "0px");
      stage.style.setProperty("--orb-shift-y", "0px");
      stage.style.setProperty("--orb-tilt-x", "0deg");
      stage.style.setProperty("--orb-tilt-y", "0deg");
    };

    stage.addEventListener("pointermove", updateFromPointer);
    stage.addEventListener("pointerleave", resetPointer);
  }
}

splitAnimatedTitles();
setupReveal();
setupCounters();
setupRollHover();
setupMagneticCards();
setupScreenIndicator();
setupStackedCards();
setupHorizontalTrack();
setupCircles();
setupForm();
setupPerplexityStudy();

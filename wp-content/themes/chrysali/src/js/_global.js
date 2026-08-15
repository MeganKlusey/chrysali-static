document.addEventListener("DOMContentLoaded", function () {
  const textLinks = document.querySelectorAll("a:has(.js-roll-text)");
  const text = document.querySelectorAll(".js-roll-text");

  const arrowLinks = document.querySelectorAll("a:has(> .js-roll-arrow):not(:has(.js-roll-arrow-container))");
  const linkArrows = document.querySelectorAll("a > .js-roll-arrow");

  const arrowContainers = document.querySelectorAll("button:has(.js-roll-arrow-container > .js-roll-arrow), a:has(.js-roll-arrow-container > .js-roll-arrow)");
  const containerArrows = document.querySelectorAll("button > .js-roll-arrow-container > .js-roll-arrow, a > .js-roll-arrow-container > .js-roll-arrow");

  const links = document.querySelectorAll(".js-scroll-link");

  const getScrollPosition = (el) => {
    return window.innerWidth >= 1024 ? el.offsetTop + 60 : el.offsetTop;
  };

  const scrollToTarget = (target, behavior = "smooth") => {
    const el = document.querySelector(target);

    if (!el) return;

    window.scrollTo({
      top: getScrollPosition(el),
      behavior,
    });
  };

  textLinks.forEach((textLink, index) => {
    textLink.addEventListener("mouseenter", () => {
      text[index].style.transform = "translateY(-100%)";
    });
    textLink.addEventListener("mouseleave", () => {
      text[index].style.transform = "translateY(0)";
    });
  });

  arrowLinks.forEach((arrowLink, index) => {
    arrowLink.addEventListener("mouseenter", () => {
      linkArrows[index].style.transform = "translate(16px, -16px)";
    });
    arrowLink.addEventListener("mouseleave", () => {
      linkArrows[index].style.transform = "translate(0, 0)";
    });
  });

  arrowContainers.forEach((arrowContainer, index) => {
    arrowContainer.addEventListener("mouseenter", () => {
      containerArrows[index].style.transform = containerArrows[index].querySelector(".arrow").classList.contains("small") ? "translateX(16px)" : "translateX(24px)";
    });
    arrowContainer.addEventListener("mouseleave", () => {
      containerArrows[index].style.transform = "translateX(0)";
    });
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.getAttribute("data-href");

      if (window.location.pathname === "/") {
        scrollToTarget(target);
      } else {
        window.location.href = `/${target}`;
      }
    });
  });

  window.addEventListener("load", () => {
    const target = window.location.hash;

    if (!target) return;

    history.replaceState(null, "", window.location.pathname);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTarget(target);
      });
    });
  });

  document.querySelectorAll(".track-click").forEach((link) => {
    link.addEventListener("click", function () {
      gtag("event", "click", {
        event_label: this.textContent.trim(),
        link_location: this.dataset.location,
      });
    });
  });
});

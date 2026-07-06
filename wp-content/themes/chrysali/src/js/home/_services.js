document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".services");
  const items = document.querySelectorAll(".services__list-item");
  const buttons = document.querySelectorAll(".services__list-item button");
  const infoMobile = document.querySelectorAll(".services__info--mobile");
  const infoDesktop = document.querySelectorAll(".services__info--desktop");
  const plus = document.querySelectorAll(".services__list-item .plus");
  const minus = document.querySelectorAll(".services__list-item .minus");

  let activeIndex = 0;

  if (!items.length || !infoMobile.length || !infoDesktop.length) return;

  defaultActive();

  items.forEach((item, index) => {
    buttons[index].addEventListener("click", () => {
      activeIndex = index;

      if (window.innerWidth >= 1024) {
        clearActive();
        setActive(item, activeIndex);
      } else {
        if (item.classList.contains("active") && infoMobile[activeIndex].classList.contains("active")) {
          clearActive();
          defaultActive();
        } else {
          clearActive();
          setActive(item, activeIndex);
        }
      }

      toggleAccordion();

      if (window.innerWidth >= 1024) {
        window.scrollTo({
          top: container.offsetTop + 60,
          behavior: "smooth",
        });
      } else {
        const onTransitionEnd = (e) => {
          if (e.propertyName === "max-height" && infoMobile[activeIndex].classList.contains("active")) {
            item.scrollIntoView({
              block: "start",
              behavior: "smooth",
            });

            infoMobile[activeIndex].removeEventListener("transitionend", onTransitionEnd);
          }
        };

        infoMobile[activeIndex].addEventListener("transitionend", onTransitionEnd);
      }
    });
  });

  window.addEventListener("resize", toggleAccordion);

  function toggleAccordion() {
    infoMobile.forEach((item, index) => {
      if (item.classList.contains("active")) {
        plus[index].style.display = "none";
        minus[index].style.display = "block";
        infoMobile[index].style.maxHeight = infoMobile[index].scrollHeight + "px";
      } else {
        plus[index].style.display = "block";
        minus[index].style.display = "none";
        infoMobile[index].style.maxHeight = null;
      }
    });
  }

  function clearActive() {
    items.forEach((i) => i.classList.remove("active"));
    infoMobile.forEach((i) => i.classList.remove("active"));
    infoDesktop.forEach((i) => i.classList.remove("active"));
  }

  function setActive(item, activeIndex) {
    item.classList.add("active");
    infoMobile[activeIndex].classList.add("active");
    infoDesktop[activeIndex].classList.add("active");
  }

  function defaultActive() {
    items[0].classList.add("active");
    infoDesktop[0].classList.add("active");
  }

  gsap.registerPlugin(ScrollTrigger);

  await document.fonts.ready;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".services__list-item",
      start: "top 85%",
    },
  });

  gsap.from(".services__title", {
    scrollTrigger: {
      trigger: ".services__title",
      start: "top 85%",
    },
    duration: 0.8,
    y: 10,
    autoAlpha: 0,
  });

  tl.from(".services__list-item", {
    duration: 0.8,
    y: 10,
    autoAlpha: 0,
    stagger: 0.04,
  }).from(
    ".services__info",
    {
      duration: 0.8,
      y: 10,
      autoAlpha: 0,
    },
    0.2,
  );

  ScrollTrigger.refresh();
});

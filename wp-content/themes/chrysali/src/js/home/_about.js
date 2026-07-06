document.addEventListener("DOMContentLoaded", async function () {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  await document.fonts.ready;

  let textSplit;
  let tl;

  function init() {
    if (textSplit) textSplit.revert();
    if (tl) tl.kill();

    gsap.set(".about__title", { clearProps: "all" });
    gsap.set(".about__text p", { clearProps: "all" });

    textSplit = SplitText.create(".about__text p", { type: "lines" });

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about__title",
        start: "top 85%",
      },
    });

    tl.from(".about__title", {
      duration: 0.8,
      y: 10,
      autoAlpha: 0,
      clearProps: "all",
    }).from(
      textSplit.lines,
      {
        duration: 0.8,
        y: 10,
        autoAlpha: 0,
        stagger: 0.15,
        clearProps: "all",
      },
      0.15,
    );
  }

  init();

  const breakpoints = ["(min-width: 768px)", "(min-width: 1024px)"];

  breakpoints.forEach((query) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", init);
  });

  ScrollTrigger.refresh();
});

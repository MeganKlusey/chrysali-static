document.addEventListener("DOMContentLoaded", async function () {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  await document.fonts.ready;

  const track = document.querySelector(".footer__carousel-track");
  const breakpoints = ["(min-width: 768px)", "(min-width: 1024px)"];

  if (track) {
    track.classList.add("animate");

    function restartAnimation() {
      track.classList.remove("animate");
      void track.offsetWidth;
      track.classList.add("animate");
    }

    breakpoints.forEach((query) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", restartAnimation);
    });
  }

  let textSplit;
  let tl;

  function init() {
    if (textSplit) textSplit.revert();
    if (tl) tl.kill();

    gsap.set(".footer__contact-title", { clearProps: "all" });
    gsap.set(".footer__contact-text", { clearProps: "all" });

    textSplit = SplitText.create(".footer__contact-text", { type: "lines" });

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer__contact",
        start: "top 85%",
      },
    });

    tl.from(".footer__contact-title", {
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

  breakpoints.forEach((query) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", init);
  });

  ScrollTrigger.refresh();
});

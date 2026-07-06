document.addEventListener("DOMContentLoaded", async function () {
  const scroll = document.querySelector(".hero__scroll");

  scroll?.addEventListener("click", () => {
    window.scrollTo({ top: document.querySelector("#about").offsetTop + 60, behavior: "smooth" });
  });

  gsap.registerPlugin(SplitText);

  await document.fonts.ready;

  let titleSplit = SplitText.create(".hero__title", { type: "chars" });

  let tl = gsap.timeline({
    scrollTrigger: {
      start: "top 85%",
      end: "top 15%",
    },
  });

  tl.from(".hero__offsite-links > li", {
    duration: 0.8,
    x: 100,
    autoAlpha: 0,
    stagger: 0.04,
  })
    .from(
      ".hero__description",
      {
        duration: 0.8,
        x: -100,
        autoAlpha: 0,
      },
      0.04,
    )
    .from(
      titleSplit.chars,
      {
        duration: 0.8,
        x: -100,
        autoAlpha: 0,
        stagger: -0.04,
      },
      0.04,
    )
    .from(
      ".hero__scroll",
      {
        duration: 0.8,
        y: 50,
        autoAlpha: 0,
      },
      0.4,
    )
    .from(
      ".hero__image",
      {
        duration: 1.2,
        scale: 1.2,
      },
      0,
    )
    .from(
      ".hero__scroll rect",
      {
        duration: 1.2,
        drawSVG: "0%",
      },
      "0.4",
    )
    .from(
      ".hero__scroll circle",
      {
        y: 4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
      },
      "0.4",
    );
});

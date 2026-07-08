document.addEventListener("DOMContentLoaded", async function () {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  await document.fonts.ready;

  gsap.utils.toArray(".portfolio__item").forEach((item) => {
    const video = item.querySelector(".portfolio__video");
    const title = item.querySelector(".portfolio__title");
    const role = item.querySelector(".portfolio__role");
    const bulletPoints = item.querySelectorAll(".portfolio__description ul li");
    const paragraph = item.querySelectorAll(".portfolio__description p");

    let roleSplit = SplitText.create(role, { type: "lines" });
    const descriptionSplit = SplitText.create(paragraph, { type: "lines", reduceWhiteSpace: false });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
      },
    });

    gsap.from(video, {
      scrollTrigger: {
        trigger: video,
        start: "top 85%",
      },
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
    });
  });

  ScrollTrigger.refresh();
});

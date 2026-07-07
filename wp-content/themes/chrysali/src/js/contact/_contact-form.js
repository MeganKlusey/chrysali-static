document.addEventListener("DOMContentLoaded", async function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const submitButton = document.getElementById("contact-submit");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitButton.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          window.location.href = "/contact?submitted=true";
          return;
        }

        throw new Error(result.message);
      } catch (error) {
        console.error(error);
        alert("Sorry, something went wrong. Please try again.");
        submitButton.disabled = false;
      }
    });
  }

  gsap.registerPlugin(SplitText);

  await document.fonts.ready;

  let titleSplit = SplitText.create(".contact__title", { type: "lines" });
  let descriptionSplit = SplitText.create(".contact__description", { type: "lines" });
  let details = document.querySelector(".contact__form-details");
  let characterCount = document.querySelector(".contact__form-character-count");

  if (!details) return;

  details.addEventListener("input", () => {
    details.style.height = "auto";
    details.style.height = Math.min(details.scrollHeight, 300) + "px";
    details.style.overflowY = details.scrollHeight > 300 ? "auto" : "hidden";
    let length = details.value.length;
    characterCount.textContent = length;
  });

  let tl = gsap.timeline();

  tl.from(titleSplit.lines, {
    duration: 0.4,
    y: 10,
    autoAlpha: 0,
    stagger: 0.1,
  })
    .from(
      descriptionSplit.lines,
      {
        duration: 0.4,
        y: 10,
        autoAlpha: 0,
        stagger: 0.1,
      },
      "<0.2",
    )
    .from(
      ".contact__offsite-links > li",
      {
        duration: 0.4,
        x: 100,
        autoAlpha: 0,
        stagger: 0.25,
      },
      "<0.2",
    )
    .from(
      ".contact__form-submit",
      {
        duration: 0.4,
        y: 10,
        autoAlpha: 0,
      },
      "<",
    );

  ScrollTrigger.refresh();
});

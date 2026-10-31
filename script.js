// NGINX-Verse: small progressive enhancement for the demo landing page.
document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector(".cta");
  if (cta) {
    cta.addEventListener("click", () => {
      const target = document.querySelector("#featured");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});

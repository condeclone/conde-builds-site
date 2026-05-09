(() => {
  const images = Array.from(document.querySelectorAll(".case-image img, .gallery img"));
  if (!images.length) return;

  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Expanded image preview");
  modal.innerHTML = `
    <button class="image-modal-close" type="button" aria-label="Close expanded image">Close</button>
    <figure>
      <img alt="">
      <figcaption></figcaption>
    </figure>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const caption = modal.querySelector("figcaption");
  const closeButton = modal.querySelector("button");

  const close = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    modalImage.removeAttribute("src");
  };

  const open = (image) => {
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "Expanded project image";
    const figureCaption = image.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
    caption.textContent = image.dataset.caption || figureCaption || image.alt || "";
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  images.forEach((image) => {
    image.classList.add("expandable-img");
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Expand image: ${image.alt || "project image"}`);
    image.addEventListener("click", () => open(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(image);
      }
    });
  });

  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();


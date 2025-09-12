let page = document.querySelector(".page");
let counter = false;
page.addEventListener("click", function (evt) {
  let form = document.querySelector(".form");
  let fullview = document.querySelector(".fullview");
  if (
    form &&
    !Array.from(evt.target.classList).some((cls) => cls.includes("form")) &&
    counter
  ) {
    form.remove();
    counter = !counter;
  }
  if (
    fullview &&
    !Array.from(evt.target.classList).some((cls) => cls.includes("image")) &&
    counter
  ) {
    fullview.remove();
    counter = !counter;
  }
  if (
    Array.from(evt.target.classList).some((cls) =>
      cls.includes("button-state-change")
    ) ||
    Array.from(evt.target.classList).some((cls) => cls.includes("foto"))
  ) {
    counter = !counter;
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    // Close form or fullview if open
    let form = document.querySelector(".form");
    let fullview = document.querySelector(".fullview");
    if (form) {
      form.remove();
      counter = !counter;
    }
    if (fullview) {
      fullview.remove();
      counter = !counter;
    }
  }
});

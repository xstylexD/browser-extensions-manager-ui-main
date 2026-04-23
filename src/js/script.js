"use strict";

const themeBtn = document.querySelector(".theme__btn"),
  html = document.documentElement,
  lightIcon = document.querySelector(".extensions__theme-light"),
  darkIcon = document.querySelector(".extensions__theme-dark"),
  pluginsWrapper = document.querySelector(".plugins");

let theme = "light";

themeBtn.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";

  localStorage.setItem("theme", theme);

  html.setAttribute("data-theme", theme);
  darkIcon.classList.toggle("hidden");
  lightIcon.classList.toggle("hidden");
});

// themeBtn.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     if (html.getAttribute("data-theme") === "dark") {
//       html.setAttribute("data-theme", "light");
//       darkIcon.style.display = "none";
//       lightIcon.style.display = "block";
//     } else {
//       html.setAttribute("data-theme", "dark");
//       lightIcon.style.display = "none";
//       darkIcon.style.display = "block";
//     }
//   });
// });
function initLocalStorage() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    theme = savedTheme;
    html.setAttribute("data-theme", theme);
    darkIcon.classList.remove("hidden");
    lightIcon.classList.add("hidden");
  } else {
    theme = savedTheme;
    html.setAttribute("data-theme", theme);
    darkIcon.classList.add("hidden");
    lightIcon.classList.remove("hidden");
  }
}

initLocalStorage();

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    pluginsWrapper.innerHTML = "";

    data.forEach((plugin) => {
      const item = document.createElement("div");
      item.classList.add("plugins__item");

      item.innerHTML = `
          <div class="plugins__wrapper">
            <img
              src="${plugin.logo}"
              alt="${plugin.name}"
              class="plugins__logo"
            />
            <div class="plugins__head">
              <h2 class="plugins__title">${plugin.name}</h2>
              <p class="plugins__descr">
                ${plugin.description}
              </p>
            </div>
          </div>
          <div class="plugins__nav">
            <button class="plugins__remove">Remove</button>
            <label class="plugins__switch">
              <input type="checkbox" ${plugin.isActive ? "checked" : ""} />
              <span class="plugins__slider"></span>
            </label>
          </div>
            `;

      pluginsWrapper.append(item);
    });
  })
  .catch((err) => console.log(`Виникла помилка: ${err}`));

pluginsWrapper.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("plugins__remove")) {
    const pluginItem = e.target.closest(".plugins__item");
    pluginItem.remove();
  }
});

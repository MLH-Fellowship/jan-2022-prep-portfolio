var mode = document.getElementById("dark-theme-toggle");
window.addEventListener("load", function () {
  initTheme();

  if (mode !== null) {
    mode.addEventListener("change", function () {
      resetTheme();
    });
  }
});

function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("mode") !== null &&
    localStorage.getItem("mode") === "dark";

  if (mode !== null) mode.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute("theme", "dark")
    : document.body.removeAttribute("theme");
}

function resetTheme() {
  if (mode.checked) {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("mode", "dark");
  } else {
    document.body.removeAttribute("theme");
    localStorage.removeItem("mode");
  }
}

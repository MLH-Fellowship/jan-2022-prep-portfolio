const darkModeButton = document.getElementById("dark-theme-toggle");
const darkModeStatusIcon = document.getElementById("dark-mode-status-icon");
const darkModeStatusIndicator = document.getElementById("dark-mode-status-indicator");
// Mapping:
// 0 - auto
// 1 - dark
// 2 - light
var currentMode = 0;
const modeMapping = {
  0: "auto",
  1: "dark",
  2: "light"
}
const iconMapping = {
  "auto": "bxs-brightness-half",
  "dark": "bxs-moon",
  "light": "bxs-sun",
}

window.addEventListener("load", function () {
  initTheme();
});

function initTheme() {
  const modePreference = localStorage.getItem("mode") ?? "auto"
  updateTheme(modePreference, true)
  darkModeButton.addEventListener("click", () => {
    currentMode = (currentMode + 1) % 3
    updateTheme(modeMapping[currentMode])
  })
}

function capitalise(text) {
  if (text) {
    return text[0].toUpperCase() + text.slice(1)
  }
}

function updateTheme(modePreference, isInit = false) {
  var isDark = false
  // Store the updated theme.
  // This should be done before switch - ref: default case
  localStorage.setItem("mode", modePreference)
  switch (modePreference) {
    case "auto":
      isDark = window.matchMedia && window.matchMedia(' (prefers-color-scheme: dark)').matches
      currentMode = 0
      break
    case "dark":
      isDark = true
      currentMode = 1
      break
    case "light":
      isDark = false
      currentMode = 2
      break;
    default:
      // Invalid state, clear mode preference and reset to auto
      localStorage.setItem("mode", null)
      isDark = false
  }

  // Change the button text
  darkModeStatusIndicator.innerText = capitalise(modePreference)

  // Sort out the right class for darkModeStatusIcon
  const classes = ['bxs-moon', "bxs-sun", "bxs-brightness-half"]
  classes.forEach(className => {
    darkModeStatusIcon.classList.remove(className)
  })
  darkModeStatusIcon.classList.add(iconMapping[modePreference])


  beforeModeChange({ isDark, modePreference }).then(() => {
    isDark ? applyDarkMode() : applyLightMode()
    // Remove the hidden tag - the hidden tag was added 
    // to avoid flashing when switching pages in dark mode.
    if (isInit) {
      document.body.classList.remove("hidden")
    }
  }).then(() => {
    afterModeChange({ isDark, modePreference })
  })
}

async function beforeModeChange({ isDark, modePreference }) {
  // [TODO] Set up the animation
  return
}

async function afterModeChange({ isDark, modePreference }) {
  // [TODO] Clean up the animation
  return
}

function applyDarkMode() {
  document.body.setAttribute("theme", "dark")
}

function applyLightMode() {
  document.body.removeAttribute("theme");
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

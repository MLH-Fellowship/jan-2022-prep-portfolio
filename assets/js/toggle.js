const darkModeButton = document.getElementById("dark-theme-toggle");
const darkModeStatusIcon = document.getElementById("dark-mode-status-icon");
const darkModeStatusIndicator = document.getElementById("dark-mode-status-indicator");
const darkModeStatusIconWrapper = document.getElementById("dark-mode-status-icon-wrapper");
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
var currentTimeout = null

window.addEventListener("DOMContentLoaded", function () {
  initTheme();
});

function initTheme() {
  const modePreference = localStorage.getItem("mode") ?? "auto"
  updateTheme(modePreference, true)
  darkModeButton.addEventListener("click", () => {
    currentMode = (currentMode + 1) % 3
    updateTheme(modeMapping[currentMode])
  })
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const deviceMode = event.matches ? "dark" : "light";
    if (currentMode === 0) {
      // Re-trigger the auto update
      updateTheme("auto")
    }
  });
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

  beforeModeChange({ isDark, modePreference, isInit }).then(() => {
    isDark ? applyDarkMode() : applyLightMode()
    // Remove the hidden tag - the hidden tag was added 
    // to avoid flashing when switching pages in dark mode.
    if (isInit) {
      document.body.classList.remove("hidden")
    }
  }).then(() => {
    afterModeChange({ isDark, modePreference, isInit })
  })
}

async function beforeModeChange({ isDark, modePreference, isInit }) {
  // Change the button text
  darkModeStatusIndicator.innerText = capitalise(modePreference)

  // Sort out the right class for darkModeStatusIcon
  const classes = ['bxs-moon', "bxs-sun", "bxs-brightness-half"]
  classes.forEach(className => {
    darkModeStatusIcon.classList.remove(className)
  })
  darkModeStatusIcon.classList.add(iconMapping[modePreference])

  if (!isInit) {
    const allElements = document.getElementsByTagName("*");
    for (let i = 0, max = allElements.length; i < max; i++) {
      const element = allElements[i];
      if (element !== darkModeStatusIcon && element !== darkModeStatusIconWrapper && element !== darkModeStatusIndicator) {
        element.classList.add("transition-effect")
      }
    }
  }

  return
}

async function afterModeChange({ isDark, modePreference, isInit }) {
  // [TODO] Clean up the animation
  if (!isInit) {
    const allElements = document.getElementsByTagName("*");
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }
    currentTimeout = setTimeout(() => {
      for (let i = 0, max = allElements.length; i < max; i++) {
        const element = allElements[i];
        if (element !== darkModeStatusIcon && element !== darkModeStatusIconWrapper && element !== darkModeStatusIndicator) {
          element.classList.remove("transition-effect")
        }
      }
    }, 1000);
  }
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

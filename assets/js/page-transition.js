// Page Transition

const animationLayer = document.getElementById("animation-layer");
let latestHref = null;
let animationLock = false;
let timeline = gsap.timeline()

async function beforePageTransition() {
    animationLayer.classList.remove("animation-hidden");
    document.body.classList.add("cursor-wait");
    await timeline.from("#animation-layer",
        {
            left: "100%",
            opacity: 1,
            duration: 0.5,
            ease: "expo.out",
        }
    )

}

async function afterPageTransition() {
    animationLayer.classList.remove("animation-hidden");
    document.body.classList.add("cursor-wait");
    await timeline.fromTo("#animation-layer",
        {
            opacity: 1,
            left: "0%",
            width: "100%",
        },
        {
            opacity: 1,
            left: "-100%",
            duration: 1,
            ease: "expo.out",
            clearProps: "all"
        }
    )

    document.body.classList.remove("cursor-wait");
    animationLayer.classList.add("animation-hidden");
}

function pageTransition(href) {
    latestHref = href
    if (animationLock) {
        return
    }
    animationLock = true
    beforePageTransition().then(() => {
        // Add a flag so the next page can animate in
        timeline.invalidate().clear()
        localStorage.setItem("transition-enabled", "true");
        localStorage.setItem("transition-from", window.location.href);
        // Push to history
        location.href = latestHref;
    })
}


function install() {
    if (localStorage.getItem("transition-enabled") === "true") {
        localStorage.setItem("transition-enabled", "");
        localStorage.setItem("transition-from", "");
        animationLock = true
        afterPageTransition(localStorage.getItem("transition-from")).then(() => {
            animationLock = false
        })
    }
    // Add a handler to all links
    let a = document.querySelectorAll('a');
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener('click', function (event) {
            event.preventDefault();
            let href = this.getAttribute('href');
            // Get the target attribute from the <a> element
            let target = this.getAttribute('target');
            // If target is _blank
            if (target === '_blank') {
                // Open the link in a new window
                window.open(href);
            } else {
                pageTransition(href);
            }
        });
    }
    window.addEventListener("popstate", () => {
        pageTransition(document.location.href)
    })
}


document.addEventListener('DOMContentLoaded', () => {
    install();
});
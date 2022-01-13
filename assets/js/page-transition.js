// Page Transition

const animationLayer = document.getElementById("animation-layer");
var latestHref = null;
var animationLock = false;
var timeline = gsap.timeline()

async function beforePageTransition() {
    animationLayer.classList.remove("animation-hidden");
    document.body.classList.add("cursor-wait");
    timeline = gsap.timeline()
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
    timeline = gsap.timeline()
    await timeline.fromTo("#animation-layer",
        {
            opacity: 1,
            left: "0%",
            ease: "expo.out",
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
    var a = document.querySelectorAll('a');
    for (var i = 0; i < a.length; i++) {
        a[i].addEventListener('click', function (event) {
            event.preventDefault();
            var href = this.getAttribute('href');
            // Get the target attribute from the a element
            var target = this.getAttribute('target');
            // If target is _blank
            if (target === '_blank') {
                // Open the link in a new window
                window.open(href);
            } else {
                pageTransition(href);
            }
        });
    }
    window.addEventListener("popstate", (e) => {
        pageTransition(document.location.href)
    })
}


document.addEventListener('DOMContentLoaded', () => {
    install();
});
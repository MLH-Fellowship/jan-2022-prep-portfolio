// Page Transition

const animationLayer = document.getElementById("animation-layer");
let latestHref = null;
let animationLock = false;
let timeline = gsap.timeline()

async function beforePageTransition() {
    gsap.to(window, { duration: 0.5, scrollTo: 0, ease: "expo.out" });
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

    if (animationLock === "after-new-page") {
        // If it's not "after-new-page" then this means that the user initiated a page transition to another page before this transition is completed.
        // Subsequent actions are handled by the other function.
        document.body.classList.remove("cursor-wait");
        animationLayer.classList.add("animation-hidden");
    }
}

function pageTransition(href, { pushState = true } = {}) {
    latestHref = href
    if (animationLock === "before-new-page") {
        return
    } else if (animationLock === "after-new-page") {
        // This resets everything to their original location
        timeline.pause()
        timeline.seek(0)
        // Then, reset the timeline as well.
        timeline = gsap.timeline()
    }
    animationLock = "before-new-page"
    beforePageTransition().then(() => {
        // Add a flag so the next page can animate in
        const isExternal = (latestHref.startsWith(location.origin) === false) && (latestHref.startsWith("/") === false)
        if (!isExternal) {
            localStorage.setItem("transition-enabled", "true");
            localStorage.setItem("transition-from", window.location.href);
            if (pushState) {
                history.pushState(null, null, href);
            }
            setTimeout(() => {
                // Called in case something gets stuck/safari (which caches the previous page)
                animationLayer.classList.add("animation-hidden");
                document.body.classList.remove("cursor-wait");
                animationLock = null
            }, 1000);

            // Using push state then reload to allow us to capture back/forward button presses,
            // as popState is only triggered if the state is pushed by pushState (not by the location.href).

            // We could have used unload event but we can't distingush page close from back/forward.
            location.reload();
        }
        // Push to history
        // location.href = latestHref;
    })
}


function install() {
    if (localStorage.getItem("transition-enabled") === "true") {
        localStorage.setItem("transition-enabled", "");
        localStorage.setItem("transition-from", "");
        animationLock = "after-new-page"
        afterPageTransition(localStorage.getItem("transition-from")).then(() => {
            animationLock = null
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
            } else if (href.startsWith("#")) {
                if (href !== "#") {
                    gsap.to(window, { duration: 0.3, scrollTo: href, ease: "expo.out" });
                }
            } else {
                pageTransition(href);
            }
        });
    }
    window.addEventListener("popstate", () => {
        // This is triggered when the user pressess the back/forward button. As the URL has already been changed by the browser, we need to manually push state.
        pageTransition(document.location.href, { pushState: false });
    })
}


document.addEventListener('DOMContentLoaded', () => {
    install();
});

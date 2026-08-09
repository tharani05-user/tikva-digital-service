document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.querySelector(".main-nav");
    const servicesItem = document.querySelector(".nav-item.dropdown");
    const servicesToggle = document.getElementById("servicesToggle");
    const headerCta = document.querySelector(".header-cta");
    let mobileCtaClone = null;


    /* ==============================
       MOBILE MENU TOGGLE
    ============================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function (e) {

            e.stopPropagation();

            const isOpen = mainNav.classList.toggle("mobile-open");

            menuToggle.classList.toggle("active");

            if (isOpen) {
                if (!mobileCtaClone && headerCta) {
                    mobileCtaClone = headerCta.cloneNode(true);
                    mobileCtaClone.classList.add("mobile-nav-cta");
                    mainNav.appendChild(mobileCtaClone);
                }
            } else {
                servicesItem?.classList.remove("active");
                if (mobileCtaClone && mainNav.contains(mobileCtaClone)) {
                    mainNav.removeChild(mobileCtaClone);
                    mobileCtaClone = null;
                }
            }

            if (!mainNav.classList.contains("mobile-open")) {
                servicesItem?.classList.remove("active");
            }

        });

    }


    /* ==============================
       SERVICES DROPDOWN
    ============================== */

    if (servicesToggle && servicesItem) {

        servicesToggle.addEventListener("click", function (e) {

            e.preventDefault();
            e.stopPropagation();

            servicesItem.classList.toggle("active");

        });

    }


    /* ==============================
       CLOSE OUTSIDE
    ============================== */

    document.addEventListener("click", function (e) {

        if (
            mainNav &&
            menuToggle &&
            !mainNav.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            mainNav.classList.remove("mobile-open");

            menuToggle.classList.remove("active");

            if (servicesItem) {
                servicesItem.classList.remove("active");
            }

            if (mobileCtaClone && mainNav.contains(mobileCtaClone)) {
                mainNav.removeChild(mobileCtaClone);
                mobileCtaClone = null;
            }

        }

    });


    /* ==============================
       CLOSE AFTER SERVICE LINK
    ============================== */

    if (mainNav) {

        const serviceLinks =
            mainNav.querySelectorAll(".services-dropdown a");

        serviceLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("mobile-open");

                menuToggle?.classList.remove("active");

                servicesItem?.classList.remove("active");

                if (mobileCtaClone && mainNav.contains(mobileCtaClone)) {
                    mainNav.removeChild(mobileCtaClone);
                    mobileCtaClone = null;
                }

            });

        });

    }


    /* ==============================
       RESET ON DESKTOP
    ============================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {

            mainNav?.classList.remove("mobile-open");

            menuToggle?.classList.remove("active");

            servicesItem?.classList.remove("active");

            if (mobileCtaClone && mainNav.contains(mobileCtaClone)) {
                mainNav.removeChild(mobileCtaClone);
                mobileCtaClone = null;
            }

        }

    });


    /* ==============================
       SCROLL REVEAL INITIALIZATION
    ==============================
    */

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealSelectors = [
        ".hero-tag",
        ".hero-content h1",
        ".hero-content p",
        ".hero-buttons",
        ".hero-visual",
        ".webdev-hero-content h1",
        ".webdev-hero-content > p",
        ".webdev-hero-visual",
        ".game-hero-content h1",
        ".game-hero-content > p",
        ".game-hero-visual",
        ".elearning-hero-content h1",
        ".elearning-hero-content > p",
        ".elearning-hero-visual",
        ".arvr-hero-content h1",
        ".arvr-hero-content > p",
        ".arvr-hero-visual",
        ".automobile-hero-content h1",
        ".automobile-hero-content > p",
        ".automobile-hero-visual",
        ".realestate-hero-content h1",
        ".realestate-hero-content > p",
        ".realestate-hero-visual",
        ".section-heading",
        ".service-card",
        ".about-service-card",
        ".featured-project-container",
        ".featured-project-image",
        ".contact-main-container",
        ".blog-cta-section",
        ".about-cta-section"
    ];

    const revealTargets = Array.from(document.querySelectorAll(revealSelectors.join(", ")));

    const heroSequence = [
        ".hero-tag",
        ".hero-content h1",
        ".hero-content p",
        ".hero-buttons",
        ".hero-visual",
        ".webdev-hero-content h1",
        ".webdev-hero-content > p",
        ".webdev-hero-visual",
        ".game-hero-content h1",
        ".game-hero-content > p",
        ".game-hero-visual",
        ".elearning-hero-content h1",
        ".elearning-hero-content > p",
        ".elearning-hero-visual",
        ".arvr-hero-content h1",
        ".arvr-hero-content > p",
        ".arvr-hero-visual",
        ".automobile-hero-content h1",
        ".automobile-hero-content > p",
        ".automobile-hero-visual",
        ".realestate-hero-content h1",
        ".realestate-hero-content > p",
        ".realestate-hero-visual"
    ].map(function (selector) {
        return document.querySelector(selector);
    }).filter(Boolean);

    heroSequence.forEach(function (element, index) {
        element.classList.add("reveal");
        element.style.transitionDelay = `${0.1 + index * 0.1}s`;
        if (element.classList.contains("hero-visual")) {
            element.classList.add("reveal-soft-scale");
        }
    });

    revealTargets.forEach(function (element) {
        if (!heroSequence.includes(element)) {
            element.classList.add("reveal");
        }
    });

    const staggerCards = function (selector, baseDelay) {
        document.querySelectorAll(selector).forEach(function (card, index) {
            card.style.transitionDelay = `${baseDelay + index * 0.08}s`;
        });
    };

    staggerCards(".service-card", 0);
    staggerCards(".about-service-card", 0);

    if (reduceMotion) {
        revealTargets.forEach(function (element) {
            element.classList.add("reveal-visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: "0px 0px -10% 0px"
        });

        revealTargets.forEach(function (element) {
            revealObserver.observe(element);
        });
    }

});
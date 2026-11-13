// snow
Date.now ||
    (Date.now = function () {
        return new Date().getTime();
    }),
    (function () {
        "use strict";
        for (
            var e = ["webkit", "moz"], t = 0;
            t < e.length && !window.requestAnimationFrame;
            ++t
        ) {
            var i = e[t];
            (window.requestAnimationFrame =
                window[i + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                    window[i + "CancelAnimationFrame"] ||
                    window[i + "CancelRequestAnimationFrame"]);
        }
        if (
            /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) ||
            !window.requestAnimationFrame ||
            !window.cancelAnimationFrame
        ) {
            var n = 0;
            (window.requestAnimationFrame = function (e) {
                var t = Date.now(),
                    i = Math.max(n + 16, t);
                return setTimeout(function () {
                    e((n = i));
                }, i - t);
            }),
                (window.cancelAnimationFrame = clearTimeout);
        }
    })();
var snowFall = (function () {
    function e() {
        var e = {
                flakeCount: 35,
                flakeColor: "#ffffff",
                flakeIndex: 999999,
                flakePosition: "absolute",
                minSize: 1,
                maxSize: 2,
                minSpeed: 1,
                maxSpeed: 5,
                round: !1,
                shadow: !1,
                collection: !1,
                image: !1,
                collectionHeight: 40,
            },
            t = [],
            n = {},
            o = 0,
            s = 0,
            a = 0,
            r = 0,
            l = function (e, t) {
                for (var i in t) e.hasOwnProperty(i) && (e[i] = t[i]);
            },
            h = function (e, t) {
                (e.style.webkitTransform = t),
                    (e.style.MozTransform = t),
                    (e.style.msTransform = t),
                    (e.style.OTransform = t),
                    (e.style.transform = t);
            },
            m = function (e, t) {
                return Math.round(e + Math.random() * (t - e));
            },
            f = function (e, t) {
                for (var i in t)
                    e.style[i] =
                        t[i] + ("width" == i || "height" == i ? "px" : "");
            },
            d = function (t, i, n) {
                (this.x = m(a, s - a)),
                    (this.y = m(0, o)),
                    (this.size = i),
                    (this.speed = n),
                    (this.step = 0),
                    (this.stepSize = m(1, 10) / 100),
                    e.collection &&
                        (this.target =
                            canvasCollection[
                                m(0, canvasCollection.length - 1)
                            ]);
                var r = null;
                e.image
                    ? ((r = new Image()), (r.src = e.image))
                    : ((r = document.createElement("div")),
                      f(r, { background: e.flakeColor })),
                    (r.className = "snowfall-flakes"),
                    f(r, {
                        width: this.size,
                        height: this.size,
                        position: e.flakePosition,
                        top: 0,
                        left: 0,
                        "will-change": "transform",
                        fontSize: 0,
                        zIndex: e.flakeIndex,
                    }),
                    e.round &&
                        f(r, {
                            "-moz-border-radius": ~~e.maxSize + "px",
                            "-webkit-border-radius": ~~e.maxSize + "px",
                            borderRadius: ~~e.maxSize + "px",
                        }),
                    e.shadow &&
                        f(r, {
                            "-moz-box-shadow": "1px 1px 1px #555",
                            "-webkit-box-shadow": "1px 1px 1px #555",
                            boxShadow: "1px 1px 1px #555",
                        }),
                    t.tagName === document.body.tagName
                        ? document.body.appendChild(r)
                        : t.appendChild(r),
                    (this.element = r),
                    (this.update = function () {
                        (this.y += this.speed),
                            this.y > o - (this.size + 6) && this.reset(),
                            h(
                                this.element,
                                "translateY(" +
                                    this.y +
                                    "px) translateX(" +
                                    this.x +
                                    "px)"
                            ),
                            (this.step += this.stepSize),
                            (this.x += Math.cos(this.step)),
                            (this.x + this.size > s - a || this.x < a) &&
                                this.reset();
                    }),
                    (this.reset = function () {
                        (this.y = 0),
                            (this.x = m(a, s - a)),
                            (this.stepSize = m(1, 10) / 100),
                            (this.size =
                                m(100 * e.minSize, 100 * e.maxSize) / 100),
                            (this.element.style.width = this.size + "px"),
                            (this.element.style.height = this.size + "px"),
                            (this.speed = m(e.minSpeed, e.maxSpeed));
                    });
            },
            w = function () {
                for (var e = 0; e < t.length; e += 1) t[e].update();
                r = requestAnimationFrame(function () {
                    w();
                });
            };
        return {
            snow: function (r, h) {
                for (
                    l(e, h),
                        n = r,
                        o = n.offsetHeight,
                        s = n.offsetWidth,
                        n.snow = this,
                        "body" === n.tagName.toLowerCase() && (a = 25),
                        window.addEventListener(
                            "resize",
                            function () {
                                (o = n.clientHeight), (s = n.offsetWidth);
                            },
                            !0
                        ),
                        i = 0;
                    i < e.flakeCount;
                    i += 1
                )
                    t.push(
                        new d(
                            n,
                            m(100 * e.minSize, 100 * e.maxSize) / 100,
                            m(e.minSpeed, e.maxSpeed)
                        )
                    );
                w();
            },
            clear: function () {
                var e = null;
                e = n.getElementsByClassName
                    ? n.getElementsByClassName("snowfall-flakes")
                    : n.querySelectorAll(".snowfall-flakes");
                for (var t = e.length; t--; )
                    e[t].parentNode === n && n.removeChild(e[t]);
                cancelAnimationFrame(r);
            },
        };
    }
    return {
        snow: function (t, i) {
            if ("string" == typeof i)
                if (t.length > 0)
                    for (var n = 0; n < t.length; n++)
                        t[n].snow && t[n].snow.clear();
                else t.snow.clear();
            else if (t.length > 0)
                for (var n = 0; n < t.length; n++) new e().snow(t[n], i);
            else new e().snow(t, i);
        },
    };
})();



// ---------- Page behaviour ----------

// Image modal (only runs if the modal and gallery images exist)
(function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector("#imageModal .close");
    if (!modal || !modalImg || !closeBtn) return;

    document.querySelectorAll(".project img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });
    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });
})();

// Reveal sections once as they scroll into view
(function () {
    const sections = document.querySelectorAll(".section");
    if (!("IntersectionObserver" in window)) {
        sections.forEach(s => s.classList.add("show"));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));
})();

// Project carousel: arrows, plus a slow auto-scroll that loops
(function () {
    const track = document.querySelector(".projects-grid");
    const prev = document.querySelector(".carousel-prev");
    const next = document.querySelector(".carousel-next");
    const toggle = document.querySelector(".carousel-toggle");
    if (!track || !prev || !next) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(track.querySelectorAll(".project-card"));
    const SPEED = 34;          // pixels per second
    let looping = false, loopWidth = 0, pos = 0, last = 0;
    let userPaused = reduceMotion, hover = false, inView = true, holdUntil = 0;

    function step() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cards.length ? cards[0].getBoundingClientRect().width + gap : track.clientWidth;
    }
    function measure() { loopWidth = looping ? track.children[cards.length].offsetLeft - cards[0].offsetLeft : 0; }
    function hold(ms) { holdUntil = Math.max(holdUntil, performance.now() + ms); }

    // Finite mode (reduced motion): arrows hide at the ends
    function updateArrows() {
        if (looping) return;
        const max = track.scrollWidth - track.clientWidth;
        const noScroll = max <= 4;
        prev.classList.toggle("is-hidden", noScroll || track.scrollLeft <= 4);
        next.classList.toggle("is-hidden", noScroll || track.scrollLeft >= max - 4);
    }

    // Loop mode: clone the cards once so the strip can wrap around seamlessly
    if (!reduceMotion && cards.length > 1) {
        cards.forEach(c => {
            const clone = c.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("tabindex", "-1");
            clone.classList.add("is-clone");
            track.appendChild(clone);
        });
        looping = true;
        track.classList.add("is-auto");
        measure();
    }

    prev.addEventListener("click", () => {
        hold(6000);
        if (looping && track.scrollLeft < step()) track.scrollTo({ left: track.scrollLeft + loopWidth, behavior: "instant" });
        track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
        hold(6000);
        track.scrollBy({ left: step(), behavior: "smooth" });
    });
    track.addEventListener("scroll", () => {
        if (looping && track.scrollLeft >= loopWidth) track.scrollTo({ left: track.scrollLeft - loopWidth, behavior: "instant" });
        updateArrows();
    }, { passive: true });
    window.addEventListener("resize", () => { measure(); updateArrows(); });
    updateArrows();
    if (!looping) { if (toggle) toggle.hidden = true; return; }

    // Pause whenever the visitor is interacting, or the strip is off screen
    const carousel = track.closest(".carousel");
    carousel.addEventListener("mouseenter", () => { hover = true; });
    carousel.addEventListener("mouseleave", () => { hover = false; });
    carousel.addEventListener("focusin", () => { hold(8000); });
    track.addEventListener("touchstart", () => hold(4000), { passive: true });
    track.addEventListener("touchend", () => hold(3000), { passive: true });
    track.addEventListener("wheel", () => hold(3000), { passive: true });
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(e => { inView = e[0].isIntersecting; }, { threshold: 0.2 }).observe(carousel);
    }

    function setToggle() {
        if (!toggle) return;
        toggle.textContent = userPaused ? "\u25B6" : "\u275A\u275A";
        toggle.setAttribute("aria-label", userPaused ? "Play auto-scroll" : "Pause auto-scroll");
        toggle.setAttribute("aria-pressed", String(userPaused));
    }
    if (toggle) toggle.addEventListener("click", () => { userPaused = !userPaused; setToggle(); });
    setToggle();

    function tick(now) {
        const dt = Math.min((now - (last || now)) / 1000, 0.1);
        last = now;
        const idle = !userPaused && !hover && inView && !document.hidden && now >= holdUntil;
        if (idle) {
            if (Math.abs(track.scrollLeft - pos) > 2) pos = track.scrollLeft; // the visitor moved it
            pos += SPEED * dt;
            if (pos >= loopWidth) pos -= loopWidth;
            track.scrollLeft = pos;
        } else {
            pos = track.scrollLeft;
        }
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
})();

// Footer year
(function () {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
})();
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { profile, gmailComposeUrl } from "../data/resume";
import { LinkButton } from "./Button";
import { Spinner } from "./Spinner";
import { DecryptedText } from "./DecryptedText";
import { scrollToTarget } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";
import { useDismissOnOutsideOrEscape } from "../hooks/useDismissOnOutsideOrEscape";
import { prefersReducedMotion } from "../lib/motion";
import { Linkedin, Github, Gmail } from "./icons/Social";
import { LinkIcon } from "./icons/LinkIcon";
import { Download } from "./icons/Download";

gsap.registerPlugin(useGSAP);

const DOWNLOAD_FEEDBACK_MS = 700;

// Ease-out on the way in (a confident, slightly slower arrival), ease-in on
// the way out (quicker — an exit shouldn't make the visitor wait). Nav now
// floats as an overlay above a photo panel that never resizes, so this only
// ever has to animate opacity/box-shadow via CSS — the desktop dock's motion
// is handed off to GSAP below.
const ENTER_TRANSITION = "duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
const EXIT_TRANSITION = "duration-[220ms] ease-[cubic-bezier(0.4,0,1,1)]";

// Seconds — duplicated from ENTER_TRANSITION/EXIT_TRANSITION's 420ms/220ms
// rather than derived, since Tailwind's class scanner needs those as literal
// strings and can't see through a shared JS constant. Keep both in sync.
const ENTER_DURATION = 0.42;
const EXIT_DURATION = 0.22;
// Asymmetric on purpose: the panel *fades* in where it will sit (no travel,
// so the item stagger underneath is the thing that reads as movement), and
// *slides* out to the right on close (travel makes the dismissal legible
// without needing the eye to track a dissolve).
const FADE_EASE = "power2.out";
// Purely decelerating — no overshoot. A spring ease (e.g. back.in) drags the
// docked edge back past flush-right before leaving, which reads as a gap
// flashing open at the panel's edge; this departs cleanly with no gap.
const SLIDE_EASE = "power3.out";
// Mirrors --breakpoint-split (700px) in index.css — the point where the
// panel switches from a full-screen fade to a right-docked slide.
const DESKTOP_QUERY = "(min-width: 700px)";

const items = [
  { frame: "01", label: "Featured Work", href: "#work" },
  { frame: "02", label: "Tech Stack", href: "#skills" },
  { frame: "03", label: "Education", href: "#education" },
  { frame: "04", label: "Credentials", href: "#certifications" },
] as const;

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: gmailComposeUrl },
  { label: "Resources", href: "/notes" },
];

const roleWords = profile.role.split(" ");

export function Nav({
  open = true,
  onExited,
  onCollapse,
}: {
  open?: boolean;
  onExited?: () => void;
  onCollapse?: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useMagnetic<HTMLButtonElement>(true);

  // Mount already in the closed pose, then flip to entered on the next
  // frame so the browser has a prior style to transition away from.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) setEntered(false);
  }, [open]);

  // Desktop-only fade-in / slide-out, GSAP-driven so the two halves can use
  // different properties and eases. Mobile never enters this matchMedia
  // scope, so it stays untouched by GSAP and keeps the plain CSS opacity
  // fade above in both directions.
  const isFirstSlideRun = useRef(true);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Live tween/timeline handles, kept in refs (not React state) so a rapid
  // re-toggle can kill whatever's in flight and continue from wherever the
  // panel and item labels currently sit — the same pattern React Bits'
  // StaggeredMenu uses. kill() stops a tween in place; it does NOT reset
  // values back to their pre-tween state the way GSAP's context revert()
  // does, which is what caused the "open never animates" bug fixed earlier.
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  // Setup only — deliberately has no `dependencies`, so it runs once on
  // mount and reverts only on unmount. useGSAP's dependency tracking
  // reverts everything from the previous run before the next one starts,
  // which would erase the panel's current position on every toggle. The
  // matchMedia scope still buys automatic cleanup of the inline transform
  // if the window is resized narrower than `split`, since mobile no longer
  // has a CSS class to fall back on for this property.
  useGSAP(
    () => {
      if (!rootRef.current) return;
      gsap.matchMedia().add(DESKTOP_QUERY, () => {
        const panel = rootRef.current;
        if (!panel) return;
        const itemEls = panel.querySelectorAll(".nav-item-label");
        const frameEls = panel.querySelectorAll(".nav-item-frame");
        // Closed pose is parked off to the right at full opacity — that's
        // where playClose's slide leaves it, so open→close→open is a loop
        // through the same two poses rather than two unrelated states.
        gsap.set(panel, { xPercent: openRef.current ? 0 : 100, opacity: 1 });
        gsap.set(
          itemEls,
          openRef.current
            ? { yPercent: 0, rotate: 0 }
            : { yPercent: 140, rotate: 10 },
        );
        gsap.set(frameEls, { opacity: openRef.current ? 1 : 0 });
      });
    },
    { scope: rootRef },
  );

  // The two end poses, with no motion between them — used by the reduced-
  // motion path, and by playClose to park the panel once it's off screen.
  const snapTo = (isOpen: boolean) => {
    const panel = rootRef.current;
    if (!panel) return;
    const itemEls = panel.querySelectorAll(".nav-item-label");
    const frameEls = panel.querySelectorAll(".nav-item-frame");
    gsap.set(panel, { xPercent: isOpen ? 0 : 100, opacity: 1 });
    gsap.set(
      itemEls,
      isOpen ? { yPercent: 0, rotate: 0 } : { yPercent: 140, rotate: 10 },
    );
    gsap.set(frameEls, { opacity: isOpen ? 1 : 0 });
  };

  const playOpen = () => {
    const panel = rootRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    openTlRef.current?.kill();

    const itemEls = panel.querySelectorAll(".nav-item-label");
    const frameEls = panel.querySelectorAll(".nav-item-frame");
    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    gsap.set(frameEls, { opacity: 0 });

    // Land the panel in its docked position first, then fade it up from
    // there — a fromTo on opacity alone would otherwise cross-fade the panel
    // in wherever a half-finished close tween abandoned it.
    gsap.set(panel, { xPercent: 0 });

    const tl = gsap.timeline();
    tl.fromTo(
      panel,
      { opacity: 0 },
      { opacity: 1, duration: ENTER_DURATION, ease: FADE_EASE },
    );
    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.08,
        },
        `-=${ENTER_DURATION * 0.6}`,
      );
    }
    if (frameEls.length) {
      tl.to(
        frameEls,
        { opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 },
        "<",
      );
    }
    openTlRef.current = tl;
  };

  const playClose = () => {
    const panel = rootRef.current;
    if (!panel) return;
    openTlRef.current?.kill();
    openTlRef.current = null;
    closeTweenRef.current?.kill();

    // Travel only — whatever opacity the panel currently holds rides along.
    // Interrupting a half-finished open fade this way slides out a faint
    // panel, which is truthful to what was on screen; snapping to full
    // opacity first would pop it brighter on its way out instead.
    closeTweenRef.current = gsap.to(panel, {
      xPercent: 100,
      duration: EXIT_DURATION,
      ease: SLIDE_EASE,
      overwrite: "auto",
      onComplete: () => {
        // Back to the parked pose: off to the right, opaque, items hidden.
        // Safe to snap opacity back up now — the panel is off screen.
        snapTo(false);
        onExited?.();
      },
    });
  };

  // The actual per-toggle trigger, run imperatively outside useGSAP's
  // revert cycle so playOpen/playClose continue from wherever the panel
  // and items currently sit rather than from a freshly-reverted pose.
  //
  // HomePage unmounts Nav entirely once its exit transition finishes
  // (navRendered), so a reopen mounts a brand-new instance with `open`
  // already true — that's indistinguishable from "the very first mount"
  // by isFirstSlideRun alone. Only skip the mount-triggered run when it's
  // mounting closed (the useGSAP matchMedia setup above already placed it
  // in that pose, nothing to animate); a mount that's already open still
  // needs playOpen() so the reopen gets its entrance animation. useLayoutEffect
  // keeps this in the same paint as useGSAP's own layout effect above, so
  // the open-on-mount case never flashes the fully-open pose before
  // playOpen() resets items back to hidden and animates them in.
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;

    const isMount = isFirstSlideRun.current;
    isFirstSlideRun.current = false;
    if (isMount && !open) return;

    // Desktop has no CSS fallback for either property GSAP drives here, so
    // reduced motion can't just opt out of the tweens — it has to be handed
    // the finished pose directly, or the panel stays parked off-screen and
    // the menu never appears at all. onExited still has to fire by hand,
    // since nothing runs to completion on this path.
    if (prefersReducedMotion()) {
      snapTo(open);
      if (!open) onExited?.();
      return;
    }
    if (open) playOpen();
    else playClose();
  }, [open]);

  // This is a full-viewport takeover, not an incidental popover — the page
  // underneath shouldn't scroll or be reachable by keyboard while it's up.
  // Locking only <html> (document.scrollingElement) isn't enough: once html
  // can no longer scroll, the browser hands the scrollbar to <body> instead
  // (it still has overflow content and an auto/visible overflow-y from the
  // base styles), so the lock has to cover both to actually hold still.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  // Send focus into the panel the moment it opens — the button that
  // triggered it (PhotoPanel's Menu button) goes inert as part of the same
  // transition and would otherwise drop focus to <body>.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  // Floating-overlay behavior: click outside the card or press Escape to
  // close, matching ContactModal's existing pattern elsewhere in this app.
  // Only wired up while open — the Menu button that reopens it is hidden
  // (opacity-0 pointer-events-none) whenever Nav is open, so there's no
  // trigger element to exclude here the way ContactModal has to.
  useDismissOnOutsideOrEscape(open, [rootRef], () => onCollapse?.());

  // Tab is trapped inside the panel so the background page — which stays in
  // the DOM and un-inert below the fold — never picks up focus while this is
  // meant to be the only thing on screen.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !rootRef.current) return;
      const focusables = rootRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      inert={!open}
      onTransitionEnd={(e) => {
        if (
          e.target === rootRef.current &&
          e.propertyName === "opacity" &&
          !open
        ) {
          onExited?.();
        }
      }}
      // split: drops opacity from the transition list — above 700px GSAP owns
      // opacity frame by frame, and a CSS transition on it would re-animate
      // toward every intermediate value the tween sets, smearing the fade.
      // Below 700px there's no GSAP at all and the transition is the fade.
      className={`paper-grain !absolute inset-0 z-20 flex min-w-0 flex-col justify-center gap-6 overflow-y-hidden bg-paper px-6 py-10 text-ink transition-[opacity,box-shadow] split:right-0 split:left-auto split:w-[45%] split:border-l split:border-ink/10 split:px-14 split:py-12 split:transition-[box-shadow] ${
        open ? "" : "pointer-events-none"
      } ${
        entered
          ? `opacity-100 split:opacity-100 split:shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.45)] ${ENTER_TRANSITION}`
          : `opacity-0 split:opacity-100 split:shadow-[-24px_0_60px_-20px_rgba(0,0,0,0)] ${EXIT_TRANSITION}`
      }`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onCollapse}
        className="absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-ink px-5 py-3 cursor-pointer transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-deep sm:right-8 sm:top-8"
      >
        <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
          <path
            d="M1 1 L9 9 M9 1 L1 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="font-hud text-hud uppercase tracking-[0.08em]">
          Close
        </span>
      </button>

      <div>
        <div className="mb-4 flex items-center gap-4">
          <span className="flex items-center gap-2 font-hud text-hud font-medium uppercase tracking-[0.08em] text-orange-deep">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
              aria-hidden="true"
            />
            <DecryptedText
              text="Open to internships"
              animateOn="view"
              sequential
              useOriginalCharsOnly
              revealDirection="start"
              speed={35}
              encryptedClassName="text-ash-deep"
            />
          </span>
        </div>
        <h1
          className="font-display italic text-hero text-ink"
          style={{ fontWeight: 340 }}
        >
          {roleWords.map((word, i) => (
            <span
              key={word + i}
              className="inline-block"
              style={{ marginRight: i < roleWords.length - 1 ? "0.25em" : 0 }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md font-body text-body-lg text-ink/70">
          {profile.name} — takes Figma to shipped, production React, end to end.
          The result: a frontend hire who ships real features, not prototypes.
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const isRoute = item.href.startsWith("/");
            const dimmed = hoveredIndex !== null && hoveredIndex !== index;
            const rowContent = (
              <>
                <span
                  className={`nav-item-frame font-hud text-tag uppercase tracking-[0.08em] transition-colors duration-300 ease-out group-hover:text-orange-deep group-focus-visible:text-orange-deep ${
                    dimmed ? "text-ash-deep" : "text-orange"
                  }`}
                >
                  [{item.frame}]
                </span>
                <span className="inline-block overflow-hidden">
                  <span
                    className={`nav-item-label inline-block font-display text-h3 tracking-tight transition-colors duration-300 ease-out group-hover:text-orange-deep group-focus-visible:text-orange-deep lg:text-h2 ${
                      dimmed ? "text-ash-deep" : "text-ink"
                    }`}
                    style={{ fontWeight: 460 }}
                  >
                    {item.label}
                  </span>
                </span>
              </>
            );
            const rowProps = {
              className:
                "group flex items-center gap-3 py-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep",
              onMouseEnter: () => setHoveredIndex(index),
              onMouseLeave: () => setHoveredIndex(null),
              onFocus: () => setHoveredIndex(index),
              onBlur: () => setHoveredIndex(null),
            };
            return (
              <li key={item.frame} className="border-b border-ash/25">
                {isRoute ? (
                  <Link
                    to={item.href}
                    onClick={() => onCollapse?.()}
                    {...rowProps}
                  >
                    {rowContent}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onCollapse?.();
                      scrollToTarget(item.href);
                    }}
                    {...rowProps}
                  >
                    {rowContent}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-wrap gap-4">
        <LinkButton
          href="#work"
          variant="primary"
          magnetic
          forceMagnetic
          onClick={(e) => {
            e.preventDefault();
            onCollapse?.();
            scrollToTarget("#work");
          }}
        >
          View Featured Work
        </LinkButton>
        <LinkButton
          href={profile.resumeUrl}
          variant="ghost-dark"
          magnetic
          forceMagnetic
          download
          aria-busy={isDownloading}
          onClick={() => {
            setIsDownloading(true);
            window.setTimeout(
              () => setIsDownloading(false),
              DOWNLOAD_FEEDBACK_MS,
            );
          }}
        >
          <span className="grid">
            <span
              aria-hidden={isDownloading}
              className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity ${
                isDownloading ? "opacity-0" : "opacity-100"
              }`}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </span>
            <span
              aria-hidden={!isDownloading}
              className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity ${
                isDownloading ? "opacity-100" : "opacity-0"
              }`}
            >
              <Spinner />
              Downloading…
            </span>
          </span>
        </LinkButton>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {socials.map((social, i) => (
          <Fragment key={social.label}>
            {i > 0 && (
              <span
                className="h-[3px] w-[3px] shrink-0 rounded-full bg-ash"
                aria-hidden="true"
              />
            )}
            {social.label === "Resources" ? (
              <Link
                to={social.href}
                className="flex items-center gap-1 font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep"
              >
                {social.label}
                <LinkIcon className="h-3 w-3" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep"
              >
                {social.label === "GitHub" ? (
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                ) : social.label === "LinkedIn" ? (
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Gmail className="h-3.5 w-auto" aria-hidden="true" />
                )}
                {social.label}
              </a>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

import { certifications, type Certification } from "../data/resume";
import { useScrollScaleReveal } from "../hooks/useScrollScaleReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { Aws } from "../components/icons/Aws";
import { Ibm } from "../components/icons/Ibm";
import { ArrowUpRight } from "../components/icons/ArrowUpRight";
import { ImageWithSkeleton } from "../components/ImageWithSkeleton";

const CARD_MAGNETIC_OFFSET = 6;

function CredentialIcon({ icon }: { icon: Certification["icon"] }) {
  if (icon === "aws")
    return <Aws className="h-7 w-auto text-ink" aria-hidden="true" />;
  if (icon === "ibm") return <Ibm className="h-6 w-auto" aria-hidden="true" />;
  // Wide lowercase wordmark (1844×320, ~5.76:1), cropped to the glyphs, so it
  // is set shorter than the uppercase IBM mark to read at the same optical
  // size rather than the same measured height.
  if (icon === "servicenow")
    return (
      <ImageWithSkeleton
        src="/assets/servicenow.png"
        alt=""
        width={115}
        height={20}
      />
    );
  return (
    <ImageWithSkeleton
      src="/assets/cit.png"
      alt=""
      width={33}
      height={32}
      className="object-left"
    />
  );
}

function CredentialBody({ cert }: { cert: Certification }) {
  return (
    <>
      <div className="flex h-8 items-center">
        <CredentialIcon icon={cert.icon} />
      </div>
      <div className="flex flex-col gap-1">
        <p
          className="flex items-center gap-1 font-body leading-snug text-ink underline-offset-2 group-hover:underline"
          style={{ fontWeight: 580 }}
        >
          {cert.name}
          {cert.url && (
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          )}
        </p>
        <p className="font-hud text-tag uppercase tracking-[0.08em] text-ash-deep">
          {cert.type} · {cert.date}
        </p>
      </div>
    </>
  );
}

// `group` is deliberately not in here — it drives the name's hover underline,
// which would be a lie on the unlinked variant.
const CARD_CLASS =
  "flex flex-col gap-4 rounded-md border border-ink/15 p-5 transition-colors";

// A credential without a `url` is still a real credential — it just has
// nowhere to point yet. Rendering it as a plain card keeps it in the grid
// without an anchor that goes nowhere, and it needs no magnetic pull or
// hover-border either, since neither would lead anywhere.
function CredentialCard({ cert }: { cert: Certification }) {
  const ref = useMagnetic<HTMLAnchorElement>(true, CARD_MAGNETIC_OFFSET);

  if (!cert.url) {
    return (
      <div className={CARD_CLASS}>
        <CredentialBody cert={cert} />
      </div>
    );
  }

  return (
    <a
      ref={ref}
      href={cert.url}
      target="_blank"
      rel="noreferrer"
      className={`${CARD_CLASS} group hover:border-ink/30`}
    >
      <CredentialBody cert={cert} />
    </a>
  );
}

export function Certifications() {
  const gridRef = useScrollScaleReveal<HTMLDivElement>();
  return (
    <section
      id="certifications"
      className="paper-grain relative isolate border-t border-ink/10 bg-paper px-6 py-16 text-ink sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7">
        <div className="flex flex-col gap-2 border-b border-ink/12 pb-7">
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
            [04] Certifications &amp; Awards
          </span>
          <h2
            className="font-display text-h2 text-ink"
            style={{ fontWeight: 580 }}
          >
            Credentials
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certifications.map((cert) => (
            <CredentialCard key={cert.name} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

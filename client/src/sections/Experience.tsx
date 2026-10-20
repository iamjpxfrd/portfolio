import { experience } from "../data/resume";
import { useScrollScaleReveal } from "../hooks/useScrollScaleReveal";

export function Experience() {
  const listRef = useScrollScaleReveal<HTMLOListElement>("li");
  return (
    <section
      id="experience"
      className="relative isolate bg-ink px-6 py-16 text-paper sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ash/20 pb-7 sm:flex-row sm:items-baseline">
          <div className="flex flex-col gap-2">
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
              [01] Experience
            </span>
            <h2
              className="font-display text-h2 text-paper"
              style={{ fontWeight: 580 }}
            >
              Where I Work
            </h2>
          </div>
        </div>

        <ol ref={listRef} className="flex flex-col">
          {experience.map((job) => (
            <li
              key={job.company}
              className="flex flex-col gap-6 border-b border-ash/20 py-7 sm:flex-row sm:gap-8"
            >
              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-[300px]">
                <h3
                  className="font-display text-h3 text-paper"
                  style={{ fontWeight: 580 }}
                >
                  {job.role}
                </h3>
                <p className="text-sm text-paper/70">{job.company}</p>
                <p className="mt-2 flex items-center gap-2 font-hud text-tag uppercase tracking-[0.08em] text-ash">
                  {/* Same live dot as the hero status line — a role still in
                      progress, not a past entry. Text carries the meaning;
                      the dot is decoration. */}
                  {job.current && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                      aria-hidden="true"
                    />
                  )}
                  <time>{job.period}</time>
                </p>
                <p className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
                  Started {job.start}
                </p>
              </div>

              <div className="flex grow flex-col gap-4">
                <p className="font-body text-body leading-relaxed text-paper/85">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ash/30 px-3 py-1 font-hud text-tag uppercase tracking-[0.08em] text-paper/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

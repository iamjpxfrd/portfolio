import { projects } from "../../data/resume";

export function ProjectsPane() {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <span className="prompt">darwin@cit-u:~$</span> ls -la ./projects
      </div>
      {projects.map((p) => (
        <a key={p.slug} className="ls-row" href={p.url} target="_blank" rel="noopener noreferrer">
          <span className="ls-perm">drwxr-xr-x</span>
          <span className="ls-owner">darwin</span>
          <span className="ls-date">{p.date}</span>
          <span className="ls-name">{p.name}/</span>
          <span className="ls-desc">{p.desc}</span>
        </a>
      ))}
    </>
  );
}

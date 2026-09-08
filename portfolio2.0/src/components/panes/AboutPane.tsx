import { profile, stackLine } from "../../data/resume";

export function AboutPane() {
  return (
    <>
      <div className="about-block">
        <div>
          <span className="prompt">darwin@cit-u:~$</span> whoami
        </div>
        <div>{profile.name}</div>
        <div>
          {profile.role} &mdash; BSIT, Cebu Institute of Technology University
        </div>
      </div>
      <div className="about-block">
        <div>
          <span className="prompt">darwin@cit-u:~$</span> cat about.md
        </div>
        <p className="about-copy">{profile.bio}</p>
        <p className="about-stack">Stack: {stackLine}</p>
      </div>
      <div>
        <span className="prompt">darwin@cit-u:~$</span> <span className="cursor" />
      </div>
    </>
  );
}

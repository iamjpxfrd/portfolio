import { contactRows } from "../../data/resume";

export function ContactPane() {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <span className="prompt">darwin@cit-u:~$</span> cat contact.sh
      </div>
      {contactRows.map((row) => (
        <a key={row.label} className="contact-row" href={row.href} target="_blank" rel="noopener noreferrer">
          <span className="contact-key">{row.label}</span>
          <span className="contact-value">{row.value}</span>
        </a>
      ))}
      <div style={{ marginTop: 12 }}>
        <span className="prompt">darwin@cit-u:~$</span> <span className="cursor" />
      </div>
    </>
  );
}

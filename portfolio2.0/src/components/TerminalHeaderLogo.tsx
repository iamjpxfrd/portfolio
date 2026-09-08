import { TerminalIcon } from "./icons";

/** Terminal glyph at the far end of the tab strip, opposite the window controls, via dockview's `rightHeaderActionsComponent` slot. */
export function TerminalHeaderLogo() {
  return (
    <span className="terminal-header-logo">
      <TerminalIcon size={13} />
    </span>
  );
}

import type { IDockviewHeaderActionsProps } from "dockview-react";
import { WindowControls } from "./WindowControls";

/** Window controls, before the tab strip, via dockview's official `prefixHeaderActionsComponent` slot. */
export function TerminalHeaderPrefix(props: IDockviewHeaderActionsProps) {
  return (
    <div className="terminal-header-prefix">
      <WindowControls {...props} />
    </div>
  );
}

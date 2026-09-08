import { useCallback, useRef } from "react";
import { DockviewReact, type DockviewApi, type DockviewReadyEvent } from "dockview-react";
import "dockview-react/dist/styles/dockview.css";
import { AboutPane } from "./panes/AboutPane";
import { ProjectsPane } from "./panes/ProjectsPane";
import { ActivityPane } from "./panes/ActivityPane";
import { ContactPane } from "./panes/ContactPane";
import { TerminalHeaderPrefix } from "./TerminalHeaderPrefix";
import { TerminalHeaderLogo } from "./TerminalHeaderLogo";

function AboutPanel() {
  return (
    <div className="pane">
      <AboutPane />
    </div>
  );
}
function ProjectsPanel() {
  return (
    <div className="pane">
      <ProjectsPane />
    </div>
  );
}
function ActivityPanel() {
  return (
    <div className="pane">
      <ActivityPane />
    </div>
  );
}
function ContactPanel() {
  return (
    <div className="pane">
      <ContactPane />
    </div>
  );
}

const components = {
  about: AboutPanel,
  projects: ProjectsPanel,
  activity: ActivityPanel,
  contact: ContactPanel,
};

const TABS = [
  { id: "about", title: "about" },
  { id: "projects", title: "projects" },
  { id: "activity", title: "activity" },
  { id: "contact", title: "contact" },
] as const;

/** (Re)creates the floating terminal window and its 4 tabs. Safe to call on a fresh dockview instance or after the window was closed. */
function openTerminal(api: DockviewApi) {
  TABS.forEach((tab, i) => {
    if (i === 0) {
      api.addPanel({
        id: tab.id,
        component: tab.id,
        title: tab.title,
        floating: { width: 520, height: 460, position: { top: 70, right: 70 } },
      });
    } else {
      api.addPanel({
        id: tab.id,
        component: tab.id,
        title: tab.title,
        floating: false,
        position: { referencePanel: "about", direction: "within" },
      });
    }
  });
  const aboutPanel = api.getPanel("about");
  aboutPanel?.api.setActive();
  // There's only ever this one group, so treating it as a valid drop target for
  // itself just shows a confusing "split against itself" preview inside its own
  // bounds while dragging. Locking it out of accepting drops leaves the outer
  // whole-desktop edge-tiling overlay (shift+drag to an edge) untouched.
  if (aboutPanel) {
    aboutPanel.group.api.locked = "no-drop-target";
  }
}

type DockviewTerminalProps = {
  /** Handed a callback once dockview is ready, for the Dock's terminal icon: focuses the window if open, reopens it (closed via the X/minimize buttons) otherwise. */
  onApiReady?: (activateOrReopen: () => void) => void;
  /** Reports whether the terminal window currently exists, so the Dock can show it as active. */
  onOpenChange?: (open: boolean) => void;
};

export function DockviewTerminal({ onApiReady, onOpenChange }: DockviewTerminalProps) {
  const apiRef = useRef<DockviewApi | null>(null);

  const handleReady = useCallback(
    (event: DockviewReadyEvent) => {
      const api = event.api;
      apiRef.current = api;
      openTerminal(api);
      onOpenChange?.(true);

      const reportOpenState = () => onOpenChange?.(Boolean(api.getPanel("about")));
      api.onDidAddPanel(reportOpenState);
      api.onDidRemovePanel(reportOpenState);

      onApiReady?.(() => {
        const currentApi = apiRef.current;
        if (!currentApi) return;
        const panel = currentApi.getPanel("about");
        if (panel) {
          panel.api.setActive();
        } else {
          openTerminal(currentApi);
        }
      });
    },
    [onApiReady, onOpenChange],
  );

  return (
    <div className="terminal-dockview dockview-theme-abyss">
      <DockviewReact
        components={components}
        onReady={handleReady}
        floatingGroupDragHandle="tabbar"
        floatingGroupBounds="boundedWithinViewport"
        prefixHeaderActionsComponent={TerminalHeaderPrefix}
        rightHeaderActionsComponent={TerminalHeaderLogo}
      />
    </div>
  );
}

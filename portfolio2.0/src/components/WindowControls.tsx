import type { IDockviewHeaderActionsProps } from "dockview-react";

export function WindowControls({ api }: IDockviewHeaderActionsProps) {
  const handleMaximize = () => {
    if (api.isMaximized()) {
      api.exitMaximized();
    } else {
      api.maximize();
    }
  };

  return (
    <div className="win-controls">
      <button className="win-btn" aria-label="Minimize window" title="Minimize" onClick={() => api.close()}>
        <span className="win-glyph win-glyph-min" />
      </button>
      <button className="win-btn" aria-label="Toggle maximize window" title="Maximize" onClick={handleMaximize}>
        <span className="win-glyph win-glyph-max" />
      </button>
      <button className="win-btn win-btn-close" aria-label="Close window" title="Close" onClick={() => api.close()}>
        <span className="win-glyph win-glyph-close" />
      </button>
    </div>
  );
}

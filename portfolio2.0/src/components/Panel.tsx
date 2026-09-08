import type { Theme } from "../hooks/useTheme";
import { AppGridIcon, VolumeIcon, WifiIcon } from "./icons";

type PanelProps = {
  time: string;
  dateShort: string;
  theme: Theme;
  onToggleTheme: () => void;
};

export function Panel({ time, dateShort, theme, onToggleTheme }: PanelProps) {
  return (
    <div className="panel">
      <div className="panel-left">
        <AppGridIcon />
        <span className="pager">
          <span className="on" />
          <span />
          <span />
          <span />
        </span>
        <span className="panel-clock">
          {time} &middot; {dateShort}
        </span>
      </div>
      <div className="panel-right">
        <VolumeIcon />
        <WifiIcon />
        <span className="battery">
          <span className="battery-body">
            <span className="battery-fill" />
          </span>
          78%
        </span>
        <span className="tray-chip">EN</span>
        <button className="toggle-tray" onClick={onToggleTheme} aria-label="Toggle light/dark theme">
          <span className={`switch ${theme === "light" ? "on" : ""}`}>
            <span className="switch-dot" />
          </span>
        </button>
      </div>
    </div>
  );
}

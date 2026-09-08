import { useCallback, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useClock } from "./hooks/useClock";
import { ThemeContext } from "./context/ThemeContext";
import { Wallpaper } from "./components/Wallpaper";
import { Panel } from "./components/Panel";
import { ClockWidget } from "./components/ClockWidget";
import { Dock } from "./components/Dock/Dock";
import { DockviewTerminal } from "./components/DockviewTerminal";
import {
  FolderIcon,
  BrowserIcon,
  TerminalIcon,
  MailIcon,
  GearIcon,
} from "./components/icons";

function App() {
  const { theme, toggleTheme } = useTheme();
  const clock = useClock();
  const [focusTerminal, setFocusTerminal] = useState<() => void>(
    () => () => {},
  );
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const handleApiReady = useCallback((focus: () => void) => {
    setFocusTerminal(() => focus);
  }, []);

  const dockItems = [
    { icon: <FolderIcon size={20} />, label: "Files", onClick: () => {} },
    { icon: <BrowserIcon size={20} />, label: "Browser", onClick: () => {} },
    {
      icon: <TerminalIcon size={20} />,
      label: "Terminal",
      onClick: focusTerminal,
      active: isTerminalOpen,
    },
    { icon: <MailIcon size={20} />, label: "Mail", onClick: () => {} },
    { icon: <GearIcon size={20} />, label: "Settings", onClick: () => {} },
  ];

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`stage theme-${theme}`}>
        <Wallpaper />
        <Panel
          time={clock.time}
          dateShort={clock.dateShort}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <ClockWidget time={clock.time} dateLong={clock.dateLong} />
        <DockviewTerminal
          onApiReady={handleApiReady}
          onOpenChange={setIsTerminalOpen}
        />
        <Dock items={dockItems} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
